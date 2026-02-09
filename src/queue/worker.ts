/**
 * Queue Worker Process
 * 
 * Standalone worker that processes jobs from the Redis queue.
 * Run multiple instances for horizontal scaling.
 * 
 * Usage: npx tsx src/queue/worker.ts
 */

import { PrismaClient } from '@prisma/client';
import config from '../utils/config.js';
import { logger } from '../utils/index.js';
import { getScraper } from '../scrapers/index.js';
import { processAndSaveJobs } from '../services/jobProcessor.js';
import { ScrapeJob } from './jobQueue.js';

const prisma = new PrismaClient();

/**
 * Process a single scrape job
 */
async function processJob(job: ScrapeJob): Promise<{ success: boolean; jobsFound: number; jobsSaved: number }> {
    const startTime = Date.now();
    logger.info(`🔄 Processing: ${job.companyName} (${job.source})`);

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const scraper = getScraper(job.source as any);

        const companyConfig = {
            id: job.companyId,
            name: job.companyName,
            slug: job.companySlug,
            source: job.source,
            careersUrl: job.careersUrl,
            apiEndpoint: job.apiEndpoint,
            enabled: true,
            priority: job.priority,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jobs = await scraper.scrape(companyConfig as any);
        const { saved } = await processAndSaveJobs(jobs);

        const duration = Date.now() - startTime;
        logger.info(`✅ ${job.companyName}: ${jobs.length} found, ${saved} saved (${duration}ms)`);

        return { success: true, jobsFound: jobs.length, jobsSaved: saved };
    } catch (error) {
        logger.error(`❌ ${job.companyName} failed: ${error}`);
        return { success: false, jobsFound: 0, jobsSaved: 0 };
    }
}

/**
 * Start the worker
 */
async function startWorker(): Promise<void> {
    logger.info(`
╔═══════════════════════════════════════════════════════════╗
║           🔧 Job Scraper Worker                           ║
╠═══════════════════════════════════════════════════════════╣
║  Processing jobs from Redis queue                         ║
║  Concurrency: ${config.workerConcurrency}                                          ║
╚═══════════════════════════════════════════════════════════╝
    `);

    if (config.multiServerMode !== 'redis') {
        logger.error('Worker mode requires MULTI_SERVER_MODE=redis');
        process.exit(1);
    }

    try {
        // Test database connection
        await prisma.$connect();
        logger.info('✅ Database connected');

        // Dynamic import BullMQ
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - bullmq is an optional dependency
        const bullmq = await import('bullmq').catch(() => null) as any;
        if (!bullmq) {
            logger.error('❌ bullmq package not installed. Run: npm install bullmq ioredis');
            process.exit(1);
        }

        const worker = new bullmq.Worker(
            'scrape-jobs',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async (job: any) => {
                const scrapeJob = job.data as ScrapeJob;
                const result = await processJob(scrapeJob);

                if (!result.success) {
                    throw new Error(`Scrape failed for ${scrapeJob.companyName}`);
                }

                return result;
            },
            {
                connection: { url: config.redisUrl },
                concurrency: config.workerConcurrency,
            }
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        worker.on('completed', (job: any, result: any) => {
            logger.debug(`Job ${job.id} completed: ${JSON.stringify(result)}`);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        worker.on('failed', (job: any, error: Error) => {
            logger.error(`Job ${job?.id} failed: ${error.message}`);
        });

        worker.on('error', (error: Error) => {
            logger.error(`Worker error: ${error}`);
        });

        logger.info('✅ Worker started, waiting for jobs...');

        // Graceful shutdown
        process.on('SIGINT', async () => {
            logger.info('🛑 Shutting down worker...');
            await worker.close();
            await prisma.$disconnect();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            logger.info('🛑 Shutting down worker...');
            await worker.close();
            await prisma.$disconnect();
            process.exit(0);
        });
    } catch (error) {
        logger.error(`❌ Worker failed to start: ${error}`);
        await prisma.$disconnect();
        process.exit(1);
    }
}

// Run worker
startWorker();
