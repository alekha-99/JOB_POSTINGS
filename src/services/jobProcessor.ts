/**
 * Job Processor Service
 * 
 * Processes scraped jobs through classification, filtering, and deduplication.
 */

import { PrismaClient } from '@prisma/client';
import { ScrapedJob, ProcessedJob } from '../types/index.js';
import { classifyITJob, detectUSALocation, isRecentDate, logger } from '../utils/index.js';
import config from '../utils/config.js';

const prisma = new PrismaClient();

/**
 * Process a single scraped job through all filters
 */
export function processJob(job: ScrapedJob): ProcessedJob {
    // Classify as IT job
    const itResult = classifyITJob(job.title, job.description);
    const isITJob = itResult.isIT;

    // Detect USA location
    const usaResult = detectUSALocation(job.location);
    const isUSA = usaResult.isUSA;

    // Check if posted recently
    const isRecent = job.postedDate ? isRecentDate(job.postedDate) : true; // Default to true if no date

    // Determine if job should be saved
    let shouldSave = true;
    let skipReason: string | undefined;

    if (config.itJobsOnly && !isITJob) {
        shouldSave = false;
        skipReason = `Not an IT job (${itResult.excludedReason || 'no IT keywords'})`;
    } else if (config.usaOnly && !isUSA) {
        shouldSave = false;
        skipReason = `Not USA location (${usaResult.excludedReason || job.location})`;
    } else if (!isRecent) {
        shouldSave = false;
        skipReason = `Posted more than ${config.daysLookback} day(s) ago`;
    }

    return {
        job,
        isITJob,
        isUSA,
        isRecent,
        shouldSave,
        skipReason,
    };
}

/**
 * Process and save jobs to database with deduplication
 */
export async function processAndSaveJobs(jobs: ScrapedJob[]): Promise<{
    saved: number;
    skipped: number;
    duplicates: number;
}> {
    let saved = 0;
    let skipped = 0;
    let duplicates = 0;

    for (const scrapedJob of jobs) {
        try {
            const processed = processJob(scrapedJob);

            if (!processed.shouldSave) {
                logger.debug(`Skipping job "${scrapedJob.title}": ${processed.skipReason}`);
                skipped++;
                continue;
            }

            // Generate unique source job ID
            const sourceJobId = `${scrapedJob.source}_${scrapedJob.companySlug}_${scrapedJob.externalId}`;

            // Check for duplicates
            const existing = await prisma.job.findUnique({
                where: { sourceJobId },
            });

            if (existing) {
                logger.debug(`Duplicate job: ${sourceJobId}`);
                duplicates++;
                continue;
            }

            // Save to database
            await prisma.job.create({
                data: {
                    externalId: scrapedJob.externalId,
                    sourceJobId,
                    title: scrapedJob.title,
                    company: scrapedJob.company,
                    companySlug: scrapedJob.companySlug,
                    location: scrapedJob.location,
                    locationType: scrapedJob.locationType,
                    description: scrapedJob.description,
                    shortSummary: scrapedJob.shortSummary,
                    requirements: scrapedJob.requirements,
                    url: scrapedJob.url,
                    applyUrl: scrapedJob.applyUrl,
                    source: scrapedJob.source,
                    isITJob: processed.isITJob,
                    isUSA: processed.isUSA,
                    category: scrapedJob.category,
                    postedDate: scrapedJob.postedDate,
                    rawData: scrapedJob.rawData as object,
                },
            });

            logger.debug(`Saved job: ${scrapedJob.title} at ${scrapedJob.company}`);
            saved++;
        } catch (error) {
            logger.error(`Failed to save job "${scrapedJob.title}": ${error}`);
        }
    }

    return { saved, skipped, duplicates };
}

/**
 * Get job statistics
 */
export async function getJobStats(): Promise<{
    totalJobs: number;
    itJobs: number;
    usaJobs: number;
    todayJobs: number;
    byCompany: Record<string, number>;
}> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [totalJobs, itJobs, usaJobs, todayJobs, companyCounts] = await Promise.all([
        prisma.job.count(),
        prisma.job.count({ where: { isITJob: true } }),
        prisma.job.count({ where: { isUSA: true } }),
        prisma.job.count({ where: { scrapedAt: { gte: startOfDay } } }),
        prisma.job.groupBy({
            by: ['companySlug'],
            _count: { id: true },
        }),
    ]);

    const byCompany: Record<string, number> = {};
    for (const item of companyCounts) {
        byCompany[item.companySlug] = item._count.id;
    }

    return {
        totalJobs,
        itJobs,
        usaJobs,
        todayJobs,
        byCompany,
    };
}

export default { processJob, processAndSaveJobs, getJobStats };
