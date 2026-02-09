import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const totalJobs = await prisma.job.count();
    console.log('📊 Total jobs in database:', totalJobs);

    const recentJobs = await prisma.job.findMany({
        take: 10,
        orderBy: { scrapedAt: 'desc' },
    });

    console.log('\n📋 Most recent jobs:');
    recentJobs.forEach((job, i) => {
        console.log(`  ${i + 1}. [${job.company}] ${job.title}`);
        console.log(`      Location: ${job.location} | Scraped: ${job.scrapedAt.toISOString()}`);
    });

    // Count by source
    const bySource = await prisma.job.groupBy({
        by: ['source'],
        _count: true
    });

    console.log('\n📈 Jobs by source:');
    bySource.forEach(s => {
        console.log(`  - ${s.source}: ${s._count} jobs`);
    });

    // IT jobs only
    const itJobs = await prisma.job.count({ where: { isITJob: true } });
    const usaJobs = await prisma.job.count({ where: { isUSA: true } });

    console.log('\n🎯 Filtered counts:');
    console.log(`  - IT Jobs: ${itJobs}`);
    console.log(`  - USA Jobs: ${usaJobs}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
