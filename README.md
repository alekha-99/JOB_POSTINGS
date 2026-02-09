# Job Scraper System

Automated job scraping system for IT positions in the USA, supporting Greenhouse, Lever, and Workday ATS platforms.

## Features

- 🔄 **Automated Scraping**: Runs every 30 minutes via cron scheduler
- 🏢 **Multi-ATS Support**: Greenhouse (API), Lever (API), Workday (Playwright)
- 🎯 **IT Job Classification**: Filters for software engineering, DevOps, data science, etc.
- 🇺🇸 **USA Location Detection**: Filters for US-based positions only
- 📅 **Date Filtering**: Only saves jobs posted in the last 24 hours
- 🔍 **Deduplication**: Prevents duplicate job entries
- 📊 **Run Tracking**: Logs all scraper runs and statistics
- ⚡ **Parallel Processing**: Scrapes multiple companies concurrently

## Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Browser Automation**: Playwright
- **HTTP Client**: Axios
- **Scheduler**: node-cron
- **Logging**: Winston with daily rotation

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 15+ (or Neon PostgreSQL)
- pnpm, npm, or yarn

## Installation

```bash
# Clone the repository
cd FIND_JOB_POSTINGS

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Configuration

Create a `.env` file (or copy from `.env.example`):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jobdb"

# Scraping
SCRAPE_INTERVAL_CRON="*/30 * * * *"
MAX_CONCURRENT_SCRAPERS=5
REQUEST_DELAY_MS=2000
MAX_RETRY_ATTEMPTS=3

# Filtering
DAYS_LOOKBACK=1
USA_ONLY=true
IT_JOBS_ONLY=true

# Browser
HEADLESS=true
BROWSER_TIMEOUT_MS=30000

# Logging
LOG_LEVEL=info
LOG_DIR=./logs
```

## Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial companies
npm run db:seed
```

## Usage

### Start the Scheduler

```bash
# Development (with hot reload)
npm run dev

# Production
npm run build
npm start
```

### Manual Operations

```bash
# Test database connection
npm run test:connection

# Test utilities (classifier, location detector, date parser)
npm run test:utils

# Test single company scraper
npm run test:company -- netflix
npm run test:company -- stripe

# Trigger manual full scrape
npm run scrape:manual
```

## Project Structure

```
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed companies
├── src/
│   ├── index.ts          # Main entry point
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Utilities
│   │   ├── config.ts     # Environment config
│   │   ├── logger.ts     # Winston logger
│   │   ├── itClassifier.ts
│   │   ├── locationDetector.ts
│   │   └── dateParser.ts
│   ├── scrapers/         # ATS scrapers
│   │   ├── baseScraper.ts
│   │   ├── leverScraper.ts
│   │   ├── greenhouseScraper.ts
│   │   ├── workdayScraper.ts
│   │   └── scraperFactory.ts
│   ├── services/         # Business logic
│   │   ├── jobProcessor.ts
│   │   ├── orchestrator.ts
│   │   └── scheduler.ts
│   └── scripts/          # CLI scripts
├── sql/
│   └── queries.sql       # Useful SQL queries
├── logs/                 # Log files (auto-created)
└── package.json
```

## Supported Companies

| Company   | ATS Type   | API/Scrape Method |
|-----------|------------|-------------------|
| Netflix   | Lever      | REST API          |
| Spotify   | Lever      | REST API          |
| Figma     | Lever      | REST API          |
| Stripe    | Greenhouse | REST API          |
| Coinbase  | Greenhouse | REST API          |
| DoorDash  | Greenhouse | REST API          |
| Robinhood | Greenhouse | REST API          |
| Reddit    | Greenhouse | REST API          |
| Amazon    | Workday    | Playwright        |
| Target    | Workday    | Playwright        |

## Adding New Companies

1. Add the company to the seed file or database:

```typescript
await prisma.company.create({
  data: {
    name: 'New Company',
    slug: 'new-company',
    source: 'GREENHOUSE', // or LEVER, WORKDAY
    careersUrl: 'https://company.com/careers',
    apiEndpoint: 'https://api.greenhouse.io/v1/boards/new-company/jobs',
    enabled: true,
    priority: 1,
  },
});
```

2. For Workday companies, you may need to add custom selectors in `workdayScraper.ts`.

## Viewing Results

### Using Prisma Studio

```bash
npm run db:studio
```

### SQL Queries

See `sql/queries.sql` for common queries:

- View today's IT jobs in USA
- Job count by company
- Scraper run statistics
- Export jobs to CSV

## Logs

Logs are stored in the `logs/` directory:

- `combined.log` - All log levels
- `error.log` - Errors only
- `scraper-YYYY-MM-DD.log` - Daily rotation

## Troubleshooting

### Database Connection Failed

1. Check `DATABASE_URL` in `.env`
2. Ensure PostgreSQL is running
3. Run `npm run test:connection`

### Scraper Returning 0 Jobs

1. Check if the company's careers page structure changed
2. Run `npm run test:company -- <slug>` for detailed output
3. Check logs in `logs/error.log`

### Rate Limiting (429 Errors)

The scrapers automatically wait and retry on rate limits. If persistent:
- Increase `REQUEST_DELAY_MS` in `.env`
- Reduce `MAX_CONCURRENT_SCRAPERS`

## License

MIT
