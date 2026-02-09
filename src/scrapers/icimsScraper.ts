/**
 * iCIMS Scraper
 * 
 * Scrapes job postings from companies using iCIMS ATS.
 * iCIMS typically exposes a JSON API endpoint for job listings.
 * 
 * Example API format:
 * https://careers-COMPANY.icims.com/jobs/search?pr=0&schemaId=&o=
 */

import axios from 'axios';
import { JobSource } from '@prisma/client';
import { BaseScraper } from './baseScraper.js';
import { CompanyConfig, ScrapedJob } from '../types/index.js';
import { parseJobDate, logger, extractFirst50Words } from '../utils/index.js';

interface IcimsJob {
    id: number | string;
    title: string;
    location?: string;
    city?: string;
    state?: string;
    country?: string;
    postedDate?: string;
    jobUrl?: string;
    description?: string;
    reqId?: string;
    [key: string]: unknown;
}

interface IcimsApiResponse {
    jobs?: IcimsJob[];
    jobList?: IcimsJob[];
    results?: IcimsJob[];
    data?: IcimsJob[];
    totalJobs?: number;
    totalCount?: number;
    [key: string]: unknown;
}

export class IcimsScraper extends BaseScraper {
    constructor() {
        super(JobSource.ICIMS);
    }

    async scrape(company: CompanyConfig): Promise<ScrapedJob[]> {
        logger.info(`[iCIMS] Scraping ${company.name}...`);

        try {
            // iCIMS API endpoint - typically follows this pattern
            const apiEndpoint = company.apiEndpoint || this.buildApiEndpoint(company.careersUrl);

            if (!apiEndpoint) {
                logger.warn(`[iCIMS] No API endpoint found for ${company.name}`);
                return [];
            }

            const response = await axios.get<IcimsApiResponse>(apiEndpoint, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
                timeout: 30000,
            });

            const data = response.data;

            // iCIMS responses vary - try different structures
            const jobs = data.jobs || data.jobList || data.results || data.data || [];

            if (!Array.isArray(jobs)) {
                logger.warn(`[iCIMS] Unexpected response structure for ${company.name}`);
                return [];
            }

            logger.info(`[iCIMS] Found ${jobs.length} jobs for ${company.name}`);

            const scrapedJobs: ScrapedJob[] = [];

            for (const job of jobs) {
                try {
                    const scrapedJob = this.transformJob(job, company);

                    if (scrapedJob) {
                        scrapedJobs.push(scrapedJob);
                    }
                } catch (error) {
                    logger.debug(`[iCIMS] Failed to transform job: ${error}`);
                }
            }

            logger.info(`[iCIMS] Transformed ${scrapedJobs.length} jobs for ${company.name}`);
            return scrapedJobs;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            logger.error(`[iCIMS] Failed to scrape ${company.name}: ${errorMessage}`);
            return [];
        }
    }

    /**
     * Build API endpoint from careers URL
     */
    private buildApiEndpoint(careersUrl: string): string | null {
        // iCIMS URLs typically look like:
        // https://careers.company.com/jobs or https://careers-company.icims.com/jobs

        try {
            const url = new URL(careersUrl);

            // Check if it's an icims.com domain
            if (url.hostname.includes('icims.com')) {
                // Standard iCIMS API endpoint
                return `${url.origin}/jobs/search?pr=0&schemaId=&o=&mode=job&iis=Internet&iisn=Internet`;
            }

            // For custom domains, try common API patterns
            return `${url.origin}/api/jobs` || null;

        } catch {
            return null;
        }
    }

    /**
     * Transform iCIMS job data to ScrapedJob format
     */
    private transformJob(job: IcimsJob, company: CompanyConfig): ScrapedJob | null {
        const title = job.title;
        if (!title) {
            return null;
        }

        // Build location string
        const locationParts = [];
        if (job.city) locationParts.push(job.city);
        if (job.state) locationParts.push(job.state);
        if (job.country) locationParts.push(job.country);
        const location = job.location || locationParts.join(', ') || 'Not Specified';

        // Build job URL
        const jobId = String(job.id || job.reqId || '');
        const jobUrl = job.jobUrl || `${company.careersUrl}/${jobId}`;

        // Parse posted date
        const parsedDate = job.postedDate ? parseJobDate(job.postedDate) : null;
        const postedDate = parsedDate?.date ?? undefined;

        // Get description if available
        const description = job.description || title;
        const shortSummary = extractFirst50Words(description);

        // Note: isITJob and isUSA are computed by the job processor, not here

        return {
            externalId: jobId,
            title,
            company: company.name,
            companySlug: company.slug,
            location,
            locationType: this.detectLocationType(location, title, description),
            description,
            shortSummary,
            url: jobUrl,
            applyUrl: jobUrl,
            source: 'ICIMS' as const,
            postedDate,
        };
    }

    /**
     * Detect if job is remote/hybrid/onsite
     */
    private detectLocationType(location: string, title: string, description: string): string {
        const combined = `${location} ${title} ${description}`.toLowerCase();

        if (combined.includes('remote')) {
            return 'Remote';
        } else if (combined.includes('hybrid')) {
            return 'Hybrid';
        }
        return 'Onsite';
    }
}

export default IcimsScraper;
