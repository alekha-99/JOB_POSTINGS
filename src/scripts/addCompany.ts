
import { PrismaClient } from '@prisma/client';
import { DiscoveryService } from '../services/discoveryService.js';
import { SmartFinderService } from '../services/smartFinderService.js';

const prisma = new PrismaClient();
const discovery = new DiscoveryService();
const smartFinder = new SmartFinderService();

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.error('Usage: npm run add:company <Name> [URL]');
        process.exit(1);
    }

    const name = args[0];
    let url = args[1];

    if (!url) {
        // Smart-Add Mode
        console.log(`\n🧠 Semantic Search Mode: Looking for ${name} careers...`);
        try {
            const foundUrl = await smartFinder.findAtsUrl(name);
            if (foundUrl) {
                url = foundUrl;
                console.log(`🎯 Found ATS Link: ${url}`);
            } else {
                console.error(`❌ Could not automatically find an ATS link for ${name}.`);
                console.error('Please provide the URL manually: npm run add:company <Name> <URL>');
                await prisma.$disconnect();
                process.exit(1);
            }
        } catch (e: any) {
            console.error(`❌ Search failed: ${e.message}`);
            await prisma.$disconnect();
            process.exit(1);
        }
    }

    console.log(`\n🔍 Analyzing ${name} (${url})...`);

    try {
        const config = await discovery.discover(url);

        if (!config) {
            console.error('❌ Could not auto-detect ATS type from the URL.');
            console.error('Supported: Greenhouse, Lever, Workday, iCIMS, Oracle.');
            process.exit(1);
        }

        console.log(`✅ Detected: ${config.source}`);

        // Create slug
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

        // Check if exists
        const existing = await prisma.company.findUnique({ where: { slug } });
        if (existing) {
            console.log(`⚠️ Company '${slug}' already exists.`);
            await prisma.$disconnect();
            return;
        }

        // Add to DB
        const company = await prisma.company.create({
            data: {
                id: crypto.randomUUID(),
                name,
                slug,
                careersUrl: config.careersUrl,
                apiEndpoint: config.apiEndpoint,
                source: config.source,
                enabled: true,
            }
        });

        console.log(`🎉 Added ${company.name} to database!`);
        console.log(`🆔 ID: ${company.id}`);
        console.log(`🌍 Source: ${company.source}`);

    } catch (error) {
        console.error('❌ Failed to add company:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
