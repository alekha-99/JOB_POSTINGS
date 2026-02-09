/**
 * Project Health Check Script
 * 
 * Verifies database, companies, cron job, and WhatsApp configuration.
 */

import { PrismaClient } from '@prisma/client';
import config from './src/utils/config.js';

const prisma = new PrismaClient();

async function runHealthCheck() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║           🔍 Job Scraper Health Check                      ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    // 1. Database Connection
    console.log('📊 DATABASE STATUS:');
    console.log('───────────────────────────────────────');
    try {
        const totalJobs = await prisma.job.count();
        const totalCompanies = await prisma.company.count();
        const enabledCompanies = await prisma.company.count({ where: { enabled: true } });
        console.log(`   ✅ Connection: SUCCESS`);
        console.log(`   📋 Total Jobs: ${totalJobs}`);
        console.log(`   🏢 Total Companies: ${totalCompanies} (${enabledCompanies} enabled)`);
    } catch (error) {
        console.log(`   ❌ Connection: FAILED - ${error}`);
    }

    // 2. List All Companies
    console.log('\n🏢 COMPANIES IN DATABASE:');
    console.log('───────────────────────────────────────');
    const companies = await prisma.company.findMany({
        orderBy: [{ enabled: 'desc' }, { priority: 'desc' }],
    });

    console.log(`   ID | Name | Source | Enabled | Priority | Last Scraped`);
    console.log('   ───────────────────────────────────────────────────────');
    companies.forEach((c, i) => {
        const status = c.enabled ? '✅' : '❌';
        const lastScraped = c.lastScrapedAt ? c.lastScrapedAt.toISOString().split('T')[0] : 'Never';
        console.log(`   ${(i + 1).toString().padStart(2, '0')} | ${c.name.padEnd(20)} | ${c.source.padEnd(10)} | ${status} | ${c.priority} | ${lastScraped}`);
    });

    // 3. Jobs by Source
    console.log('\n📈 JOBS BY SOURCE:');
    console.log('───────────────────────────────────────');
    const bySource = await prisma.job.groupBy({
        by: ['source'],
        _count: true
    });
    bySource.forEach(s => {
        console.log(`   ${s.source.padEnd(12)}: ${s._count} jobs`);
    });

    // 4. Recent Jobs
    console.log('\n📋 RECENT JOBS (Last 5):');
    console.log('───────────────────────────────────────');
    const recentJobs = await prisma.job.findMany({
        take: 5,
        orderBy: { scrapedAt: 'desc' },
    });
    recentJobs.forEach((job, i) => {
        console.log(`   ${i + 1}. [${job.company}] ${job.title.substring(0, 40)}...`);
        console.log(`      Scraped: ${job.scrapedAt.toISOString()}`);
    });

    // 5. Cron Configuration
    console.log('\n⏰ CRON CONFIGURATION:');
    console.log('───────────────────────────────────────');
    console.log(`   Scrape Schedule: ${config.scrapeIntervalCron}`);
    console.log(`   Max Concurrent Scrapers: ${config.maxConcurrentScrapers}`);
    console.log(`   Days Lookback: ${config.daysLookback}`);
    console.log(`   IT Jobs Only: ${config.itJobsOnly}`);
    console.log(`   USA Only: ${config.usaOnly}`);

    // 6. WhatsApp Configuration
    console.log('\n📱 WHATSAPP CONFIGURATION:');
    console.log('───────────────────────────────────────');
    const whatsappEnabled = process.env.ENABLE_WHATSAPP === 'true';
    const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM || 'Not configured';
    const whatsappTo = process.env.TWILIO_WHATSAPP_TO || 'Not configured';
    const twilioConfigured = !!process.env.TWILIO_ACCOUNT_SID && !!process.env.TWILIO_AUTH_TOKEN;

    console.log(`   WhatsApp Enabled: ${whatsappEnabled ? '✅ YES' : '❌ NO'}`);
    console.log(`   Twilio Configured: ${twilioConfigured ? '✅ YES' : '❌ NO'}`);
    console.log(`   From Number: ${whatsappFrom}`);
    console.log(`   To Number: ${whatsappTo}`);
    console.log(`   Schedule: ${process.env.WHATSAPP_SCHEDULE_MORNING || 'Not set'}`);

    // 7. Recent WhatsApp Messages
    console.log('\n📨 RECENT WHATSAPP MESSAGES:');
    console.log('───────────────────────────────────────');
    const recentMessages = await prisma.whatsAppMessage.findMany({
        take: 5,
        orderBy: { sentAt: 'desc' },
    });
    if (recentMessages.length === 0) {
        console.log('   No messages sent yet.');
    } else {
        recentMessages.forEach((msg, i) => {
            console.log(`   ${i + 1}. ${msg.messageType} | ${msg.jobCount} jobs | ${msg.status} | ${msg.sentAt.toISOString()}`);
        });
    }

    // 8. Scraper Run Statistics
    console.log('\n🔄 RECENT SCRAPER RUNS:');
    console.log('───────────────────────────────────────');
    const recentRuns = await prisma.scraperRun.findMany({
        take: 10,
        orderBy: { startedAt: 'desc' },
    });
    if (recentRuns.length === 0) {
        console.log('   No scraper runs recorded.');
    } else {
        recentRuns.forEach((run, i) => {
            const status = run.status === 'SUCCESS' ? '✅' : run.status === 'PARTIAL' ? '⚠️' : '❌';
            console.log(`   ${status} ${run.companySlug.padEnd(15)} | ${run.source.padEnd(10)} | ${run.jobsFound} found | ${run.jobsSaved} saved | ${run.startedAt.toISOString().split('T')[1].substring(0, 8)}`);
        });
    }

    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║           ✅ Health Check Complete                         ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
}

runHealthCheck()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
