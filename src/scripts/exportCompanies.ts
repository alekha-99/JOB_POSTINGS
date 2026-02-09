
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import path from 'path';

const prisma = new PrismaClient();

async function exportCompanies() {
    try {
        console.log('Fetching companies...');
        const companies = await prisma.company.findMany({
            orderBy: [
                { source: 'asc' },
                { name: 'asc' }
            ]
        });

        console.log(`Found ${companies.length} companies.`);

        // Group by source
        const companiesBySource: Record<string, typeof companies> = {};

        companies.forEach(company => {
            const source = company.source;
            if (!companiesBySource[source]) {
                companiesBySource[source] = [];
            }
            companiesBySource[source].push(company);
        });

        // Create workbook
        const wb = XLSX.utils.book_new();

        // Create a sheet for each source
        for (const [source, sourceCompanies] of Object.entries(companiesBySource)) {
            console.log(`Processing ${source} (${sourceCompanies.length} companies)...`);

            // Map to flatten/clean data for Excel if needed
            const data = sourceCompanies.map(c => ({
                Name: c.name,
                Slug: c.slug,
                Source: c.source,
                'Careers URL': c.careersUrl,
                'API Endpoint': c.apiEndpoint || '',
                Priority: c.priority,
                Enabled: c.enabled,
                'Total Jobs Found': 0 // Placeholder or could fetch from job counts if we joined tables
            }));

            const ws = XLSX.utils.json_to_sheet(data);

            // Set column widths
            const wscols = [
                { wch: 30 }, // Name
                { wch: 20 }, // Slug
                { wch: 15 }, // Source
                { wch: 50 }, // Careers URL
                { wch: 50 }, // API Endpoint
                { wch: 10 }, // Priority
                { wch: 10 }, // Enabled
            ];
            ws['!cols'] = wscols;

            XLSX.utils.book_append_sheet(wb, ws, source);
        }

        // Also create a "Summary" sheet
        const summaryData = Object.entries(companiesBySource).map(([source, list]) => ({
            Source: source,
            Count: list.length
        }));
        const summaryWs = XLSX.utils.json_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summaryWs, "SUMMARY");

        const outputPath = path.resolve('companies_export.xlsx');
        XLSX.writeFile(wb, outputPath);

        console.log(`\n✅ Export completed successfully!`);
        console.log(`📁 File saved to: ${outputPath}`);

    } catch (error) {
        console.error('Error exporting companies:', error);
    } finally {
        await prisma.$disconnect();
    }
}

exportCompanies();
