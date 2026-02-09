
import { getScraper } from './src/scrapers/scraperFactory';
import { JobSource } from '@prisma/client';

async function testScrape() {
    console.log('🧪 Testing Stripe scraper...');

    // Stripe usually uses a custom or Greenhouse setup, but in our seed it might be listed as Greenhouse or similar.
    // Let's test a known one from the seed. 
    // In the seed, Stripe (slug: stripe) might be skipped.
    // Let's use a company we know was added: "linear" (Lever).

    const company = {
        id: 'test-id-stripe',
        name: 'Stripe',
        slug: 'stripe',
        source: 'GREENHOUSE' as JobSource,
        originalSource: 'GREENHOUSE',
        careersUrl: 'https://stripe.com/jobs',
        apiEndpoint: 'https://boards-api.greenhouse.io/v1/boards/stripe/jobs', // Correct Greenhouse API endpoint
        logoUrl: null,
        description: null,
        website: 'https://stripe.com',
        linkedinUrl: null,
        twitterHandle: null,
        enabled: true,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    try {
        const scraper = getScraper(company.source);
        console.log(`📡 Fetching jobs for ${company.name} from ${company.apiEndpoint}...`);
        const jobs = await scraper.scrape(company);
        console.log(`✅ Found ${jobs.length} jobs`);
        if (jobs.length > 0) {
            console.log('Sample job:', JSON.stringify(jobs[0], null, 2));
        }
    } catch (error) {
        console.error('❌ Scrape failed:', error);
    }
}

testScrape();
