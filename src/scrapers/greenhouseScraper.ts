/**
 * Greenhouse Scraper
 * 
 * Scrapes job postings from Greenhouse ATS using their public job board API.
 * Greenhouse provides a JSON API at api.greenhouse.io.
 */

import axios, { AxiosError } from 'axios';
import { JobSource } from '@prisma/client';
import { BaseScraper } from './baseScraper.js';
import { ScrapedJob, CompanyConfig, GreenhouseJob, GreenhouseJobsResponse } from '../types/index.js';
import { parseISO } from 'date-fns';
import { extractFirst50Words } from '../utils/extractSummary.js';

export class GreenhouseScraper extends BaseScraper {
    constructor() {
        super(JobSource.GREENHOUSE);
    }

    /**
     * Scrape jobs from Greenhouse API
     */
    async scrape(company: CompanyConfig): Promise<ScrapedJob[]> {
        this.logger.info(`Starting Greenhouse scrape for ${company.name}`);

        if (!company.apiEndpoint) {
            throw new Error(`No API endpoint configured for ${company.name}`);
        }

        const jobs: ScrapedJob[] = [];

        try {
            // Greenhouse API returns all jobs in one request (no pagination)
            const response = await this.withRetry(
                () => axios.get<GreenhouseJobsResponse>(company.apiEndpoint!, {
                    timeout: 30000,
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'JobScraper/1.0',
                    },
                }),
                `Greenhouse API request for ${company.name}`
            );

            const greenhouseJobs = response.data.jobs || [];
            this.logger.debug(`Fetched ${greenhouseJobs.length} jobs from ${company.name}`);

            // For each job, fetch the full details
            for (const job of greenhouseJobs) {
                try {
                    const fullJob = await this.fetchJobDetails(company, job.id);
                    const scrapedJob = this.transformJob(fullJob, company);
                    jobs.push(scrapedJob);
                    await this.delay(200); // Small delay between detail requests
                } catch (err) {
                    this.logger.warn(`Failed to fetch/transform Greenhouse job ${job.id}: ${err}`);
                    // Still try to transform the basic job info
                    try {
                        const scrapedJob = this.transformJob(job, company);
                        jobs.push(scrapedJob);
                    } catch {
                        // Skip this job
                    }
                }
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 429) {
                this.logger.warn(`Rate limited by Greenhouse, waiting 60 seconds...`);
                await this.delay(60000);
                throw error;
            }
            throw error;
        }

        this.logger.info(`Completed Greenhouse scrape for ${company.name}: ${jobs.length} jobs found`);
        return jobs;
    }

    /**
     * Fetch full job details from Greenhouse
     */
    private async fetchJobDetails(company: CompanyConfig, jobId: number): Promise<GreenhouseJob> {
        const baseUrl = company.apiEndpoint!.replace('/jobs', '');
        const url = `${baseUrl}/jobs/${jobId}`;

        const response = await axios.get<GreenhouseJob>(url, {
            timeout: 15000,
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'JobScraper/1.0',
            },
        });

        return response.data;
    }

    /**
     * Transform a Greenhouse job to our standard format
     */
    private transformJob(job: GreenhouseJob, company: CompanyConfig): ScrapedJob {
        // Parse the updated_at date (Greenhouse doesn't always provide posted date)
        let postedDate: Date | undefined;
        if (job.updated_at) {
            try {
                postedDate = parseISO(job.updated_at);
            } catch {
                // Unable to parse date
            }
        }

        // Build location string
        const locationParts: string[] = [];
        if (job.location?.name) {
            locationParts.push(job.location.name);
        }
        if (job.offices && job.offices.length > 0) {
            for (const office of job.offices) {
                if (office.location && !locationParts.includes(office.location)) {
                    locationParts.push(office.location);
                }
            }
        }
        const location = locationParts.length > 0 ? locationParts.join(', ') : 'Not specified';

        // Determine location type
        let locationType: string | undefined;
        const locationLower = location.toLowerCase();
        if (locationLower.includes('remote')) {
            locationType = 'Remote';
        } else if (locationLower.includes('hybrid')) {
            locationType = 'Hybrid';
        } else {
            locationType = 'Onsite';
        }

        // Get department/category
        const category = job.departments && job.departments.length > 0
            ? job.departments[0].name
            : undefined;

        // Clean description (remove HTML)
        const description = this.cleanText(job.content || '');

        return {
            externalId: job.id.toString(),
            title: job.title,
            company: company.name,
            companySlug: company.slug,
            location,
            locationType,
            description,
            shortSummary: extractFirst50Words(description),
            url: job.absolute_url,
            applyUrl: job.absolute_url,
            source: JobSource.GREENHOUSE,
            category,
            postedDate,
            rawData: job as unknown as Record<string, unknown>,
        };
    }
}

export default GreenhouseScraper;
