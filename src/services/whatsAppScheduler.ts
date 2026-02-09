/**
 * WhatsApp Scheduler
 * 
 * Handles scheduling and sending WhatsApp digests at configured times.
 * Supports both Twilio and WAHA providers.
 */

import cron from 'node-cron';
import { logger } from '../utils/logger.js';
import { prisma } from './database.js';
import { whatsAppService, validateWhatsAppConfig } from './whatsAppService.js';
import { wahaService, validateWahaConfig } from './wahaService.js';

// Track scheduled tasks
let scheduledTasks: cron.ScheduledTask[] = [];

/**
 * Get the current WhatsApp provider
 */
function getProvider(): 'twilio' | 'waha' | 'none' {
    const provider = process.env.WHATSAPP_PROVIDER || 'twilio';

    if (provider === 'waha' && validateWahaConfig()) {
        return 'waha';
    }

    if (validateWhatsAppConfig()) {
        return 'twilio';
    }

    return 'none';
}

/**
 * Get unsent IT jobs from the database
 */
export async function getUnsentJobs(limit: number = 50): Promise<Awaited<ReturnType<typeof prisma.job.findMany>>> {
    return prisma.job.findMany({
        where: {
            isITJob: true,
            isUSA: true,
            sentToWhatsApp: false,
        },
        orderBy: { scrapedAt: 'desc' },
        take: limit,
    });
}

/**
 * Get jobs scraped in the last N hours that haven't been sent
 */
export async function getRecentUnsentJobs(hoursBack: number = 4): Promise<Awaited<ReturnType<typeof prisma.job.findMany>>> {
    const sinceDate = new Date();
    sinceDate.setHours(sinceDate.getHours() - hoursBack);

    return prisma.job.findMany({
        where: {
            isITJob: true,
            isUSA: true,
            sentToWhatsApp: false,
            scrapedAt: { gte: sinceDate },
        },
        orderBy: { scrapedAt: 'desc' },
    });
}

/**
 * Send a digest of unsent jobs using the configured provider
 */
export async function sendDigest(): Promise<{ jobCount: number; messagesSent: number; messagesFailed: number }> {
    const provider = getProvider();

    if (provider === 'none') {
        logger.warn('No WhatsApp provider configured');
        return { jobCount: 0, messagesSent: 0, messagesFailed: 0 };
    }

    logger.info(`Starting WhatsApp digest using ${provider.toUpperCase()}...`);

    const jobs = await getUnsentJobs(50);

    if (jobs.length === 0) {
        logger.info('No unsent jobs to send');
        return { jobCount: 0, messagesSent: 0, messagesFailed: 0 };
    }

    logger.info(`Found ${jobs.length} unsent jobs`);

    // Use the appropriate service based on provider
    let result: { sent: number; failed: number };

    if (provider === 'waha') {
        result = await wahaService.sendJobDigest(jobs);
    } else {
        result = await whatsAppService.sendJobDigest(jobs);
    }

    return {
        jobCount: jobs.length,
        messagesSent: result.sent,
        messagesFailed: result.failed,
    };
}

/**
 * Send a digest triggered by new jobs after a scrape
 */
export async function sendPostScrapeDigest(newJobCount: number): Promise<void> {
    if (newJobCount === 0) {
        logger.debug('No new jobs to send to WhatsApp');
        return;
    }

    const provider = getProvider();
    if (provider === 'none') {
        logger.debug('No WhatsApp provider configured, skipping digest');
        return;
    }

    logger.info(`${newJobCount} new jobs saved, sending WhatsApp digest via ${provider.toUpperCase()}...`);

    const result = await sendDigest();

    logger.info(`WhatsApp digest complete: ${result.jobCount} jobs, ${result.messagesSent} messages sent`);
}

/**
 * Start the WhatsApp scheduler with cron schedules
 */
export function startWhatsAppScheduler(): void {
    if (!validateWhatsAppConfig()) {
        logger.info('WhatsApp scheduler not started (disabled or not configured)');
        return;
    }

    // Get schedules from environment or use defaults
    const schedules = [
        process.env.WHATSAPP_SCHEDULE_MORNING || '0 9 * * *',   // 9 AM
        process.env.WHATSAPP_SCHEDULE_MIDDAY || '0 13 * * *',   // 1 PM
        process.env.WHATSAPP_SCHEDULE_AFTERNOON || '0 17 * * *', // 5 PM
        process.env.WHATSAPP_SCHEDULE_EVENING || '0 21 * * *',  // 9 PM
    ];

    // Only start if schedules are valid
    for (const schedule of schedules) {
        if (!cron.validate(schedule)) {
            logger.warn(`Invalid cron schedule: ${schedule}`);
            continue;
        }

        const task = cron.schedule(schedule, async () => {
            logger.info(`WhatsApp scheduled digest running (schedule: ${schedule})`);
            try {
                await sendDigest();
            } catch (error) {
                logger.error(`WhatsApp digest failed: ${error}`);
            }
        });

        scheduledTasks.push(task);
        logger.info(`WhatsApp digest scheduled: ${schedule}`);
    }

    logger.info(`WhatsApp scheduler started with ${scheduledTasks.length} schedules`);
}

/**
 * Stop all scheduled WhatsApp tasks
 */
export function stopWhatsAppScheduler(): void {
    for (const task of scheduledTasks) {
        task.stop();
    }
    scheduledTasks = [];
    logger.info('WhatsApp scheduler stopped');
}

/**
 * Get WhatsApp message history
 */
export async function getMessageHistory(limit: number = 20): Promise<Awaited<ReturnType<typeof prisma.whatsAppMessage.findMany>>> {
    return prisma.whatsAppMessage.findMany({
        orderBy: { sentAt: 'desc' },
        take: limit,
    });
}

/**
 * Get WhatsApp statistics
 */
export async function getWhatsAppStats(): Promise<{
    totalMessages: number;
    successfulMessages: number;
    failedMessages: number;
    totalJobsSent: number;
}> {
    const [total, successful, failed] = await Promise.all([
        prisma.whatsAppMessage.count(),
        prisma.whatsAppMessage.count({ where: { status: 'sent' } }),
        prisma.whatsAppMessage.count({ where: { status: 'failed' } }),
    ]);

    const jobsSent = await prisma.job.count({ where: { sentToWhatsApp: true } });

    return {
        totalMessages: total,
        successfulMessages: successful,
        failedMessages: failed,
        totalJobsSent: jobsSent,
    };
}
