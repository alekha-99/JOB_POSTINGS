/**
 * Workday Scraper
 * 
 * Scrapes job postings from Workday ATS using Playwright for browser automation.
 * Workday is heavily JavaScript-based and requires full browser rendering.
 */

import { chromium, Browser, Page } from 'playwright';
import { JobSource } from '@prisma/client';
import { BaseScraper } from './baseScraper.js';
import { ScrapedJob, CompanyConfig } from '../types/index.js';
import config from '../utils/config.js';
import { parseJobDate } from '../utils/dateParser.js';
// Note: Workday list view doesn't provide descriptions, so shortSummary is set to empty string

export class WorkdayScraper extends BaseScraper {
    private browser: Browser | null = null;

    constructor() {
        super(JobSource.WORKDAY);
    }

    /**
     * Scrape jobs from Workday using Playwright
     */
    async scrape(company: CompanyConfig): Promise<ScrapedJob[]> {
        this.logger.info(`Starting Workday scrape for ${company.name}`);

        const jobs: ScrapedJob[] = [];

        try {
            // Launch browser
            this.browser = await chromium.launch({
                headless: config.headless,
            });

            const context = await this.browser.newContext({
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                viewport: { width: 1920, height: 1080 },
            });

            const page = await context.newPage();
            page.setDefaultTimeout(config.browserTimeoutMs);

            // Navigate to careers page
            this.logger.debug(`Navigating to ${company.careersUrl}`);
            await page.goto(company.careersUrl, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });

            // Wait for page to fully load
            await this.delay(5000);

            // Try to scrape based on company-specific selectors
            if (company.slug === 'amazon') {
                const amazonJobs = await this.scrapeAmazon(page, company);
                jobs.push(...amazonJobs);
            } else if (company.slug === 'target') {
                const targetJobs = await this.scrapeGenericWorkday(page, company);
                jobs.push(...targetJobs);
            } else {
                // Generic Workday scraping
                const genericJobs = await this.scrapeGenericWorkday(page, company);
                jobs.push(...genericJobs);
            }

            await context.close();
        } catch (error) {
            this.logger.error(`Workday scrape failed for ${company.name}: ${error}`);
            throw error;
        } finally {
            if (this.browser) {
                await this.browser.close();
                this.browser = null;
            }
        }

