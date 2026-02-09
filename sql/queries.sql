-- ============================================================================
-- Job Scraper SQL Queries
-- ============================================================================

-- View all jobs from today
-- ----------------------------------------------------------------------------
SELECT 
    j.id,
    j.title,
    j.company,
    j.location,
    j."locationType",
    j.source,
    j."isITJob",
    j."isUSA",
    j.category,
    j."postedDate",
    j."scrapedAt",
    j.url
FROM "Job" j
WHERE j."scrapedAt" >= CURRENT_DATE
ORDER BY j."scrapedAt" DESC;

-- View IT jobs in USA from today
-- ----------------------------------------------------------------------------
SELECT 
    j.title,
    j.company,
    j.location,
    j.category,
    j."postedDate",
    j.url
FROM "Job" j
WHERE j."isITJob" = true 
  AND j."isUSA" = true
  AND j."scrapedAt" >= CURRENT_DATE
ORDER BY j."postedDate" DESC NULLS LAST;

-- Job count by company
-- ----------------------------------------------------------------------------
SELECT 
    j.company,
    j."companySlug",
    COUNT(*) as job_count,
    SUM(CASE WHEN j."isITJob" = true THEN 1 ELSE 0 END) as it_jobs,
    SUM(CASE WHEN j."isUSA" = true THEN 1 ELSE 0 END) as usa_jobs
FROM "Job" j
GROUP BY j.company, j."companySlug"
ORDER BY job_count DESC;

-- Job count by source (ATS type)
-- ----------------------------------------------------------------------------
SELECT 
    j.source,
    COUNT(*) as total_jobs,
    SUM(CASE WHEN j."isITJob" = true THEN 1 ELSE 0 END) as it_jobs,
    SUM(CASE WHEN j."isUSA" = true THEN 1 ELSE 0 END) as usa_jobs
FROM "Job" j
GROUP BY j.source
ORDER BY total_jobs DESC;

-- Job count by category
-- ----------------------------------------------------------------------------
SELECT 
    COALESCE(j.category, 'Uncategorized') as category,
    COUNT(*) as job_count
FROM "Job" j
WHERE j."isITJob" = true
GROUP BY j.category
ORDER BY job_count DESC;

-- Scraper run statistics
-- ----------------------------------------------------------------------------
SELECT 
    sr."companySlug",
    sr.source,
    sr.status,
    sr."jobsFound",
    sr."jobsSaved",
    sr."startedAt",
    sr."completedAt",
    EXTRACT(EPOCH FROM (sr."completedAt" - sr."startedAt")) as duration_seconds,
    sr.error
FROM "ScraperRun" sr
ORDER BY sr."startedAt" DESC
LIMIT 50;

-- Scraper success rate by company
-- ----------------------------------------------------------------------------
SELECT 
    sr."companySlug",
    COUNT(*) as total_runs,
    SUM(CASE WHEN sr.status = 'SUCCESS' THEN 1 ELSE 0 END) as successful,
    SUM(CASE WHEN sr.status = 'FAILED' THEN 1 ELSE 0 END) as failed,
    ROUND(
        100.0 * SUM(CASE WHEN sr.status = 'SUCCESS' THEN 1 ELSE 0 END) / COUNT(*),
        2
    ) as success_rate
FROM "ScraperRun" sr
GROUP BY sr."companySlug"
ORDER BY success_rate ASC;

-- Average jobs per run by company
-- ----------------------------------------------------------------------------
SELECT 
    sr."companySlug",
    COUNT(*) as total_runs,
    ROUND(AVG(sr."jobsFound"), 1) as avg_jobs_found,
    ROUND(AVG(sr."jobsSaved"), 1) as avg_jobs_saved,
    MAX(sr."jobsSaved") as max_jobs_saved
FROM "ScraperRun" sr
WHERE sr.status = 'SUCCESS'
GROUP BY sr."companySlug"
ORDER BY avg_jobs_saved DESC;

-- Jobs posted in last 24 hours
-- ----------------------------------------------------------------------------
SELECT 
    j.title,
    j.company,
    j.location,
    j.source,
    j."postedDate",
    j.url
FROM "Job" j
WHERE j."postedDate" >= NOW() - INTERVAL '24 hours'
    AND j."isITJob" = true
    AND j."isUSA" = true
ORDER BY j."postedDate" DESC;

