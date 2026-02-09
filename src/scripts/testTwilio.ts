/**
 * Test Twilio WhatsApp Connection
 * 
 * Sends a test message to verify Twilio WhatsApp is configured correctly.
 */

import 'dotenv/config';
import { whatsAppService, validateWhatsAppConfig } from '../services/whatsAppService.js';
import { prisma } from '../services/database.js';

async function testTwilio() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║        🧪 Testing Twilio WhatsApp Connection              ║
╚═══════════════════════════════════════════════════════════╝
`);

    // Check configuration
    console.log('📋 Checking configuration...');

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM;
    const toNumber = process.env.TWILIO_WHATSAPP_TO;
    const enabled = process.env.ENABLE_WHATSAPP;

    console.log(`   TWILIO_ACCOUNT_SID: ${accountSid ? '✅ Set (' + accountSid.substring(0, 8) + '...)' : '❌ Missing'}`);
    console.log(`   TWILIO_AUTH_TOKEN: ${authToken ? '✅ Set (hidden)' : '❌ Missing'}`);
    console.log(`   TWILIO_WHATSAPP_FROM: ${fromNumber || '❌ Missing'}`);
    console.log(`   TWILIO_WHATSAPP_TO: ${toNumber || '❌ Missing'}`);
    console.log(`   ENABLE_WHATSAPP: ${enabled || 'false'}`);

    if (!validateWhatsAppConfig()) {
        console.log('\n❌ WhatsApp configuration is invalid or disabled.');
        console.log('\nTo enable WhatsApp, add these to your .env file:');
        console.log(`
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+1YOURNUMBER
ENABLE_WHATSAPP=true
`);
        await prisma.$disconnect();
        process.exit(1);
    }

    console.log('\n📤 Sending test message...');

    const success = await whatsAppService.sendTestMessage();

    if (success) {
        console.log('\n✅ Test message sent successfully!');
        console.log('📱 Check your WhatsApp for the message.');
    } else {
        console.log('\n❌ Failed to send test message.');
        console.log('   Check the error logs above for details.');
    }

    await prisma.$disconnect();
}

testTwilio().catch(console.error);
