import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkWhatsAppMessages() {
    console.log('\n📱 WHATSAPP MESSAGE ANALYSIS\n');
    console.log('═'.repeat(60));

    // Get all messages with their status
    const messages = await prisma.whatsAppMessage.findMany({
        orderBy: { sentAt: 'desc' },
        take: 20,
    });

    console.log(`\nTotal messages in DB: ${messages.length}\n`);

    // Count by status
    const statusCounts: Record<string, number> = {};
    messages.forEach(m => {
        statusCounts[m.status] = (statusCounts[m.status] || 0) + 1;
    });

    console.log('📊 Messages by Status:');
    console.log('───────────────────────────────────────');
    Object.entries(statusCounts).forEach(([status, count]) => {
        const emoji = status === 'sent' ? '✅' : status === 'failed' ? '❌' : '⏳';
        console.log(`   ${emoji} ${status}: ${count}`);
    });

    console.log('\n📋 Recent Messages (last 10):');
    console.log('───────────────────────────────────────');
    messages.slice(0, 10).forEach((m, i) => {
        const statusEmoji = m.status === 'sent' ? '✅' : m.status === 'failed' ? '❌' : '⏳';
        console.log(`\n${i + 1}. ${statusEmoji} ${m.messageType} | ${m.jobCount} jobs | ${m.status}`);
        console.log(`   Sent: ${m.sentAt.toISOString()}`);
        console.log(`   Twilio SID: ${m.twilioSid || 'N/A'}`);
        if (m.error) {
            console.log(`   ❌ ERROR: ${m.error}`);
        }
    });

    // Check environment config
    console.log('\n\n🔧 WHATSAPP CONFIGURATION:');
    console.log('───────────────────────────────────────');
    console.log(`   ENABLE_WHATSAPP: ${process.env.ENABLE_WHATSAPP}`);
    console.log(`   TWILIO_ACCOUNT_SID: ${process.env.TWILIO_ACCOUNT_SID ? process.env.TWILIO_ACCOUNT_SID.substring(0, 10) + '...' : 'NOT SET'}`);
    console.log(`   TWILIO_AUTH_TOKEN: ${process.env.TWILIO_AUTH_TOKEN ? '***SET***' : 'NOT SET'}`);
    console.log(`   FROM: ${process.env.TWILIO_WHATSAPP_FROM}`);
    console.log(`   TO: ${process.env.TWILIO_WHATSAPP_TO}`);

    console.log('\n\n⚠️  IMPORTANT TWILIO SANDBOX REMINDER:');
    console.log('───────────────────────────────────────');
    console.log('   If using Twilio Sandbox, you must:');
    console.log('   1. Send "join <your-sandbox-code>" to +1 415 523 8886');
    console.log('   2. The sandbox expires after 72 hours of inactivity');
    console.log('   3. Re-join by sending the code again\n');
}

checkWhatsAppMessages()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
