/**
 * WAHA WhatsApp Service
 * 
 * Handles sending job notifications via WAHA (WhatsApp HTTP API) to groups.
 * WAHA is a free, self-hosted alternative to Twilio that supports group messaging.
 * 
 * Setup:
 * 1. Run: docker-compose up waha
 * 2. Open: http://localhost:3001
 * 3. Start a session and scan QR code
 * 4. Get group ID from the dashboard
 * 5. Set WAHA_GROUP_ID in .env
 */

import { logger } from '../utils/logger.js';
import { prisma } from './database.js';
import { extractFirst50Words } from '../utils/extractSummary.js';
import type { Job } from '@prisma/client';

// WAHA API Response types
interface WahaSession {
    name: string;
    status: string;
    me?: {
        id: string;
        pushName: string;
    };
}

interface WahaSendResult {
    id: string;
    timestamp: number;
    fromMe: boolean;
}

interface WahaGroup {
    id: string;
    name: string;
    participants: Array<{ id: string }>;
}

/**
 * WAHA configuration from environment
 */
interface WahaConfig {
    apiUrl: string;
    sessionName: string;
    apiKey: string;
    groupId: string;
    enabled: boolean;
    maxJobsPerMessage: number;
}

/**
 * Get WAHA configuration from environment
 */
function getConfig(): WahaConfig {
    return {
        apiUrl: process.env.WAHA_API_URL || 'http://localhost:3002',
        sessionName: process.env.WAHA_SESSION_NAME || 'job-scraper',
        apiKey: process.env.WAHA_API_KEY || '',
        groupId: process.env.WAHA_GROUP_ID || '',
        enabled: process.env.WHATSAPP_PROVIDER === 'waha',
        maxJobsPerMessage: parseInt(process.env.MAX_JOBS_PER_MESSAGE || '5', 10),
    };
}

/**
 * Validate WAHA configuration
 */
export function validateWahaConfig(): boolean {
    const config = getConfig();

    if (!config.enabled) {
        logger.debug('WAHA is not enabled (WHATSAPP_PROVIDER != waha)');
        return false;
    }

    if (!config.groupId) {
        logger.error('WAHA_GROUP_ID not configured');
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
    const locationEmoji = job.locationType === 'Remote' ? '🏠' : '📍';
    const summary = job.shortSummary || extractFirst50Words(job.description);
    const summarySection = summary ? `\n📝 ${summary}` : '';
    const postedDate = job.postedDate ? new Date(job.postedDate).toISOString().split('T')[0] : 'Recently';

    return `💼 *${job.company}*
📌 *${job.title}*
${locationEmoji} ${job.location}
🗓️ Posted: _${postedDate}_
🔗 ${job.applyUrl || job.url}${summarySection}`;
}

/**
 * Format jobs into a WhatsApp message for groups
 */
export function formatGroupMessage(jobs: Job[], messageNumber?: number, totalMessages?: number): string {
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
 * WAHA WhatsApp Service class
 */
export class WahaService {
    private config: WahaConfig;

    constructor() {
        this.config = getConfig();
    }

    /**
     * Make an API request to WAHA
     */
    private async apiRequest<T>(
        endpoint: string,
        method: 'GET' | 'POST' | 'DELETE' = 'GET',
        body?: Record<string, unknown>
    ): Promise<T> {
        const url = `${this.config.apiUrl}/api${endpoint}`;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.config.apiKey) {
            headers['X-Api-Key'] = this.config.apiKey;
        }

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`WAHA API error: ${response.status} - ${errorText}`);
        }

        return response.json() as Promise<T>;
    }

    /**
     * Check if WAHA session is ready
     */
    async isSessionReady(): Promise<boolean> {
        try {
            const sessions = await this.apiRequest<WahaSession[]>('/sessions');
            const session = sessions.find(s => s.name === this.config.sessionName);

            if (!session) {
                logger.warn(`WAHA session '${this.config.sessionName}' not found`);
                return false;
            }

            const isReady = session.status === 'WORKING';
            if (!isReady) {
                logger.warn(`WAHA session status: ${session.status}`);
            }
            return isReady;
        } catch (error) {
            logger.error(`WAHA session check failed: ${error}`);
            return false;
        }
    }

    /**
     * Start a new WAHA session
     */
    async startSession(): Promise<{ success: boolean; qrCode?: string }> {
        try {
            await this.apiRequest(`/sessions/${this.config.sessionName}/start`, 'POST');
            logger.info(`WAHA session '${this.config.sessionName}' started`);
            return { success: true };
        } catch (error) {
            logger.error(`Failed to start WAHA session: ${error}`);
            return { success: false };
        }
    }

    /**
     * Get list of groups
     */
    async getGroups(): Promise<WahaGroup[]> {
        try {
            return await this.apiRequest<WahaGroup[]>(
                `/${this.config.sessionName}/groups`
            );
        } catch (error) {
            logger.error(`Failed to get groups: ${error}`);
            return [];
        }
    }

    /**
     * Send a message to a group or contact
     */
    async sendMessage(
        chatId: string,
        body: string
    ): Promise<{ success: boolean; messageId?: string; error?: string }> {
        if (!this.config.enabled) {
            logger.warn('WAHA is disabled, skipping message');
            return { success: false, error: 'WAHA disabled' };
        }

        try {
            // Check session first
            const isReady = await this.isSessionReady();
            if (!isReady) {
                return { success: false, error: 'WAHA session not ready' };
            }

            logger.info(`Sending WAHA message to ${chatId}...`);

            const result = await this.apiRequest<WahaSendResult>(
                '/sendText',
                'POST',
                {
                    chatId,
                    text: body,
                    session: this.config.sessionName
                }
            );

            logger.info(`WAHA message sent: ${result.id}`);
            return { success: true, messageId: result.id };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Failed to send WAHA message: ${errorMessage}`);
            return { success: false, error: errorMessage };
        }
    }

    /**
     * Send a test message to the configured group
     */
    async sendTestMessage(): Promise<boolean> {
        const testMessage = `🧪 *Test Message*\n\n✅ Job Scraper WAHA integration is working!\n\n📅 ${new Date().toLocaleString()}\n\n🤖 Your job notifications will appear here.`;

        const result = await this.sendMessage(this.config.groupId, testMessage);
        return result.success;
    }

    /**
     * Send job digest to the configured group
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
            const messageBody = formatGroupMessage(
                chunk,
                chunks.length > 1 ? i + 1 : undefined,
                chunks.length > 1 ? chunks.length : undefined
            );

            const result = await this.sendMessage(this.config.groupId, messageBody);

            try {
                // Track message in database
                const jobIds = chunk.map(j => j.id);

                await prisma.whatsAppMessage.create({
                    data: {
                        messageType: 'waha_group',
                        jobCount: chunk.length,
                        jobIds: jobIds,
                        messageBody: messageBody,
                        twilioSid: result.messageId || null,
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
            } catch (dbError) {
                logger.error(`Failed to log WhatsApp message to DB: ${dbError}`);
                // Still count as sent if the message went through
                if (result.success) sent++;
                else failed++;
            }

            // Wait between messages to avoid rate limiting
            if (i < chunks.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        logger.info(`WAHA group digest complete: ${sent} messages sent, ${failed} failed`);
        return { sent, failed };
    }

    /**
     * Get dashboard URL for session setup
     */
    getDashboardUrl(): string {
        return this.config.apiUrl;
    }
}

// Export singleton instance
export const wahaService = new WahaService();

export default WahaService;
