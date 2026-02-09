/**
 * Job Scraper System - Main Entry Point
 * 
 * Starts the scheduler for automated job scraping.
 */

import { PrismaClient } from '@prisma/client';
import { startScheduler, runOrchestration, startWhatsAppScheduler, stopWhatsAppScheduler } from './services/index.js';
import { logger, validateConfig } from './utils/index.js';
import { validateWhatsAppConfig } from './services/whatsAppService.js';
import config from './utils/config.js';

const prisma = new PrismaClient();

async function main() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║           🚀 Job Scraper System v1.0.0                    ║
╠═══════════════════════════════════════════════════════════╣
║  Automated IT job scraping from Greenhouse, Lever,        ║
║  and Workday ATS platforms.                              ║
╚═══════════════════════════════════════════════════════════╝
  `);

    try {
        // Validate configuration
        validateConfig();
        logger.info('✅ Configuration validated');

        // Test database connection
        await prisma.$connect();
        logger.info('✅ Database connected');

        // Get company count
        const companyCount = await prisma.company.count({ where: { enabled: true } });
        logger.info(`📊 Found ${companyCount} enabled companies`);

        if (companyCount === 0) {
            logger.warn('⚠️  No companies found. Run: npm run db:seed');
        }

        // Log configuration
        logger.info('📋 Configuration:');
        logger.info(`   Schedule: ${config.scrapeIntervalCron}`);
        logger.info(`   Max concurrent scrapers: ${config.maxConcurrentScrapers}`);
        logger.info(`   IT jobs only: ${config.itJobsOnly}`);
        logger.info(`   USA only: ${config.usaOnly}`);
        logger.info(`   Days lookback: ${config.daysLookback}`);
        logger.info(`   Headless browser: ${config.headless}`);

        // Check WhatsApp configuration
        if (validateWhatsAppConfig()) {
            logger.info('📱 WhatsApp notifications: ENABLED');
        } else {
            logger.info('📱 WhatsApp notifications: DISABLED');
        }

        // Run initial scrape
        logger.info('🔄 Running initial scrape cycle...');
        await runOrchestration();

        // Start the scheduler
        startScheduler();
        logger.info('⏰ Scraper scheduler started');

        // Start WhatsApp scheduler
        startWhatsAppScheduler();
        logger.info('⏰ WhatsApp scheduler started. Press Ctrl+C to stop.');

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            logger.info('🛑 Shutting down...');
            stopWhatsAppScheduler();
            await prisma.$disconnect();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            logger.info('🛑 Shutting down...');
            stopWhatsAppScheduler();
            await prisma.$disconnect();
            process.exit(0);
        });
    } catch (error) {
        logger.error(`❌ Failed to start: ${error}`);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
