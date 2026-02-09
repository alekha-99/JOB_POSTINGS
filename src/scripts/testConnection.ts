/**
 * Test Database Connection
 * 
 * Verifies that the database connection is working properly.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔌 Testing database connection...\n');

    try {
        // Test connection
        await prisma.$connect();
        console.log('✅ Database connected successfully!\n');

        // Get database info
        const companyCount = await prisma.company.count();
        const jobCount = await prisma.job.count();
        const runCount = await prisma.scraperRun.count();

        console.log('📊 Database Statistics:');
        console.log(`   Companies: ${companyCount}`);
        console.log(`   Jobs: ${jobCount}`);
        console.log(`   Scraper Runs: ${runCount}`);

        // List companies
        if (companyCount > 0) {
            console.log('\n📋 Companies in database:');
            const companies = await prisma.company.findMany({
                orderBy: { name: 'asc' },
            });
            for (const company of companies) {
                const status = company.enabled ? '🟢' : '🔴';
                console.log(`   ${status} ${company.name} (${company.source})`);
            }
        } else {
            console.log('\n⚠️  No companies found. Run: npm run db:seed');
        }

        // Show recent scraper runs
        if (runCount > 0) {
            console.log('\n🕐 Recent Scraper Runs:');
            const runs = await prisma.scraperRun.findMany({
                orderBy: { startedAt: 'desc' },
                take: 5,
            });
            for (const run of runs) {
                const status = run.status === 'SUCCESS' ? '✅' : run.status === 'FAILED' ? '❌' : '🔄';
                console.log(`   ${status} ${run.companySlug}: ${run.jobsFound} found, ${run.jobsSaved} saved`);
            }
        }

        console.log('\n✅ Connection test passed!');
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
