/**
 * Scraper Factory
 * 
 * Returns the appropriate scraper based on the ATS type.
 */

import { JobSource } from '@prisma/client';
import { Scraper } from '../types/index.js';
import { LeverScraper } from './leverScraper.js';
import { GreenhouseScraper } from './greenhouseScraper.js';
import { WorkdayScraper } from './workdayScraper.js';
import { IcimsScraper } from './icimsScraper.js';
import { OracleScraper } from './oracleScraper.js';

// Singleton instances
let leverScraper: LeverScraper | null = null;
let greenhouseScraper: GreenhouseScraper | null = null;
let workdayScraper: WorkdayScraper | null = null;
let icimsScraper: IcimsScraper | null = null;
let oracleScraper: OracleScraper | null = null;

/**
 * Get a scraper instance for the given source type
 * 
 * @param source - The ATS type (LEVER, GREENHOUSE, WORKDAY)
 * @returns The appropriate scraper instance
 */
export function getScraper(source: JobSource): Scraper {
    switch (source) {
        case JobSource.LEVER:
            if (!leverScraper) {
                leverScraper = new LeverScraper();
            }
            return leverScraper;

        case JobSource.GREENHOUSE:
            if (!greenhouseScraper) {
                greenhouseScraper = new GreenhouseScraper();
            }
            return greenhouseScraper;

        case JobSource.WORKDAY:
            if (!workdayScraper) {
                workdayScraper = new WorkdayScraper();
            }
            return workdayScraper;

        case JobSource.ICIMS:
            if (!icimsScraper) {
                icimsScraper = new IcimsScraper();
            }
            return icimsScraper;

        case JobSource.ORACLE:
            if (!oracleScraper) {
                oracleScraper = new OracleScraper();
            }
            return oracleScraper;

        default:
            throw new Error(`Unsupported job source: ${source}`);
    }
}

/**
 * Get all supported sources
 */
export function getSupportedSources(): JobSource[] {
    return [JobSource.LEVER, JobSource.GREENHOUSE, JobSource.WORKDAY, JobSource.ICIMS, JobSource.ORACLE];
}

/**
 * Check if a source is supported
 */
export function isSourceSupported(source: JobSource): boolean {
    return getSupportedSources().includes(source);
}

export default getScraper;
