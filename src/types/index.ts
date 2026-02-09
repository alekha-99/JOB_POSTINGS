/**
 * Type definitions for the Job Scraper System
 */

import { JobSource, ScraperStatus } from '@prisma/client';

/**
 * Raw job data scraped from an ATS
 */
export interface ScrapedJob {
    externalId: string;
    title: string;
    company: string;
    companySlug: string;
    location: string;
    locationType?: string;
    description: string;
    shortSummary?: string;  // First 50 words of description
    requirements?: string;
    url: string;
    applyUrl?: string;
    source: JobSource;
    category?: string;
    postedDate?: Date;
    rawData?: Record<string, unknown>;
}

/**
 * Company configuration for scraping
 */
export interface CompanyConfig {
    id: string;
    name: string;
    slug: string;
    source: JobSource;
    careersUrl: string;
    apiEndpoint?: string | null;
    enabled: boolean;
    priority: number;
}

/**
 * Result of a scraper run
 */
export interface ScrapeResult {
    companySlug: string;
    source: JobSource;
    status: ScraperStatus;
    jobs: ScrapedJob[];
    jobsFound: number;
    jobsSaved: number;
    error?: string;
    startedAt: Date;
    completedAt?: Date;
}

/**
 * Scraper interface that all scrapers must implement
 */
export interface Scraper {
    /**
     * Scrape jobs from the company
     */
    scrape(company: CompanyConfig): Promise<ScrapedJob[]>;

    /**
     * Get the source type
     */
    getSource(): JobSource;
}

/**
 * Lever API response types
 */
export interface LeverJob {
    id: string;
    text: string;  // Job title
    hostedUrl: string;
    applyUrl: string;
    createdAt: number;  // Unix timestamp in ms
    categories: {
        commitment?: string;
        department?: string;
        location?: string;
        team?: string;
    };
    description: string;
    descriptionPlain: string;
    lists: Array<{
        text: string;
        content: string;
    }>;
}

/**
 * Greenhouse API response types
 */
export interface GreenhouseJobsResponse {
    jobs: GreenhouseJob[];
    meta: {
        total: number;
    };
}

export interface GreenhouseJob {
    id: number;
    internal_job_id: number;
    title: string;
    updated_at: string;
    requisition_id: string | null;
    absolute_url: string;
    location: {
        name: string;
    };
    departments: Array<{
        id: number;
        name: string;
    }>;
    offices: Array<{
        id: number;
        name: string;
        location: string;
    }>;
    content: string;  // HTML description
}

/**
 * Job processing result
 */
export interface ProcessedJob {
    job: ScrapedJob;
    isITJob: boolean;
    isUSA: boolean;
    isRecent: boolean;
    shouldSave: boolean;
    skipReason?: string;
}

/**
 * Retry configuration
 */
export interface RetryConfig {
    maxAttempts: number;
    initialDelayMs: number;
    maxDelayMs: number;
    backoffMultiplier: number;
}

/**
 * Scraper run statistics
 */
export interface ScraperStats {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    totalJobsFound: number;
    totalJobsSaved: number;
    averageDuration: number;
}
