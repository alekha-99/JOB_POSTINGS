
import { chromium } from 'playwright';
import { logger } from '../utils/logger.js';

export class SmartFinderService {

    /**
     * Searches the web for the company's ATS-backed career page.
     * @param companyName Name of the company (e.g. "Spotify")
     * @returns The discovered URL or null
     */
    async findAtsUrl(companyName: string): Promise<string | null> {
        logger.info(`[SmartFinder] 🔍 Searching for "${companyName}" careers...`);

        // Launch headful to avoid bot detection and allow user visibility
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();

        try {
            // Bing Search
            const query = `${companyName} careers (site:myworkdayjobs.com OR site:boards.greenhouse.io OR site:jobs.lever.co OR site:icims.com OR site:oraclecloud.com)`;
            const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;

            console.log(`[SmartFinder] Visiting: ${searchUrl}`);
            await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

            // Wait for results
            await page.waitForSelector('li.b_algo', { timeout: 10000 }).catch(() => null);

            // Extract links from Bing results
            const links = await page.evaluate(() => {
                const anchors = Array.from(document.querySelectorAll('li.b_algo a')) as HTMLAnchorElement[];
                return anchors.map(a => a.href);
            });

            // Filter for known ATS domains
            const validUrl = links.find(url => {
                return url.includes('myworkdayjobs.com') ||
                    url.includes('boards.greenhouse.io') ||
                    url.includes('jobs.lever.co') ||
                    url.includes('icims.com') ||
                    url.includes('oraclecloud.com');
            });

            if (validUrl) {
                logger.info(`[SmartFinder] ✅ Found: ${validUrl}`);
                return validUrl;
            }

            // Fallback: Try generic "careers" search
            logger.info('[SmartFinder] Strict search empty, trying generic search...');
            await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(companyName + ' careers')}`);
            await page.waitForTimeout(2000);

            const fallbackLinks = await page.evaluate(() => {
                const anchors = Array.from(document.querySelectorAll('li.b_algo a')) as HTMLAnchorElement[];
                return anchors.map(a => a.href);
            });

            const fallbackValid = fallbackLinks.find(url => {
                return url.includes('myworkdayjobs.com') ||
                    url.includes('boards.greenhouse.io') ||
                    url.includes('jobs.lever.co') ||
                    url.includes('icims.com') ||
                    url.includes('oraclecloud.com');
            });

            if (fallbackValid) {
                logger.info(`[SmartFinder] ✅ Found (Fallback): ${fallbackValid}`);
                return fallbackValid;
            }

            logger.warn(`[SmartFinder] ❌ Could not find a known ATS link for ${companyName}`);
            return null;

        } catch (error) {
            logger.error(`[SmartFinder] Search failed: ${error}`);
            return null;
        } finally {
            await browser.close();
        }
    }
}
