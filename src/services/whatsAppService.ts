/**
 * WhatsApp Service
 * 
 * Handles sending job notifications via Twilio WhatsApp API.
 */

import twilio from 'twilio';
import { logger } from '../utils/logger.js';
import { prisma } from './database.js';
import { extractFirst50Words } from '../utils/extractSummary.js';
import type { Job } from '@prisma/client';

// Type for Twilio message instance
interface TwilioMessageInstance {
    sid: string;
    status: string;
    errorCode?: number;
    errorMessage?: string;
}

/**
 * WhatsApp configuration from environment
 */
interface WhatsAppConfig {
    accountSid: string;
    authToken: string;
    fromNumber: string;
    toNumber: string;
    enabled: boolean;
    maxJobsPerMessage: number;
}

/**
 * Get WhatsApp configuration from environment
 */
function getConfig(): WhatsAppConfig {
    return {
        accountSid: process.env.TWILIO_ACCOUNT_SID || '',
        authToken: process.env.TWILIO_AUTH_TOKEN || '',
        fromNumber: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
        toNumber: process.env.TWILIO_WHATSAPP_TO || '',
        enabled: process.env.ENABLE_WHATSAPP === 'true',
        maxJobsPerMessage: parseInt(process.env.MAX_JOBS_PER_MESSAGE || '10', 10),
    };
}

/**
 * Validate WhatsApp configuration
 */
export function validateWhatsAppConfig(): boolean {
    const config = getConfig();

    if (!config.enabled) {
        logger.info('WhatsApp notifications are disabled');
        return false;
    }

    if (!config.accountSid || !config.authToken) {
        logger.error('Twilio credentials not configured');
        return false;
    }

    if (!config.toNumber) {
        logger.error('WhatsApp recipient number not configured');
        return false;
    }

    return true;
}

/**
 * Get time-based greeting
 */
function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return '🌅 GOOD MORNING!';
    } else if (hour >= 12 && hour < 17) {
        return '☀️ GOOD AFTERNOON!';
    } else if (hour >= 17 && hour < 21) {
        return '🌆 GOOD EVENING!';
    } else {
        return '🌙 LATE NIGHT UPDATE!';
    }
}

/**
 * Format a single job for WhatsApp
 */
function formatJob(job: Job): string {
    // const emoji = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][index] || `${index + 1}.`;

    const locationEmoji = job.locationType === 'Remote' ? '🏠' : '📍';

    // Use shortSummary if available, otherwise extract and clean from description
    const summary = job.shortSummary || extractFirst50Words(job.description);
    const summarySection = summary ? `Short Summary:\n${summary}` : '';

    const postedDate = job.postedDate ? new Date(job.postedDate).toISOString().split('T')[0] : 'Recently';

    return `💼 *${job.company}*
📌 *${job.title}*
${locationEmoji} ${job.location}
🗓️ Posted: _${postedDate}_
🔗 Link: ${job.applyUrl || job.url}

${summarySection}`;
}

/**
 * Format jobs into a WhatsApp message
 */
export function formatDigestMessage(jobs: Job[], messageNumber?: number, totalMessages?: number): string {
    const greeting = getGreeting();
    const jobCount = jobs.length;

    let header = `${greeting} New IT Jobs\n\n`;
    header += `📊 *${jobCount} position${jobCount > 1 ? 's' : ''}* ready for you!\n`;

    if (messageNumber && totalMessages && totalMessages > 1) {
        header += `📄 Message ${messageNumber} of ${totalMessages}\n`;
    }

    header += '\n━━━━━━━━━━━━━━━━━━\n\n';

    const jobsFormatted = jobs.map((job) => formatJob(job)).join('\n\n━━━━━━━━━━━━━━━━━━\n\n');

    const footer = `\n\n━━━━━━━━━━━━━━━━━━\n\n✨ Good luck with your applications!\n🤖 Powered by Job Scraper`;

    return header + jobsFormatted + footer;
}

/**
 * WhatsApp Service class
 */
export class WhatsAppService {
    private client: twilio.Twilio;
    private config: WhatsAppConfig;

    constructor() {
        this.config = getConfig();
        this.client = twilio(this.config.accountSid, this.config.authToken);
    }

    /**
     * Send a WhatsApp message
     */
    async sendMessage(body: string): Promise<{ success: boolean; sid?: string; error?: string }> {
        if (!this.config.enabled) {
            logger.warn('WhatsApp is disabled, skipping message');
            return { success: false, error: 'WhatsApp disabled' };
        }

        try {
            logger.info('Sending WhatsApp message...');

            const message = await this.client.messages.create({
                from: this.config.fromNumber,
                to: this.config.toNumber,
                body: body,
            }) as TwilioMessageInstance;

            logger.info(`WhatsApp message sent successfully: ${message.sid}`);

            return { success: true, sid: message.sid };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Failed to send WhatsApp message: ${errorMessage}`);

            return { success: false, error: errorMessage };
        }
    }

    /**
     * Send a test message
     */
    async sendTestMessage(): Promise<boolean> {
        const testMessage = `🧪 *Test Message*\n\n✅ Job Scraper WhatsApp integration is working!\n\n📅 ${new Date().toLocaleString()}\n\n🤖 Your job notifications will appear here.`;

        const result = await this.sendMessage(testMessage);
        return result.success;
    }

    /**
     * Send job digest
     */
    async sendJobDigest(jobs: Job[]): Promise<{ sent: number; failed: number }> {
        if (jobs.length === 0) {
            logger.info('No jobs to send');
            return { sent: 0, failed: 0 };
        }

        const maxPerMessage = this.config.maxJobsPerMessage;
        const chunks: Job[][] = [];

        // Split jobs into chunks
        for (let i = 0; i < jobs.length; i += maxPerMessage) {
            chunks.push(jobs.slice(i, i + maxPerMessage));
        }

        let sent = 0;
        let failed = 0;

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const messageBody = formatDigestMessage(
                chunk,
                chunks.length > 1 ? i + 1 : undefined,
                chunks.length > 1 ? chunks.length : undefined
            );

            const result = await this.sendMessage(messageBody);

            // Track message in database
            const jobIds = chunk.map(j => j.id);

            await prisma.whatsAppMessage.create({
                data: {
                    messageType: 'digest',
                    jobCount: chunk.length,
                    jobIds: jobIds,
                    messageBody: messageBody,
                    twilioSid: result.sid,
                    status: result.success ? 'sent' : 'failed',
                    error: result.error,
                },
            });

            if (result.success) {
                sent++;

                // Mark jobs as sent
                await prisma.job.updateMany({
                    where: { id: { in: jobIds } },
                    data: {
                        sentToWhatsApp: true,
                        whatsAppSentAt: new Date(),
                    },
                });
            } else {
                failed++;
            }

            // Wait between messages to avoid rate limiting
            if (i < chunks.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        logger.info(`WhatsApp digest complete: ${sent} messages sent, ${failed} failed`);
        return { sent, failed };
    }
}

// Export singleton instance
export const whatsAppService = new WhatsAppService();

export default WhatsAppService;
