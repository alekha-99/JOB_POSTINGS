/**
 * Job Queue Service
 * 
 * Provides a distributed job queue using BullMQ/Redis for multi-server scaling.
 * Falls back to in-memory processing when Redis is not configured.
 */

import config from '../utils/config.js';
import { logger } from '../utils/index.js';
import { Company } from '@prisma/client';

// Queue job types
export interface ScrapeJob {
    companyId: string;
    companySlug: string;
    companyName: string;
    source: string;
    careersUrl: string;
    apiEndpoint: string | null;
    priority: number;
}

export interface QueueStats {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
}

// In-memory queue for standalone mode
let memoryQueue: ScrapeJob[] = [];
let processingCount = 0;

/**
 * Check if Redis queue mode is enabled
 */
export function isQueueEnabled(): boolean {
    return config.multiServerMode === 'redis';
}

/**
 * Initialize the queue connection
 */
export async function initializeQueue(): Promise<void> {
    if (!isQueueEnabled()) {
        logger.info('📦 Queue mode: standalone (in-memory)');
        return;
    }

    try {
        // Dynamic import to avoid loading bullmq when not needed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - bullmq is an optional dependency
        const bullmq = await import('bullmq').catch(() => null) as any;
        if (!bullmq) {
            logger.warn('⚠️  bullmq not installed - falling back to standalone mode');
            return;
        }

        const queue = new bullmq.Queue('scrape-jobs', {
            connection: {
                url: config.redisUrl,
            },
        });

        // Test connection
        await queue.getJobCounts();
        logger.info(`✅ Queue connected to Redis: ${config.redisUrl}`);

        await queue.close();
    } catch (error) {
        logger.error(`❌ Queue initialization failed: ${error}`);
        logger.warn('⚠️  Falling back to standalone mode');
    }
}

/**
 * Add companies to the scrape queue
 */
export async function addToQueue(companies: Company[]): Promise<number> {
    const jobs: ScrapeJob[] = companies.map((c) => ({
        companyId: c.id,
        companySlug: c.slug,
        companyName: c.name,
        source: c.source,
        careersUrl: c.careersUrl,
        apiEndpoint: c.apiEndpoint,
        priority: c.priority,
    }));

    if (!isQueueEnabled()) {
        // Standalone mode: add to memory queue
        memoryQueue.push(...jobs);
        logger.debug(`Added ${jobs.length} jobs to memory queue`);
        return jobs.length;
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - bullmq is an optional dependency
        const bullmq = await import('bullmq').catch(() => null) as any;
        if (!bullmq) {
            memoryQueue.push(...jobs);
            return jobs.length;
        }

        const queue = new bullmq.Queue('scrape-jobs', {
            connection: { url: config.redisUrl },
        });

        // Add jobs in bulk with priority
        const bulkJobs = jobs.map((job) => ({
            name: 'scrape',
            data: job,
            opts: {
                priority: job.priority,
                attempts: config.maxRetryAttempts,
                backoff: {
                    type: 'exponential' as const,
                    delay: 1000,
                },
            },
        }));

        await queue.addBulk(bulkJobs);
        await queue.close();

        logger.info(`📤 Added ${jobs.length} jobs to Redis queue`);
        return jobs.length;
    } catch (error) {
        logger.error(`❌ Failed to add jobs to queue: ${error}`);
        // Fallback to memory queue
        memoryQueue.push(...jobs);
        return jobs.length;
    }
}

/**
 * Get next job from queue (for standalone mode)
 */
export function getNextJob(): ScrapeJob | undefined {
    return memoryQueue.shift();
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<QueueStats> {
    if (!isQueueEnabled()) {
        return {
            waiting: memoryQueue.length,
            active: processingCount,
            completed: 0,
            failed: 0,
        };
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - bullmq is an optional dependency
        const bullmq = await import('bullmq').catch(() => null) as any;
        if (!bullmq) {
            return { waiting: memoryQueue.length, active: processingCount, completed: 0, failed: 0 };
        }

        const queue = new bullmq.Queue('scrape-jobs', {
            connection: { url: config.redisUrl },
        });

        const counts = await queue.getJobCounts();
        await queue.close();

        return {
            waiting: counts.waiting || 0,
            active: counts.active || 0,
            completed: counts.completed || 0,
            failed: counts.failed || 0,
        };
    } catch (error) {
        logger.error(`Failed to get queue stats: ${error}`);
        return { waiting: 0, active: 0, completed: 0, failed: 0 };
    }
}

/**
 * Clear the queue
 */
export async function clearQueue(): Promise<void> {
    if (!isQueueEnabled()) {
        memoryQueue = [];
        logger.info('🗑️  Memory queue cleared');
        return;
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - bullmq is an optional dependency
        const bullmq = await import('bullmq').catch(() => null) as any;
        if (!bullmq) {
            memoryQueue = [];
            return;
        }

        const queue = new bullmq.Queue('scrape-jobs', {
            connection: { url: config.redisUrl },
        });

        await queue.obliterate({ force: true });
        await queue.close();

        logger.info('🗑️  Redis queue cleared');
    } catch (error) {
        logger.error(`Failed to clear queue: ${error}`);
    }
}

/**
 * Track job processing (for standalone mode)
 */
export function startProcessing(): void {
    processingCount++;
}

export function finishProcessing(): void {
    processingCount = Math.max(0, processingCount - 1);
}

export default {
    isQueueEnabled,
    initializeQueue,
    addToQueue,
    getNextJob,
    getQueueStats,
    clearQueue,
    startProcessing,
    finishProcessing,
};