        this.logger.info(`Completed Workday scrape for ${company.name}: ${jobs.length} jobs found`);
        return jobs;
    }

    /**
     * Scrape Amazon Jobs (custom site)
     */
    private async scrapeAmazon(page: Page, company: CompanyConfig): Promise<ScrapedJob[]> {
        const jobs: ScrapedJob[] = [];

        try {
            // Wait for job cards to load
            await page.waitForSelector('.job-tile', { timeout: 30000 }).catch(() => {
                this.logger.warn('Amazon job-tile selector not found, trying alternative');
            });

            // Scroll to load more jobs
            await this.scrollToLoadAll(page, '.job-tile');

            // Extract job cards
            const jobCards = await page.$$('.job-tile');
            this.logger.debug(`Found ${jobCards.length} Amazon job cards`);

            for (const card of jobCards.slice(0, 50)) { // Limit to first 50
                try {
                    const title = await card.$eval('.job-tile-title', el => el.textContent?.trim() || '').catch(() => '');
                    const location = await card.$eval('.location-icon + span, .job-tile-location', el => el.textContent?.trim() || '').catch(() => 'Not specified');
                    const link = await card.$eval('a', el => el.getAttribute('href') || '').catch(() => '');
                    const postedText = await card.$eval('.posted-date, .job-posted-date', el => el.textContent?.trim() || '').catch(() => '');

                    if (!title || !link) continue;

                    const fullUrl = link.startsWith('http') ? link : `https://www.amazon.jobs${link}`;
                    const externalId = link.split('/').pop() || link;

                    const parsedDate = parseJobDate(postedText);

                    jobs.push({
                        externalId,
                        title,
                        company: company.name,
                        companySlug: company.slug,
                        location,
                        locationType: location.toLowerCase().includes('remote') ? 'Remote' : 'Onsite',
                        description: '', // Would need to click into job for full description
                        shortSummary: '', // No description available from list view
                        url: fullUrl,
                        applyUrl: fullUrl,
                        source: JobSource.WORKDAY,
                        postedDate: parsedDate.date || undefined,
                        rawData: { title, location, postedText },
                    });
                } catch (err) {
                    this.logger.debug(`Failed to extract Amazon job card: ${err}`);
                }
            }
        } catch (error) {
            this.logger.warn(`Amazon-specific scraping failed: ${error}`);
        }

        return jobs;
    }

    /**
     * Generic Workday scraping for other companies
     */
    private async scrapeGenericWorkday(page: Page, company: CompanyConfig): Promise<ScrapedJob[]> {
        const jobs: ScrapedJob[] = [];

        try {
            // Common Workday selectors
            const selectors = [
                '[data-automation-id="jobTitle"]',
                '.css-19uc56f',  // Workday job list item
                '.job-link',
                '.job-title',
                'a[href*="/job/"]',
                '.jobProperty.job-title',
            ];

            let foundJobs = false;

            for (const selector of selectors) {
                try {
                    await page.waitForSelector(selector, { timeout: 10000 });

                    const jobElements = await page.$$(selector);
                    if (jobElements.length > 0) {
                        this.logger.debug(`Found ${jobElements.length} jobs with selector: ${selector}`);
                        foundJobs = true;

                        for (const element of jobElements.slice(0, 50)) {
                            try {
                                const title = await element.textContent() || '';
                                const link = await element.getAttribute('href') || '';

                                // Try to get location from parent or sibling elements
                                const parent = await element.$('xpath=..');
                                const location = parent
                                    ? await parent.$eval('[data-automation-id="location"], .location, .job-location',
                                        el => el.textContent?.trim() || 'Not specified').catch(() => 'Not specified')
                                    : 'Not specified';

                                if (!title.trim()) continue;

                                const fullUrl = link.startsWith('http')
                                    ? link
                                    : `${new URL(company.careersUrl).origin}${link}`;
                                const externalId = link.split('/').pop() || Date.now().toString();

                                jobs.push({
                                    externalId,
                                    title: title.trim(),
                                    company: company.name,
                                    companySlug: company.slug,
                                    location,
                                    locationType: location.toLowerCase().includes('remote') ? 'Remote' : 'Onsite',
                                    description: '',
                                    shortSummary: '', // No description from list view
                                    url: fullUrl,
                                    applyUrl: fullUrl,
                                    source: JobSource.WORKDAY,
                                    rawData: { title, link, location },
                                });
                            } catch (err) {
                                this.logger.debug(`Failed to extract job element: ${err}`);
                            }
                        }
                        break;
                    }
                } catch {
                    // Selector not found, try next
                }
            }

            if (!foundJobs) {
                this.logger.warn(`No jobs found for ${company.name} with any known selector`);
            }
        } catch (error) {
            this.logger.warn(`Generic Workday scraping failed: ${error}`);
        }

        return jobs;
    }

    /**
     * Scroll down the page to trigger lazy loading
     */
    private async scrollToLoadAll(page: Page, itemSelector: string): Promise<void> {
        let previousHeight = 0;
        let scrollAttempts = 0;
        const maxScrollAttempts = 10;

        while (scrollAttempts < maxScrollAttempts) {
            const currentHeight = await page.evaluate(() => document.body.scrollHeight);

            if (currentHeight === previousHeight) {
                break;
            }

            previousHeight = currentHeight;
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.delay(2000);
            scrollAttempts++;

            const itemCount = await page.$$(itemSelector).then(items => items.length);
            this.logger.debug(`Scroll attempt ${scrollAttempts}: ${itemCount} items loaded`);
        }
    }
}

export default WorkdayScraper;
