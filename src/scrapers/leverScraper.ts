/**
 * Lever Scraper
 * 
 * Scrapes job postings from Lever ATS using their public API.
 * Lever provides a simple REST API that returns JSON.
 */

import axios, { AxiosError } from 'axios';
import { JobSource } from '@prisma/client';
import { BaseScraper } from './baseScraper.js';
import { ScrapedJob, CompanyConfig, LeverJob } from '../types/index.js';
import { parseTimestamp } from '../utils/dateParser.js';
import { extractFirst50Words } from '../utils/extractSummary.js';

export class LeverScraper extends BaseScraper {
    constructor() {
        super(JobSource.LEVER);
    }

    /**
     * Scrape jobs from Lever API
     */
    async scrape(company: CompanyConfig): Promise<ScrapedJob[]> {
        this.logger.info(`Starting Lever scrape for ${company.name}`);

        if (!company.apiEndpoint) {
            throw new Error(`No API endpoint configured for ${company.name}`);
        }

        const jobs: ScrapedJob[] = [];
        let skip = 0;
        const limit = 100; // Lever's max is typically 100
        let hasMore = true;

        while (hasMore) {
            try {
                const url = new URL(company.apiEndpoint);
                url.searchParams.set('skip', skip.toString());
                url.searchParams.set('limit', limit.toString());

                const response = await this.withRetry(
                    () => axios.get<LeverJob[]>(url.toString(), {
                        timeout: 30000,
                        headers: {
                            'Accept': 'application/json',
                            'User-Agent': 'JobScraper/1.0',
                        },
                    }),
                    `Lever API request for ${company.name}`
                );

                const leverJobs = response.data;

                if (!leverJobs || leverJobs.length === 0) {
                    hasMore = false;
                    break;
                }

                for (const leverJob of leverJobs) {
                    try {
                        const scrapedJob = this.transformJob(leverJob, company);
                        jobs.push(scrapedJob);
                    } catch (err) {
                        this.logger.warn(`Failed to transform Lever job ${leverJob.id}: ${err}`);
                    }
                }

                this.logger.debug(`Fetched ${leverJobs.length} jobs from ${company.name} (offset: ${skip})`);

                if (leverJobs.length < limit) {
                    hasMore = false;
                } else {
                    skip += limit;
                    await this.delay(500); // Small delay between pagination
                }
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === 429) {
                    // Rate limited
                    this.logger.warn(`Rate limited by Lever, waiting 60 seconds...`);
                    await this.delay(60000);
                } else {
                    throw error;
                }
            }
        }

        this.logger.info(`Completed Lever scrape for ${company.name}: ${jobs.length} jobs found`);
        return jobs;
    }

    /**
     * Transform a Lever job to our standard format
     */
    private transformJob(leverJob: LeverJob, company: CompanyConfig): ScrapedJob {
        const postedDate = parseTimestamp(leverJob.createdAt);

        // Build description from various fields
        let description = leverJob.descriptionPlain || '';
        if (leverJob.lists && leverJob.lists.length > 0) {
            for (const list of leverJob.lists) {
                description += `\n\n${list.text}:\n${this.cleanText(list.content)}`;
            }
        }

        // Extract location type from commitment or location
        let locationType: string | undefined;
        const commitment = leverJob.categories?.commitment?.toLowerCase() || '';
        const location = leverJob.categories?.location || '';

        if (commitment.includes('remote') || location.toLowerCase().includes('remote')) {
            locationType = 'Remote';
        } else if (location.toLowerCase().includes('hybrid')) {
            locationType = 'Hybrid';
        } else {
            locationType = 'Onsite';
        }

        return {
            externalId: leverJob.id,
            title: leverJob.text,
            company: company.name,
            companySlug: company.slug,
            location: leverJob.categories?.location || 'Not specified',
            locationType,
            description: description.trim(),
            shortSummary: extractFirst50Words(description),
            url: leverJob.hostedUrl,
            applyUrl: leverJob.applyUrl,
            source: JobSource.LEVER,
            category: leverJob.categories?.team || leverJob.categories?.department,
            postedDate,
            rawData: leverJob as unknown as Record<string, unknown>,
        };
    }
}

export default LeverScraper;
