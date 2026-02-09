/**
 * Base Scraper Interface
 * 
 * Abstract base class that provides common functionality for all scrapers.
 */

import { JobSource } from '@prisma/client';
import { Scraper, ScrapedJob, CompanyConfig } from '../types/index.js';
import { logger } from '../utils/index.js';
import config from '../utils/config.js';

export abstract class BaseScraper implements Scraper {
    protected source: JobSource;
    protected logger: typeof logger;

    constructor(source: JobSource) {
        this.source = source;
        this.logger = logger.child({ scraper: source });
    }

    /**
     * Abstract method to be implemented by each scraper
     */
    abstract scrape(company: CompanyConfig): Promise<ScrapedJob[]>;

    /**
     * Get the source type
     */
    getSource(): JobSource {
        return this.source;
    }

    /**
     * Generate a unique source job ID
     */
    protected generateSourceJobId(company: CompanyConfig, externalId: string): string {
        return `${this.source}_${company.slug}_${externalId}`;
    }

    /**
     * Add delay between requests
     */
    protected async delay(ms?: number): Promise<void> {
        const delayMs = ms ?? config.requestDelayMs;
        return new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    /**
     * Retry an operation with exponential backoff
     */
    protected async withRetry<T>(
        operation: () => Promise<T>,
        operationName: string,
        maxAttempts: number = config.maxRetryAttempts
    ): Promise<T> {
        let lastError: Error | null = null;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));

                if (attempt < maxAttempts) {
                    const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
                    this.logger.warn(`${operationName} failed (attempt ${attempt}/${maxAttempts}), retrying in ${delayMs}ms: ${lastError.message}`);
                    await this.delay(delayMs);
                }
            }
        }

        throw lastError;
    }

    /**
     * Clean and normalize text content
     */
    protected cleanText(text: string): string {
        return text
            .replace(/<[^>]*>/g, ' ')  // Remove HTML tags
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\s+/g, ' ')
            .trim();
    }
}

export default BaseScraper;
