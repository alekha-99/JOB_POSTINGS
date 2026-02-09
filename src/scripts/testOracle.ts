

import { PrismaClient, JobSource } from '@prisma/client';
import { OracleScraper } from '../scrapers/oracleScraper.js';
import { CompanyConfig } from '../types/index.js';

const prisma = new PrismaClient();

async function testOracle() {
    console.log('🧪 Testing Oracle Scraper for Verisk...');

    const scraper = new OracleScraper();

    // Config for Verisk
    const config: CompanyConfig = {
        id: 'test-id',
        name: 'Verisk',
        slug: 'verisk',
        source: JobSource.ORACLE,
        careersUrl: 'https://fa-ewmy-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/requisitions',
        apiEndpoint: 'https://fa-ewmy-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions',
        enabled: true,
        priority: 1
    };

    try {
        const jobs = await scraper.scrape(config);

        console.log(`\n✅ Scrape complete! Found ${jobs.length} jobs.`);

        if (jobs.length > 0) {
            console.log('\n🔍 First 3 jobs found:');
            jobs.slice(0, 3).forEach(job => {
                console.log('------------------------------------------------');
                console.log(`📌 Title: ${job.title}`);
                console.log(`🏢 Company: ${job.company}`);
                console.log(`📍 Location: ${job.location}`);
                console.log(`🔗 URL: ${job.url}`);
                console.log(`📅 Posted: ${job.postedDate}`);
            });
        } else {
            console.log('⚠️ No jobs found. The API might be protected or require different parameters.');
        }

    } catch (error: any) {
        console.error('❌ Scrape failed:', error.message || error);
    } finally {
        await prisma.$disconnect();
    }
}

testOracle();
