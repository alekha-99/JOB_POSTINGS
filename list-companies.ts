import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listCompanies() {
    console.log('\n🏢 ENABLED COMPANIES IN DATABASE:\n');

    const companies = await prisma.company.findMany({
        where: { enabled: true },
        orderBy: { priority: 'desc' },
        select: {
            name: true,
            slug: true,
            source: true,
            priority: true,
            lastScrapedAt: true,
        }
    });

    companies.forEach((c, i) => {
        const lastScraped = c.lastScrapedAt ? c.lastScrapedAt.toISOString().split('T')[0] : 'Never';
        console.log(`${(i + 1).toString().padStart(2)}. ${c.name.padEnd(25)} | ${c.source.padEnd(10)} | Priority: ${c.priority} | Last: ${lastScraped}`);
    });

    console.log(`\nTotal: ${companies.length} enabled companies`);

    // Get last WhatsApp message
    const lastMsg = await prisma.whatsAppMessage.findFirst({
        orderBy: { sentAt: 'desc' }
    });

    if (lastMsg) {
        console.log('\n📱 LAST WHATSAPP MESSAGE:');
        console.log(`   Sent: ${lastMsg.sentAt.toISOString()}`);
        console.log(`   Status: ${lastMsg.status}`);
        console.log(`   Jobs: ${lastMsg.jobCount}`);
        console.log(`   Type: ${lastMsg.messageType}`);
        console.log(`   Twilio SID: ${lastMsg.twilioSid || 'N/A'}`);
    }
}

listCompanies()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
