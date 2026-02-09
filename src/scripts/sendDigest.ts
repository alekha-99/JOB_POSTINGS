/**
 * Send Digest Manually
 * 
 * Manually trigger a WhatsApp digest to send unsent jobs.
 */

import 'dotenv/config';
import { sendDigest, getUnsentJobs, getWhatsAppStats } from '../services/whatsAppScheduler.js';
import { validateWhatsAppConfig } from '../services/whatsAppService.js';
import { prisma } from '../services/database.js';

async function manualDigest() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║        📤 Manual WhatsApp Digest                          ║
╚═══════════════════════════════════════════════════════════╝
`);

    if (!validateWhatsAppConfig()) {
        console.log('❌ WhatsApp is not configured or disabled.');
        console.log('   Run: npm run test:twilio for configuration help.');
        await prisma.$disconnect();
        process.exit(1);
    }

    // Show current stats
    console.log('📊 Current Statistics:');
    const stats = await getWhatsAppStats();
    console.log(`   Total messages sent: ${stats.totalMessages}`);
    console.log(`   Successful: ${stats.successfulMessages}`);
    console.log(`   Failed: ${stats.failedMessages}`);
    console.log(`   Total jobs sent: ${stats.totalJobsSent}`);

    // Check for unsent jobs
    console.log('\n🔍 Checking for unsent jobs...');
    const unsentJobs = await getUnsentJobs(50);
    console.log(`   Found ${unsentJobs.length} unsent IT/USA jobs`);

    if (unsentJobs.length === 0) {
        console.log('\n📭 No unsent jobs to send.');
        console.log('   Jobs are marked as sent after being delivered to WhatsApp.');
        await prisma.$disconnect();
        return;
    }

    // Show preview of jobs
    console.log('\n📋 Jobs to send:');
    for (const job of unsentJobs.slice(0, 5)) {
        console.log(`   • ${job.title} at ${job.company}`);
    }
    if (unsentJobs.length > 5) {
        console.log(`   ... and ${unsentJobs.length - 5} more`);
    }

    // Send digest
    console.log('\n📤 Sending digest...');
    const result = await sendDigest();

    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                    📊 DIGEST RESULTS                       ║
╠═══════════════════════════════════════════════════════════╣
║   Jobs included: ${result.jobCount.toString().padEnd(39)}  ║
║   Messages sent: ${result.messagesSent.toString().padEnd(39)}  ║
║   Messages failed: ${result.messagesFailed.toString().padEnd(37)}  ║
╚═══════════════════════════════════════════════════════════╝
`);

    if (result.messagesSent > 0) {
        console.log('✅ Digest sent! Check your WhatsApp.');
    } else if (result.messagesFailed > 0) {
        console.log('❌ Failed to send digest. Check logs for errors.');
    }

    await prisma.$disconnect();
}

manualDigest().catch(console.error);
