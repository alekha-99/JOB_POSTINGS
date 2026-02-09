/**
 * Orchestrator Service
 * 
 * Manages parallel scraping, retry logic, and run tracking.
 */

import { PrismaClient, Company, ScraperStatus, JobSource } from '@prisma/client';
import { getScraper } from '../scrapers/index.js';
import { processAndSaveJobs } from './jobProcessor.js';
import { CompanyConfig, ScrapeResult } from '../types/index.js';
import { logger, createLogger } from '../utils/index.js';
import config from '../utils/config.js';
import { sendPostScrapeDigest } from './whatsAppScheduler.js';

const prisma = new PrismaClient();

/**
 * Run scraper for a single company
 */
async function scrapeCompany(company: Company): Promise<ScrapeResult> {
    const companyLogger = createLogger({ company: company.slug });
    const startedAt = new Date();

    // Create scraper run record
    const scraperRun = await prisma.scraperRun.create({
        data: {
            companySlug: company.slug,
            source: company.source,
            status: ScraperStatus.RUNNING,
            startedAt,
        },
    });

    try {
        companyLogger.info(`Starting scrape for ${company.name}`);

        // Get the appropriate scraper
        const scraper = getScraper(company.source);

        // Convert to CompanyConfig
        const companyConfig: CompanyConfig = {
            id: company.id,
            name: company.name,
            slug: company.slug,
            source: company.source,
            careersUrl: company.careersUrl,
            apiEndpoint: company.apiEndpoint,
            enabled: company.enabled,
            priority: company.priority,
        };

        // Scrape jobs
        const jobs = await scraper.scrape(companyConfig);
        companyLogger.info(`Found ${jobs.length} jobs for ${company.name}`);

        // Process and save jobs
        const { saved, skipped, duplicates } = await processAndSaveJobs(jobs);
        companyLogger.info(`Saved ${saved}, skipped ${skipped}, duplicates ${duplicates} for ${company.name}`);

        // Update company's last scraped timestamp
        await prisma.company.update({
            where: { id: company.id },
            data: { lastScrapedAt: new Date() },
        });

        // Update scraper run as success
        const completedAt = new Date();
        await prisma.scraperRun.update({
            where: { id: scraperRun.id },
            data: {
                status: ScraperStatus.SUCCESS,
                jobsFound: jobs.length,
                jobsSaved: saved,
                completedAt,
            },
        });

        return {
            companySlug: company.slug,
            source: company.source,
            status: ScraperStatus.SUCCESS,
            jobs,
            jobsFound: jobs.length,
            jobsSaved: saved,
            startedAt,
            completedAt,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        companyLogger.error(`Scrape failed for ${company.name}: ${errorMessage}`);

        // Update scraper run as failed
        await prisma.scraperRun.update({
            where: { id: scraperRun.id },
            data: {
                status: ScraperStatus.FAILED,
                error: errorMessage,
                completedAt: new Date(),
            },
        });

        return {
            companySlug: company.slug,
            source: company.source,
            status: ScraperStatus.FAILED,
            jobs: [],
            jobsFound: 0,
            jobsSaved: 0,
            error: errorMessage,
            startedAt,
            completedAt: new Date(),
        };
    }
}

/**
 * Scrape a company with retry logic
 */
async function scrapeCompanyWithRetry(company: Company, maxAttempts: number = config.maxRetryAttempts): Promise<ScrapeResult> {
    let lastResult: ScrapeResult | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        lastResult = await scrapeCompany(company);

        if (lastResult.status === ScraperStatus.SUCCESS) {
            return lastResult;
        }

        if (attempt < maxAttempts) {
            const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            logger.warn(`Retrying ${company.name} in ${delayMs}ms (attempt ${attempt + 1}/${maxAttempts})`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    return lastResult!;
}

/**
 * Process companies in parallel batches
 */
async function processBatch(companies: Company[], concurrency: number): Promise<ScrapeResult[]> {
    const results: ScrapeResult[] = [];

    for (let i = 0; i < companies.length; i += concurrency) {
        const batch = companies.slice(i, i + concurrency);
        const batchResults = await Promise.all(
            batch.map((company) => scrapeCompanyWithRetry(company))
        );
        results.push(...batchResults);
    }

    return results;
}

/**
 * Run the full orchestration cycle
 */
export async function runOrchestration(): Promise<{
    totalCompanies: number;
    successful: number;
    failed: number;
    totalJobsFound: number;
    totalJobsSaved: number;
    duration: number;
}> {
    const startTime = Date.now();
    logger.info('🚀 Starting orchestration cycle');

    // Get all enabled companies, ordered by priority
    const companies = await prisma.company.findMany({
        where: { enabled: true },
        orderBy: { priority: 'asc' },
    });

    if (companies.length === 0) {
        logger.warn('No enabled companies found');
        return {
            totalCompanies: 0,
            successful: 0,
            failed: 0,
            totalJobsFound: 0,
            totalJobsSaved: 0,
            duration: 0,
        };
    }

    logger.info(`Found ${companies.length} enabled companies to scrape`);

    // Process companies in parallel batches
    const results = await processBatch(companies, config.maxConcurrentScrapers);

    // Calculate statistics
    const successful = results.filter((r) => r.status === ScraperStatus.SUCCESS).length;
    const failed = results.filter((r) => r.status === ScraperStatus.FAILED).length;
    const totalJobsFound = results.reduce((sum, r) => sum + r.jobsFound, 0);
    const totalJobsSaved = results.reduce((sum, r) => sum + r.jobsSaved, 0);
    const duration = Date.now() - startTime;

    logger.info(`✅ Orchestration completed in ${(duration / 1000).toFixed(1)}s`);
    logger.info(`   Companies: ${successful}/${companies.length} successful`);
    logger.info(`   Jobs found: ${totalJobsFound}, saved: ${totalJobsSaved}`);

    // Log failed companies
    for (const result of results.filter((r) => r.status === ScraperStatus.FAILED)) {
        logger.error(`   ❌ ${result.companySlug}: ${result.error}`);
    }

    // Send WhatsApp notification if new jobs were saved
    if (totalJobsSaved > 0) {
        logger.info(`📱 Triggering WhatsApp notification for ${totalJobsSaved} new jobs...`);
        await sendPostScrapeDigest(totalJobsSaved);
    }

    return {
        totalCompanies: companies.length,
        successful,
        failed,
        totalJobsFound,
        totalJobsSaved,
        duration,
    };
}

/**
 * Scrape a single company by slug (for testing)
 */
export async function scrapeOneCompany(slug: string): Promise<ScrapeResult> {
    const company = await prisma.company.findUnique({
        where: { slug },
    });

    if (!company) {
        throw new Error(`Company not found: ${slug}`);
    }

    return scrapeCompanyWithRetry(company);
}

/**
 * Get scraper run history
 */
export async function getScraperRunHistory(limit: number = 20): Promise<{
    runs: Array<{
        id: string;
        companySlug: string;
        source: JobSource;
        status: ScraperStatus;
        jobsFound: number;
        jobsSaved: number;
        error: string | null;
        startedAt: Date;
        completedAt: Date | null;
    }>;
}> {
    const runs = await prisma.scraperRun.findMany({
        orderBy: { startedAt: 'desc' },
        take: limit,
    });

    return { runs };
}

export default { runOrchestration, scrapeOneCompany, getScraperRunHistory };
