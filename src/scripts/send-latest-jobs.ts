
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { prisma } from '../services/database.js';
import { wahaService } from '../services/wahaService.js';

async function main() {
    console.log('🔍 Fetching latest 10 jobs from DB...');
    try {
        const jobs = await prisma.job.findMany({
            take: 10,
            orderBy: { postedDate: 'desc' }
        });

        if (jobs.length === 0) {
            console.log('⚠️ No jobs found in database. Try running the scraper first.');
            return;
        }

        console.log(`✅ Found ${jobs.length} jobs.`);
        console.log('📤 Sending via WAHA...');

        // This will send jobs to the configured WhatsApp group
        const result = await wahaService.sendJobDigest(jobs);

        console.log(`🏁 Done! Sent: ${result.sent}, Failed: ${result.failed}`);
    } catch (e) {
        console.error('❌ Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
