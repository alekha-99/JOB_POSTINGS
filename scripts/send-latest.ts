
import dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../src/services/database.js';
import { wahaService } from '../src/services/wahaService.js';

async function main() {
    console.log('🔍 Fetching latest 5 jobs from DB...');
    try {
        const jobs = await prisma.job.findMany({
            take: 5,
            orderBy: { postedDate: 'desc' }
        });

        if (jobs.length === 0) {
            console.log('⚠️ No jobs found in database.');
            return;
        }

        console.log(`✅ Found ${jobs.length} jobs.`);
        console.log('📤 Sending via WAHA...');

        // Use waha_group message type
        // Check wahaService.sendJobDigest implementation
        const result = await wahaService.sendJobDigest(jobs);

        console.log(`🏁 Done! Sent: ${result.sent}, Failed: ${result.failed}`);
    } catch (e) {
        console.error('❌ Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
