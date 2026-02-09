/**
 * Manual Scrape Trigger
 * 
 * Manually triggers a full scraping cycle.
 */

import { PrismaClient } from '@prisma/client';
import { runOrchestration } from '../services/orchestrator.js';
import { getJobStats } from '../services/jobProcessor.js';

const prisma = new PrismaClient();

async function main() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║           🔧 Manual Scrape Trigger                        ║
╚═══════════════════════════════════════════════════════════╝
  `);

    try {
        // Get initial stats
        const beforeStats = await getJobStats();
        console.log('📊 Before scrape:');
        console.log(`   Total jobs: ${beforeStats.totalJobs}`);
        console.log(`   IT jobs: ${beforeStats.itJobs}`);
        console.log(`   USA jobs: ${beforeStats.usaJobs}`);
        console.log(`   Today's jobs: ${beforeStats.todayJobs}`);

        console.log('\n🚀 Starting full scrape cycle...\n');

        // Run orchestration
        const result = await runOrchestration();

        // Get after stats
        const afterStats = await getJobStats();

        console.log('\n📊 After scrape:');
        console.log(`   Total jobs: ${afterStats.totalJobs} (+${afterStats.totalJobs - beforeStats.totalJobs})`);
        console.log(`   IT jobs: ${afterStats.itJobs}`);
        console.log(`   USA jobs: ${afterStats.usaJobs}`);
        console.log(`   Today's jobs: ${afterStats.todayJobs}`);

        console.log('\n📋 Scrape Summary:');
        console.log(`   Duration: ${(result.duration / 1000).toFixed(1)}s`);
        console.log(`   Companies scraped: ${result.successful}/${result.totalCompanies}`);
        console.log(`   Jobs found: ${result.totalJobsFound}`);
        console.log(`   Jobs saved: ${result.totalJobsSaved}`);

        if (result.failed > 0) {
            console.log(`   ⚠️  Failed: ${result.failed} company(ies)`);
        }

        console.log('\n✅ Manual scrape completed!');
    } catch (error) {
        console.error('❌ Scrape failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
