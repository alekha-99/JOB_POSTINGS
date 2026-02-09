
import { JobSource } from '@prisma/client';
import { logger } from '../utils/logger.js';

interface DiscoveredConfig {
    source: JobSource;
    careersUrl: string;
    apiEndpoint?: string;
}

export class DiscoveryService {

    /**
     * Analyzes a URL to determine the ATS provider and configuration
     */
    async discover(url: string): Promise<DiscoveredConfig | null> {
        logger.info(`[Discovery] Analyzing URL: ${url}`);

        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();

            // 1. Check Hostname Patterns
            if (hostname.includes('greenhouse.io')) {
                return { source: JobSource.GREENHOUSE, careersUrl: url };
            }
            if (hostname.includes('lever.co')) {
                return { source: JobSource.LEVER, careersUrl: url };
            }
            if (hostname.includes('myworkdayjobs.com')) {
                return { source: JobSource.WORKDAY, careersUrl: url };
            }
            if (hostname.includes('icims.com')) {
                return { source: JobSource.ICIMS, careersUrl: url };
            }
            if (hostname.includes('oraclecloud.com')) {
                return { source: JobSource.ORACLE, careersUrl: url };
            }

            logger.warn(`[Discovery] Could not auto-detect ATS for ${url}`);
            return null;

        } catch (error) {
            logger.error(`[Discovery] Invalid URL: ${url}`);
            return null;
        }
    }
}