-- Export jobs to CSV format
-- ----------------------------------------------------------------------------
SELECT 
    j.title,
    j.company,
    j.location,
    j."locationType",
    j.category,
    j.source,
    j."postedDate",
    j.url,
    j."applyUrl"
FROM "Job" j
WHERE j."isITJob" = true 
    AND j."isUSA" = true
    AND j."scrapedAt" >= CURRENT_DATE
ORDER BY j.company, j.title;

-- Find duplicate jobs (for debugging)
-- ----------------------------------------------------------------------------
SELECT 
    j."sourceJobId",
    COUNT(*) as count
FROM "Job" j
GROUP BY j."sourceJobId"
HAVING COUNT(*) > 1;

-- Recent errors
-- ----------------------------------------------------------------------------
SELECT 
    sr."companySlug",
    sr.source,
    sr."startedAt",
    sr.error
FROM "ScraperRun" sr
WHERE sr.status = 'FAILED'
ORDER BY sr."startedAt" DESC
LIMIT 20;

-- Companies not scraped in last hour
-- ----------------------------------------------------------------------------
SELECT 
    c.name,
    c.slug,
    c.source,
    c."lastScrapedAt",
    NOW() - c."lastScrapedAt" as time_since_last_scrape
FROM "Company" c
WHERE c.enabled = true
    AND (c."lastScrapedAt" IS NULL OR c."lastScrapedAt" < NOW() - INTERVAL '1 hour')
ORDER BY c."lastScrapedAt" ASC NULLS FIRST;

-- Daily job statistics
-- ----------------------------------------------------------------------------
SELECT 
    DATE(j."scrapedAt") as date,
    COUNT(*) as total_scraped,
    SUM(CASE WHEN j."isITJob" = true THEN 1 ELSE 0 END) as it_jobs,
    SUM(CASE WHEN j."isUSA" = true THEN 1 ELSE 0 END) as usa_jobs,
    SUM(CASE WHEN j."isITJob" = true AND j."isUSA" = true THEN 1 ELSE 0 END) as it_usa_jobs
FROM "Job" j
GROUP BY DATE(j."scrapedAt")
ORDER BY date DESC
LIMIT 30;

-- ============================================================================
-- SHORT SUMMARY QUERIES (50-word extracts)
-- ============================================================================

-- View jobs with short summaries for quick scanning
-- ----------------------------------------------------------------------------
SELECT 
    j.title,
    j.company,
    j.location,
    j."shortSummary"
FROM "Job" j
WHERE j."isITJob" = true 
    AND j."isUSA" = true
    AND j."scrapedAt" >= CURRENT_DATE
ORDER BY j."scrapedAt" DESC
LIMIT 20;

-- View job with both full and short descriptions
-- ----------------------------------------------------------------------------
SELECT 
    j.title,
    j.company,
    j."shortSummary",         -- 50-word summary
    j.description            -- Full description
FROM "Job" j
WHERE j."scrapedAt" >= CURRENT_DATE
LIMIT 10;

-- Quick job preview (title, company, summary)
-- ----------------------------------------------------------------------------
SELECT 
    j.title AS "Job Title",
    j.company AS "Company",
    j.location AS "Location",
    j."shortSummary" AS "Summary (50 words)"
FROM "Job" j
WHERE j."isITJob" = true 
    AND j."isUSA" = true
    AND j."scrapedAt" >= CURRENT_DATE
ORDER BY j.company, j.title;

-- Export with short summaries to CSV
-- ----------------------------------------------------------------------------
SELECT 
    j.title,
    j.company,
    j.location,
    j."locationType",
    j.category,
    j."shortSummary",
    j.url
FROM "Job" j
WHERE j."isITJob" = true 
    AND j."isUSA" = true
    AND j."scrapedAt" >= CURRENT_DATE
ORDER BY j.company, j.title;

-- ============================================================================
-- CLEANUP QUERIES (USE WITH CAUTION)
-- ============================================================================

-- Clean up old jobs (older than 30 days)
-- WARNING: This will DELETE data!
-- ----------------------------------------------------------------------------
-- DELETE FROM "Job" WHERE "scrapedAt" < NOW() - INTERVAL '30 days';

-- Clean up old scraper runs (older than 30 days)
-- WARNING: This will DELETE data!
-- ----------------------------------------------------------------------------
-- DELETE FROM "ScraperRun" WHERE "startedAt" < NOW() - INTERVAL '30 days';
