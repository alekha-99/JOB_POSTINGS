/**
 * Test Single Company Scraper
 * 
 * Manually triggers a scrape for a single company.
 * Usage: npm run test:company -- <company-slug>
 */

import { PrismaClient } from '@prisma/client';
import { scrapeOneCompany } from '../services/orchestrator.js';

const prisma = new PrismaClient();

async function main() {
    const slug = process.argv[2];

    if (!slug) {
        console.log(`
Usage: npm run test:company -- <company-slug>

Available companies:
    `);

        const companies = await prisma.company.findMany({
            orderBy: { name: 'asc' },
        });

        for (const company of companies) {
            const status = company.enabled ? '🟢' : '🔴';
            console.log(`  ${status} ${company.slug.padEnd(15)} - ${company.name} (${company.source})`);
        }

        await prisma.$disconnect();
        process.exit(0);
    }

    console.log(`\n🚀 Testing scraper for: ${slug}\n`);

    try {
        const result = await scrapeOneCompany(slug);

        console.log('\n📊 Results:');
        console.log(`   Status: ${result.status}`);
        console.log(`   Jobs Found: ${result.jobsFound}`);
        console.log(`   Jobs Saved: ${result.jobsSaved}`);

        if (result.error) {
            console.log(`   Error: ${result.error}`);
        }

        const duration = result.completedAt && result.startedAt
            ? (result.completedAt.getTime() - result.startedAt.getTime()) / 1000
            : 0;
        console.log(`   Duration: ${duration.toFixed(1)}s`);

        // Show some sample jobs
        if (result.jobs.length > 0) {
            console.log('\n📋 Sample Jobs:');
            for (const job of result.jobs.slice(0, 5)) {
                console.log(`   • ${job.title}`);
                console.log(`     📍 ${job.location}`);
                console.log(`     🔗 ${job.url.slice(0, 60)}...`);
                console.log('');
            }
        }

        console.log('✅ Test completed!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
