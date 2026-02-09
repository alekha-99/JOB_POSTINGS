import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

async function check() {
    const messages = await p.whatsAppMessage.findMany({
        orderBy: { sentAt: 'desc' },
        take: 10,
        select: { sentAt: true, status: true, jobCount: true, error: true, twilioSid: true }
    });

    console.log('\n📱 RECENT WHATSAPP MESSAGES:\n');
    console.log('Status | Jobs | Date | Error');
    console.log('─'.repeat(70));

    messages.forEach((x, i) => {
        const emoji = x.status === 'sent' ? '✅' : '❌';
        const date = x.sentAt.toISOString().replace('T', ' ').substring(0, 19);
        console.log(`${emoji} ${x.status.padEnd(8)} | ${x.jobCount.toString().padEnd(4)} | ${date} | ${x.twilioSid || 'N/A'}`);
        if (x.error) {
            console.log(`   └─ ERROR: ${x.error}`);
        }
    });

    // Count statuses
    const sent = messages.filter(m => m.status === 'sent').length;
    const failed = messages.filter(m => m.status === 'failed').length;

    console.log('\n📊 Summary: ' + sent + ' sent, ' + failed + ' failed\n');

    if (failed > 0) {
        console.log('⚠️  TROUBLESHOOTING TIPS:');
        console.log('─'.repeat(50));
        console.log('1. Twilio Sandbox expires after 72 hours');
        console.log('2. Re-join sandbox: Send "join <code>" to +1 415 523 8886');
        console.log('3. Check your Twilio console: https://console.twilio.com');
    }
}

check().finally(() => p.$disconnect());
