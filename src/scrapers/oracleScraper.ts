/**
 * Oracle Cloud Scraper
 * 
 * Scrapes job postings from companies using Oracle Cloud (HCM) ATS.
 * These sites typically use an internal REST API.
 * 
 * Example URL:
 * https://fa-ewmy-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/3094
 */

import axios from 'axios';
import { JobSource } from '@prisma/client';
import { BaseScraper } from './baseScraper.js';
import { CompanyConfig, ScrapedJob } from '../types/index.js';
import { parseJobDate, logger, extractFirst50Words } from '../utils/index.js';

interface OracleJob {
    Id: number | string;
    Title: string;
    title?: string; // Support lowercase
    Location?: string;
    Locations?: Array<{ Location: string }>;
    PostedDate?: string;
    JobDescription?: string;
    ShortDescription?: string;
    PrimaryLocation?: string;
    [key: string]: unknown;
}

interface OracleApiResponse {
    items?: OracleJob[];
    count?: number;
    hasMore?: boolean;
    [key: string]: unknown;
}

export class OracleScraper extends BaseScraper {
    constructor() {
        super(JobSource.ORACLE);
    }

    async scrape(company: CompanyConfig): Promise<ScrapedJob[]> {
        logger.info(`[ORACLE] Scraping ${company.name}...`);

        try {
            // Find the API endpoint
            const apiEndpoint = company.apiEndpoint || this.deriveApiEndpoint(company.careersUrl);

            if (!apiEndpoint) {
                logger.warn(`[ORACLE] Could not determine API endpoint for ${company.name}`);
                return [];
            }

            // Oracle APIs usually require a POST or GET to a specific resource
            // Endpoint often looks like: /hcmRestApi/resources/latest/recruitingCEJobRequisitions

            // Extract site number (e.g., "CX" or "CX_1")
            const siteNumber = this.extractSiteNumber(company.careersUrl) || 'CX';

            // Construct the finder parameter
            const finder = `findReqs;siteNumber=${siteNumber}`;

            const response = await axios.get<OracleApiResponse>(apiEndpoint, {
                params: {
                    onlyData: true,
                    expand: 'requisitionList',
                    limit: 100,
                    offset: 0,
                    finder: finder,
                },
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'ora-irc-language': 'en',
                },
                timeout: 30000,
            });

            let items = response.data.items || [];

            // Oracle often wraps the actual jobs in a 'requisitionList' property within the first item
            if (items.length > 0 && (items[0] as any).requisitionList) {
                items = (items[0] as any).requisitionList;
            }

            logger.info(`[ORACLE] Found ${items.length} jobs for ${company.name}`);

            const scrapedJobs: ScrapedJob[] = [];

            for (const item of items) {
                try {
                    const job = this.transformJob(item, company);
                    if (job) {
                        scrapedJobs.push(job);
                    }
                } catch (error) {
                    logger.debug(`[ORACLE] Failed to transform job: ${error}`);
                }
            }

            return scrapedJobs;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            logger.error(`[ORACLE] Failed to scrape ${company.name}: ${errorMessage}`);
            return [];
        }
    }

    private extractSiteNumber(careersUrl: string): string | null {
        try {
            // URL pattern: .../sites/CX/requisitions or .../sites/CX_1/...
            const match = careersUrl.match(/\/sites\/([^/]+)/);
            return match ? match[1] : null;
        } catch {
            return null;
        }
    }

    private deriveApiEndpoint(careersUrl: string): string | null {
        try {
            const url = new URL(careersUrl);

            // Example: https://fa-ewmy-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/3094
            // API: https://fa-ewmy-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions

            if (url.hostname.includes('oraclecloud.com')) {
                return `${url.origin}/hcmRestApi/resources/latest/recruitingCEJobRequisitions`;
            }

            return null;
        } catch {
            return null;
        }
    }

    private transformJob(item: OracleJob, company: CompanyConfig): ScrapedJob | null {
        // Handle different casing support just in case
        const title = item.Title || item.title;
        if (!title) {
            // Log missing title for debugging
            // logger.debug(`[ORACLE] Item missing title: ${JSON.stringify(item)}`);
            return null;
        }

        // Extract location
        let location = item.PrimaryLocation || item.Location || 'Not Specified';

        // Sometimes locations are in an array
        if (item.Locations && item.Locations.length > 0) {
            location = item.Locations.map(l => l.Location).join(', ');
        }

        const externalId = String(item.Id);

        // Oracle Cloud job links follow a pattern relative to the career site
        // If we don't know the site ID (e.g. "CX"), we might default to a generic one or use the config
        // Default pattern: [BaseURL]/hcmUI/CandidateExperience/en/sites/[SiteID]/job/[JobID]
        // Since we don't always know SiteID dynamically, we rely on user providing a base apply URL if possible, 
        // or we try to reconstruct it from the careersUrl.

        let jobUrl = company.careersUrl;

        // Try to append job ID intelligently
        if (jobUrl.includes('/job/')) {
            // Unlikely to happen for the main listing page
            jobUrl = jobUrl.substring(0, jobUrl.lastIndexOf('/job/')) + `/job/${externalId}`;
        } else if (jobUrl.endsWith('/')) {
            jobUrl = `${jobUrl}job/${externalId}`;
        } else {
            jobUrl = `${jobUrl}/job/${externalId}`;
        }

        // Clean description
        const description = item.JobDescription || title;
        const shortSummary = extractFirst50Words(description);

        // Date
        const parsedDate = item.PostedDate ? parseJobDate(item.PostedDate) : null;
        const postedDate = parsedDate?.date ?? undefined;

        // Computed fields handled by processor
        // isITJob, isUSA

        return {
            externalId,
            title,
            company: company.name,
            companySlug: company.slug,
            location,
            locationType: this.detectLocationType(location, title),
            description,
            shortSummary,
            url: jobUrl,
            applyUrl: jobUrl,
            source: JobSource.ORACLE,
            postedDate,
        };
    }

    private detectLocationType(location: string, title: string): string {
        const combined = `${location} ${title}`.toLowerCase();
        if (combined.includes('remote')) return 'Remote';
        if (combined.includes('hybrid')) return 'Hybrid';
        return 'Onsite';
    }
}

export default OracleScraper;
