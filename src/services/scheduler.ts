/**
 * Cron Scheduler Service
 * 
 * Manages scheduled execution of the job scraper.
 */

import cron from 'node-cron';
import { runOrchestration } from './orchestrator.js';
import { logger } from '../utils/index.js';
import config from '../utils/config.js';

let scheduledTask: cron.ScheduledTask | null = null;
let isRunning = false;

/**
 * Start the cron scheduler
 */
export function startScheduler(): void {
    if (scheduledTask) {
        logger.warn('Scheduler is already running');
        return;
    }

    const cronExpression = config.scrapeIntervalCron;

    // Validate cron expression
    if (!cron.validate(cronExpression)) {
        throw new Error(`Invalid cron expression: ${cronExpression}`);
    }

    logger.info(`📅 Starting scheduler with cron: ${cronExpression}`);

    scheduledTask = cron.schedule(cronExpression, async () => {
        if (isRunning) {
            logger.warn('Previous scraping cycle still running, skipping this trigger');
            return;
        }

        isRunning = true;
        logger.info('⏰ Scheduled scrape triggered');

        try {
            await runOrchestration();
        } catch (error) {
            logger.error(`Scheduled scrape failed: ${error}`);
        } finally {
            isRunning = false;
        }
    });

    logger.info('✅ Scheduler started successfully');
}

/**
 * Stop the cron scheduler
 */
export function stopScheduler(): void {
    if (!scheduledTask) {
        logger.warn('Scheduler is not running');
        return;
    }

    scheduledTask.stop();
    scheduledTask = null;
    logger.info('🛑 Scheduler stopped');
}

/**
 * Check if scheduler is running
 */
export function isSchedulerRunning(): boolean {
    return scheduledTask !== null;
}

/**
 * Check if a scrape is currently in progress
 */
export function isScrapeInProgress(): boolean {
    return isRunning;
}

/**
 * Get scheduler status
 */
export function getSchedulerStatus(): {
    isRunning: boolean;
    cronExpression: string;
    isScraping: boolean;
} {
    return {
        isRunning: isSchedulerRunning(),
        cronExpression: config.scrapeIntervalCron,
        isScraping: isRunning,
    };
}

/**
 * Manually trigger a scrape (outside of schedule)
 */
export async function triggerManualScrape(): Promise<Awaited<ReturnType<typeof runOrchestration>>> {
    if (isRunning) {
        throw new Error('A scrape is already in progress');
    }

    isRunning = true;
    logger.info('🔧 Manual scrape triggered');

    try {
        return await runOrchestration();
    } finally {
        isRunning = false;
    }
}

export default {
    startScheduler,
    stopScheduler,
    isSchedulerRunning,
    isScrapeInProgress,
    getSchedulerStatus,
    triggerManualScrape,
};
