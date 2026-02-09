import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Application configuration loaded from environment variables
 */
export const config = {
    // Database
    databaseUrl: process.env.DATABASE_URL || '',

    // Scraping
    scrapeIntervalCron: process.env.SCRAPE_INTERVAL_CRON || '0 */3 * * *',
    maxConcurrentScrapers: parseInt(process.env.MAX_CONCURRENT_SCRAPERS || '5', 10),
    requestDelayMs: parseInt(process.env.REQUEST_DELAY_MS || '2000', 10),
    maxRetryAttempts: parseInt(process.env.MAX_RETRY_ATTEMPTS || '3', 10),
    batchSize: parseInt(process.env.BATCH_SIZE || '50', 10),

    // Multi-Server Mode
    multiServerMode: process.env.MULTI_SERVER_MODE || 'standalone', // 'standalone', 'redis', 'aws'

    // Redis (for distributed queue)
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    workerConcurrency: parseInt(process.env.WORKER_CONCURRENCY || '3', 10),

    // AWS S3 (for data backup)
    enableS3Backup: process.env.ENABLE_S3_BACKUP === 'true',
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    awsS3Bucket: process.env.AWS_S3_BUCKET || '',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',

    // Filtering
    daysLookback: parseInt(process.env.DAYS_LOOKBACK || '1', 10),
    usaOnly: process.env.USA_ONLY !== 'false',
    itJobsOnly: process.env.IT_JOBS_ONLY !== 'false',

    // Browser (Playwright)
    headless: process.env.HEADLESS !== 'false',
    browserTimeoutMs: parseInt(process.env.BROWSER_TIMEOUT_MS || '30000', 10),

    // Logging
    logLevel: process.env.LOG_LEVEL || 'info',
    logDir: process.env.LOG_DIR || './logs',

    // Application
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),

    // Computed
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDistributed: process.env.MULTI_SERVER_MODE === 'redis' || process.env.MULTI_SERVER_MODE === 'aws',
} as const;

/**
 * Validate required configuration
 */
export function validateConfig(): void {
    const required = ['databaseUrl'];
    const missing = required.filter((key) => !config[key as keyof typeof config]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

export default config;
