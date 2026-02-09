import { PrismaClient, JobSource } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Comprehensive list of 100+ major US tech companies
 * Grouped by ATS type for easy maintenance
 */
const companies = [
    // ============================================================================
    // GREENHOUSE COMPANIES (API: https://api.greenhouse.io/v1/boards/{slug}/jobs)
    // ============================================================================
    { name: 'Stripe', slug: 'stripe', source: JobSource.GREENHOUSE, careersUrl: 'https://stripe.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/stripe/jobs', enabled: true, priority: 1 },
    { name: 'Coinbase', slug: 'coinbase', source: JobSource.GREENHOUSE, careersUrl: 'https://www.coinbase.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/coinbase/jobs', enabled: true, priority: 1 },
    { name: 'DoorDash', slug: 'doordash', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.doordash.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/doordash/jobs', enabled: true, priority: 1 },
    { name: 'Robinhood', slug: 'robinhood', source: JobSource.GREENHOUSE, careersUrl: 'https://robinhood.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/robinhood/jobs', enabled: true, priority: 1 },
    { name: 'Reddit', slug: 'reddit', source: JobSource.GREENHOUSE, careersUrl: 'https://www.redditinc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/reddit/jobs', enabled: true, priority: 1 },
    { name: 'Airbnb', slug: 'airbnb', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.airbnb.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/airbnb/jobs', enabled: true, priority: 1 },
    { name: 'Twitch', slug: 'twitch', source: JobSource.GREENHOUSE, careersUrl: 'https://www.twitch.tv/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/twitch/jobs', enabled: true, priority: 1 },
    { name: 'Discord', slug: 'discord', source: JobSource.GREENHOUSE, careersUrl: 'https://discord.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/discord/jobs', enabled: true, priority: 1 },
    { name: 'Dropbox', slug: 'dropbox', source: JobSource.GREENHOUSE, careersUrl: 'https://www.dropbox.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dropbox/jobs', enabled: true, priority: 1 },
    { name: 'Square', slug: 'square', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.squareup.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/square/jobs', enabled: true, priority: 1 },
    { name: 'Lyft', slug: 'lyft', source: JobSource.GREENHOUSE, careersUrl: 'https://www.lyft.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lyft/jobs', enabled: true, priority: 1 },
    { name: 'Instacart', slug: 'instacart', source: JobSource.GREENHOUSE, careersUrl: 'https://instacart.careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/instacart/jobs', enabled: true, priority: 1 },
    { name: 'Pinterest', slug: 'pinterest', source: JobSource.GREENHOUSE, careersUrl: 'https://www.pinterestcareers.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pinterest/jobs', enabled: true, priority: 1 },
    { name: 'Notion', slug: 'notion', source: JobSource.GREENHOUSE, careersUrl: 'https://www.notion.so/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/notion/jobs', enabled: true, priority: 1 },
    { name: 'Asana', slug: 'asana', source: JobSource.GREENHOUSE, careersUrl: 'https://asana.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/asana/jobs', enabled: true, priority: 1 },
    { name: 'Datadog', slug: 'datadog', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.datadoghq.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/datadog/jobs', enabled: true, priority: 1 },
    { name: 'Cloudflare', slug: 'cloudflare', source: JobSource.GREENHOUSE, careersUrl: 'https://www.cloudflare.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cloudflare/jobs', enabled: true, priority: 1 },
    { name: 'HashiCorp', slug: 'hashicorp', source: JobSource.GREENHOUSE, careersUrl: 'https://www.hashicorp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hashicorp/jobs', enabled: true, priority: 1 },
    { name: 'GitLab', slug: 'gitlab', source: JobSource.GREENHOUSE, careersUrl: 'https://about.gitlab.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gitlab/jobs', enabled: true, priority: 1 },
    { name: 'Plaid', slug: 'plaid', source: JobSource.GREENHOUSE, careersUrl: 'https://plaid.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/plaid/jobs', enabled: true, priority: 1 },
    { name: 'Gusto', slug: 'gusto', source: JobSource.GREENHOUSE, careersUrl: 'https://gusto.com/about/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gusto/jobs', enabled: true, priority: 1 },
    { name: 'Databricks', slug: 'databricks', source: JobSource.GREENHOUSE, careersUrl: 'https://www.databricks.com/company/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/databricks/jobs', enabled: true, priority: 1 },
    { name: 'Ramp', slug: 'ramp', source: JobSource.GREENHOUSE, careersUrl: 'https://ramp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ramp/jobs', enabled: true, priority: 1 },
    { name: 'Snap', slug: 'snap', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.snap.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snap/jobs', enabled: true, priority: 1 },
    { name: 'MongoDB', slug: 'mongodb', source: JobSource.GREENHOUSE, careersUrl: 'https://www.mongodb.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mongodb/jobs', enabled: true, priority: 1 },
    { name: 'Scale AI', slug: 'scale-ai', source: JobSource.GREENHOUSE, careersUrl: 'https://scale.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/scaleai/jobs', enabled: true, priority: 1 },
    { name: 'Grammarly', slug: 'grammarly', source: JobSource.GREENHOUSE, careersUrl: 'https://www.grammarly.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/grammarly/jobs', enabled: true, priority: 1 },
    { name: 'Canva', slug: 'canva', source: JobSource.GREENHOUSE, careersUrl: 'https://www.canva.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/canva/jobs', enabled: true, priority: 1 },
    { name: 'Brex', slug: 'brex', source: JobSource.GREENHOUSE, careersUrl: 'https://www.brex.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/brex/jobs', enabled: true, priority: 1 },
    { name: 'Airtable', slug: 'airtable', source: JobSource.GREENHOUSE, careersUrl: 'https://airtable.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/airtable/jobs', enabled: true, priority: 1 },
    { name: 'Amplitude', slug: 'amplitude', source: JobSource.GREENHOUSE, careersUrl: 'https://amplitude.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/amplitude/jobs', enabled: true, priority: 1 },
    { name: 'Segment', slug: 'segment', source: JobSource.GREENHOUSE, careersUrl: 'https://segment.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/segment/jobs', enabled: true, priority: 1 },
    { name: 'Samsara', slug: 'samsara', source: JobSource.GREENHOUSE, careersUrl: 'https://www.samsara.com/company/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/samsara/jobs', enabled: true, priority: 1 },
    { name: 'Okta', slug: 'okta', source: JobSource.GREENHOUSE, careersUrl: 'https://www.okta.com/company/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/okta/jobs', enabled: true, priority: 1 },
    { name: 'Twilio', slug: 'twilio', source: JobSource.GREENHOUSE, careersUrl: 'https://www.twilio.com/company/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/twilio/jobs', enabled: true, priority: 1 },
    { name: 'Atlassian', slug: 'atlassian', source: JobSource.GREENHOUSE, careersUrl: 'https://www.atlassian.com/company/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/atlassian/jobs', enabled: true, priority: 1 },
    { name: 'Zoom', slug: 'zoom', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.zoom.us', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zoom/jobs', enabled: true, priority: 1 },
    { name: 'Shopify', slug: 'shopify', source: JobSource.GREENHOUSE, careersUrl: 'https://www.shopify.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/shopify/jobs', enabled: true, priority: 1 },
    { name: 'Duolingo', slug: 'duolingo', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.duolingo.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/duolingo/jobs', enabled: true, priority: 1 },
    { name: 'Flexport', slug: 'flexport', source: JobSource.GREENHOUSE, careersUrl: 'https://www.flexport.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/flexport/jobs', enabled: true, priority: 1 },
    { name: 'Affirm', slug: 'affirm', source: JobSource.GREENHOUSE, careersUrl: 'https://www.affirm.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/affirm/jobs', enabled: true, priority: 1 },
    { name: 'SoFi', slug: 'sofi', source: JobSource.GREENHOUSE, careersUrl: 'https://www.sofi.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sofi/jobs', enabled: true, priority: 1 },
    { name: 'Chime', slug: 'chime', source: JobSource.GREENHOUSE, careersUrl: 'https://www.chime.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/chime/jobs', enabled: true, priority: 1 },
    { name: 'Toast', slug: 'toast', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.toasttab.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/toast/jobs', enabled: true, priority: 1 },
    { name: 'Webflow', slug: 'webflow', source: JobSource.GREENHOUSE, careersUrl: 'https://webflow.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/webflow/jobs', enabled: true, priority: 1 },
    { name: 'Zapier', slug: 'zapier', source: JobSource.GREENHOUSE, careersUrl: 'https://zapier.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zapier/jobs', enabled: true, priority: 1 },
    { name: 'Confluent', slug: 'confluent', source: JobSource.GREENHOUSE, careersUrl: 'https://www.confluent.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/confluent/jobs', enabled: true, priority: 1 },
    { name: 'Snowflake', slug: 'snowflake', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.snowflake.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snowflakecomputing/jobs', enabled: true, priority: 1 },
    { name: 'CrowdStrike', slug: 'crowdstrike', source: JobSource.GREENHOUSE, careersUrl: 'https://www.crowdstrike.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/crowdstrike/jobs', enabled: true, priority: 1 },
    { name: 'Elastic', slug: 'elastic', source: JobSource.GREENHOUSE, careersUrl: 'https://www.elastic.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/elastic/jobs', enabled: true, priority: 1 },

    // ============================================================================
    // LEVER COMPANIES (API: https://api.lever.co/v0/postings/{slug}?mode=json)
    // ============================================================================
    { name: 'Netflix', slug: 'netflix', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/netflix', apiEndpoint: 'https://api.lever.co/v0/postings/netflix?mode=json', enabled: true, priority: 1 },
    { name: 'Spotify', slug: 'spotify', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/spotify', apiEndpoint: 'https://api.lever.co/v0/postings/spotify?mode=json', enabled: true, priority: 1 },
    { name: 'Figma', slug: 'figma', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/figma', apiEndpoint: 'https://api.lever.co/v0/postings/figma?mode=json', enabled: true, priority: 1 },
    { name: 'Postman', slug: 'postman', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/postman', apiEndpoint: 'https://api.lever.co/v0/postings/postman?mode=json', enabled: true, priority: 1 },
    { name: 'Rippling', slug: 'rippling', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/rippling', apiEndpoint: 'https://api.lever.co/v0/postings/rippling?mode=json', enabled: true, priority: 1 },
    { name: 'Linear', slug: 'linear', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/linear', apiEndpoint: 'https://api.lever.co/v0/postings/linear?mode=json', enabled: true, priority: 1 },
    { name: 'Vercel', slug: 'vercel', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/vercel', apiEndpoint: 'https://api.lever.co/v0/postings/vercel?mode=json', enabled: true, priority: 1 },
    { name: 'OpenAI', slug: 'openai', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/openai', apiEndpoint: 'https://api.lever.co/v0/postings/openai?mode=json', enabled: true, priority: 1 },
    { name: 'Anthropic', slug: 'anthropic', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/anthropic', apiEndpoint: 'https://api.lever.co/v0/postings/anthropic?mode=json', enabled: true, priority: 1 },
    { name: 'Retool', slug: 'retool', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/retool', apiEndpoint: 'https://api.lever.co/v0/postings/retool?mode=json', enabled: true, priority: 1 },
    { name: 'Supabase', slug: 'supabase', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/supabase', apiEndpoint: 'https://api.lever.co/v0/postings/supabase?mode=json', enabled: true, priority: 1 },
    { name: 'PlanetScale', slug: 'planetscale', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/planetscale', apiEndpoint: 'https://api.lever.co/v0/postings/planetscale?mode=json', enabled: true, priority: 1 },
    { name: 'Weights & Biases', slug: 'wandb', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/wandb', apiEndpoint: 'https://api.lever.co/v0/postings/wandb?mode=json', enabled: true, priority: 1 },
    { name: 'Anduril', slug: 'anduril', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/anduril', apiEndpoint: 'https://api.lever.co/v0/postings/anduril?mode=json', enabled: true, priority: 1 },
    { name: 'SpaceX', slug: 'spacex', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/spacex', apiEndpoint: 'https://api.lever.co/v0/postings/spacex?mode=json', enabled: true, priority: 1 },
    { name: 'Palantir', slug: 'palantir', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/palantir', apiEndpoint: 'https://api.lever.co/v0/postings/palantir?mode=json', enabled: true, priority: 1 },
    { name: 'Nuro', slug: 'nuro', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/nuro', apiEndpoint: 'https://api.lever.co/v0/postings/nuro?mode=json', enabled: true, priority: 1 },
    { name: 'Aurora', slug: 'aurora', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/aurora', apiEndpoint: 'https://api.lever.co/v0/postings/aurora?mode=json', enabled: true, priority: 1 },
    { name: 'Cruise', slug: 'cruise', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/cruise', apiEndpoint: 'https://api.lever.co/v0/postings/cruise?mode=json', enabled: true, priority: 1 },
    { name: 'Waymo', slug: 'waymo', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/waymo', apiEndpoint: 'https://api.lever.co/v0/postings/waymo?mode=json', enabled: true, priority: 1 },

    // ============================================================================
    // WORKDAY COMPANIES (Scraper-based, no public API)
    // ============================================================================
    { name: 'Amazon', slug: 'amazon', source: JobSource.WORKDAY, careersUrl: 'https://www.amazon.jobs/en/search', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Apple', slug: 'apple', source: JobSource.WORKDAY, careersUrl: 'https://jobs.apple.com/en-us/search', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Google', slug: 'google', source: JobSource.WORKDAY, careersUrl: 'https://www.google.com/about/careers/applications/jobs/results', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Meta', slug: 'meta', source: JobSource.WORKDAY, careersUrl: 'https://www.metacareers.com/jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Microsoft', slug: 'microsoft', source: JobSource.WORKDAY, careersUrl: 'https://careers.microsoft.com/us/en/search-results', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Salesforce', slug: 'salesforce', source: JobSource.WORKDAY, careersUrl: 'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Adobe', slug: 'adobe', source: JobSource.WORKDAY, careersUrl: 'https://adobe.wd5.myworkdayjobs.com/external_experienced', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Cisco', slug: 'cisco', source: JobSource.WORKDAY, careersUrl: 'https://jobs.cisco.com/jobs/SearchJobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Intel', slug: 'intel', source: JobSource.WORKDAY, careersUrl: 'https://intel.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Oracle', slug: 'oracle', source: JobSource.WORKDAY, careersUrl: 'https://oracle.taleo.net/careersection/2/jobsearch.ftl', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'IBM', slug: 'ibm', source: JobSource.WORKDAY, careersUrl: 'https://www.ibm.com/careers/search', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Dell', slug: 'dell', source: JobSource.WORKDAY, careersUrl: 'https://jobs.dell.com/search-jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'HP', slug: 'hp', source: JobSource.WORKDAY, careersUrl: 'https://jobs.hp.com/en-us/Search-Results', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'VMware', slug: 'vmware', source: JobSource.WORKDAY, careersUrl: 'https://careers.vmware.com/careers/jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'PayPal', slug: 'paypal', source: JobSource.WORKDAY, careersUrl: 'https://paypal.wd1.myworkdayjobs.com/jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Visa', slug: 'visa', source: JobSource.WORKDAY, careersUrl: 'https://usa.visa.com/careers.html', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Mastercard', slug: 'mastercard', source: JobSource.WORKDAY, careersUrl: 'https://mastercard.wd1.myworkdayjobs.com/CorporateCareers', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Capital One', slug: 'capital-one', source: JobSource.WORKDAY, careersUrl: 'https://capitalone.wd1.myworkdayjobs.com/Capital_One', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'JPMorgan Chase', slug: 'jpmorgan', source: JobSource.WORKDAY, careersUrl: 'https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/requisitions', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Goldman Sachs', slug: 'goldman-sachs', source: JobSource.WORKDAY, careersUrl: 'https://www.goldmansachs.com/careers/find-a-job', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Morgan Stanley', slug: 'morgan-stanley', source: JobSource.WORKDAY, careersUrl: 'https://morganstanley.eightfold.ai/careers', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Bank of America', slug: 'bank-of-america', source: JobSource.WORKDAY, careersUrl: 'https://careers.bankofamerica.com/en-us/search-results', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'American Express', slug: 'amex', source: JobSource.WORKDAY, careersUrl: 'https://aexp.eightfold.ai/careers', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'NVIDIA', slug: 'nvidia', source: JobSource.WORKDAY, careersUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Qualcomm', slug: 'qualcomm', source: JobSource.WORKDAY, careersUrl: 'https://qualcomm.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'AMD', slug: 'amd', source: JobSource.WORKDAY, careersUrl: 'https://careers.amd.com/careers-home/jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Target', slug: 'target', source: JobSource.WORKDAY, careersUrl: 'https://jobs.target.com/search-jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Walmart', slug: 'walmart', source: JobSource.WORKDAY, careersUrl: 'https://careers.walmart.com/results', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Tesla', slug: 'tesla', source: JobSource.WORKDAY, careersUrl: 'https://www.tesla.com/careers/search', apiEndpoint: null, enabled: true, priority: 1 },

    // ============================================================================
    // ICIMS COMPANIES
    // ============================================================================
    { name: 'Uber', slug: 'uber', source: JobSource.ICIMS, careersUrl: 'https://www.uber.com/us/en/careers', apiEndpoint: 'https://www.uber.com/api/loadSearchJobsResults', enabled: true, priority: 1 },
    { name: 'Garmin', slug: 'garmin', source: JobSource.ICIMS, careersUrl: 'https://careers.garmin.com', apiEndpoint: 'https://careers-garmin.icims.com/jobs/search', enabled: true, priority: 1 },
    { name: 'Sony', slug: 'sony', source: JobSource.ICIMS, careersUrl: 'https://www.sonyjobs.com', apiEndpoint: 'https://sonyglobal.icims.com/jobs/search', enabled: true, priority: 1 },
    { name: 'SAP', slug: 'sap', source: JobSource.ICIMS, careersUrl: 'https://jobs.sap.com', apiEndpoint: 'https://sap.wd12.myworkdayjobs.com/External', enabled: true, priority: 1 },
    { name: 'ServiceNow', slug: 'servicenow', source: JobSource.ICIMS, careersUrl: 'https://careers.servicenow.com', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Autodesk', slug: 'autodesk', source: JobSource.ICIMS, careersUrl: 'https://autodesk.wd1.myworkdayjobs.com/Ext', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Electronic Arts', slug: 'ea', source: JobSource.ICIMS, careersUrl: 'https://ea.gr8people.com/jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Activision Blizzard', slug: 'activision', source: JobSource.ICIMS, careersUrl: 'https://careers.activisionblizzard.com', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Nike', slug: 'nike', source: JobSource.ICIMS, careersUrl: 'https://jobs.nike.com', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Johnson & Johnson', slug: 'jnj', source: JobSource.ICIMS, careersUrl: 'https://jobs.jnj.com', apiEndpoint: null, enabled: true, priority: 1 },

    // ============================================================================
    // ORACLE CLOUD COMPANIES
    // ============================================================================
    { name: 'Verisk', slug: 'verisk', source: JobSource.ORACLE, careersUrl: 'https://fa-ewmy-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/requisitions', apiEndpoint: 'https://fa-ewmy-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions', enabled: true, priority: 1 },
    { name: 'Lockheed Martin', slug: 'lockheed', source: JobSource.ORACLE, careersUrl: 'https://www.lockheedmartinjobs.com/search-jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Raytheon', slug: 'raytheon', source: JobSource.ORACLE, careersUrl: 'https://careers.rtx.com/global/en/search-results', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Boeing', slug: 'boeing', source: JobSource.ORACLE, careersUrl: 'https://jobs.boeing.com/search-jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'General Electric', slug: 'ge', source: JobSource.ORACLE, careersUrl: 'https://jobs.gecareers.com/global/en/search-results', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Caterpillar', slug: 'caterpillar', source: JobSource.ORACLE, careersUrl: 'https://careers.caterpillar.com/en/jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Northrop Grumman', slug: 'northrop', source: JobSource.ORACLE, careersUrl: 'https://www.northropgrumman.com/jobs', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'General Dynamics', slug: 'gd', source: JobSource.ORACLE, careersUrl: 'https://www.gd.com/careers', apiEndpoint: null, enabled: true, priority: 1 },

    // ============================================================================
    // WISCONSIN IT COMPANIES (Madison, Milwaukee, Brookfield)
    // ============================================================================
    { name: 'Epic Systems', slug: 'epic', source: JobSource.WORKDAY, careersUrl: 'https://careers.epic.com', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Northwestern Mutual', slug: 'northwestern-mutual', source: JobSource.WORKDAY, careersUrl: 'https://careers.northwesternmutual.com', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Rockwell Automation', slug: 'rockwell', source: JobSource.WORKDAY, careersUrl: 'https://rockwellautomation.wd1.myworkdayjobs.com/External_Career_Site', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Fiserv', slug: 'fiserv', source: JobSource.WORKDAY, careersUrl: 'https://fiserv.wd5.myworkdayjobs.com/EXT', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Fetch Rewards', slug: 'fetch', source: JobSource.GREENHOUSE, careersUrl: 'https://www.fetchrewards.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fetchrewards/jobs', enabled: true, priority: 2 },
    { name: 'Redox', slug: 'redox', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/redoxengine', apiEndpoint: 'https://api.lever.co/v0/postings/redoxengine?mode=json', enabled: true, priority: 2 },
    { name: 'Promega', slug: 'promega', source: JobSource.WORKDAY, careersUrl: 'https://promega.wd5.myworkdayjobs.com/ProUnitedStates', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'EnsoData', slug: 'ensodata', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/ensodata', apiEndpoint: 'https://api.lever.co/v0/postings/ensodata?mode=json', enabled: true, priority: 2 },
    { name: 'Zywave', slug: 'zywave', source: JobSource.GREENHOUSE, careersUrl: 'https://www.zywave.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zywave/jobs', enabled: true, priority: 2 },
    { name: 'Astronautics', slug: 'astronautics', source: JobSource.WORKDAY, careersUrl: 'https://astronautics.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'MiTek', slug: 'mitek', source: JobSource.WORKDAY, careersUrl: 'https://mitek.wd1.myworkdayjobs.com/MiTek', apiEndpoint: null, enabled: true, priority: 2 },

    // ============================================================================
    // ILLINOIS IT COMPANIES (Chicago, Schaumburg, Deerfield)
    // ============================================================================
    { name: 'Motorola Solutions', slug: 'motorola', source: JobSource.WORKDAY, careersUrl: 'https://motorolasolutions.wd5.myworkdayjobs.com/Careers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Sprout Social', slug: 'sprout-social', source: JobSource.GREENHOUSE, careersUrl: 'https://sproutsocial.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sproutsocial/jobs', enabled: true, priority: 2 },
    { name: 'Relativity', slug: 'relativity', source: JobSource.GREENHOUSE, careersUrl: 'https://www.relativity.com/company/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/relataboratories/jobs', enabled: true, priority: 2 },
    { name: 'Uptake', slug: 'uptake', source: JobSource.GREENHOUSE, careersUrl: 'https://www.uptake.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/uptake/jobs', enabled: true, priority: 2 },
    { name: 'Grubhub', slug: 'grubhub', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.grubhub.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/grubhub/jobs', enabled: true, priority: 2 },
    { name: 'Groupon', slug: 'groupon', source: JobSource.GREENHOUSE, careersUrl: 'https://www.grouponcareers.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/groupon/jobs', enabled: true, priority: 2 },
    { name: 'Tempus AI', slug: 'tempus', source: JobSource.GREENHOUSE, careersUrl: 'https://www.tempus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tempus/jobs', enabled: true, priority: 2 },
    { name: 'FourKites', slug: 'fourkites', source: JobSource.GREENHOUSE, careersUrl: 'https://www.fourkites.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fourkites/jobs', enabled: true, priority: 2 },
    { name: 'ShipBob', slug: 'shipbob', source: JobSource.GREENHOUSE, careersUrl: 'https://www.shipbob.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/shipbob/jobs', enabled: true, priority: 2 },
    { name: 'Braintree', slug: 'braintree', source: JobSource.GREENHOUSE, careersUrl: 'https://www.braintreepayments.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/braintree/jobs', enabled: true, priority: 2 },
    { name: 'Avant', slug: 'avant', source: JobSource.GREENHOUSE, careersUrl: 'https://www.avant.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/avant/jobs', enabled: true, priority: 2 },
    { name: 'iManage', slug: 'imanage', source: JobSource.GREENHOUSE, careersUrl: 'https://imanage.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/imanage/jobs', enabled: true, priority: 2 },
    { name: 'Litera', slug: 'litera', source: JobSource.GREENHOUSE, careersUrl: 'https://www.litera.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/litera/jobs', enabled: true, priority: 2 },
    { name: 'Vibes', slug: 'vibes', source: JobSource.GREENHOUSE, careersUrl: 'https://www.vibes.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vibes/jobs', enabled: true, priority: 2 },
    { name: 'CoinFlip', slug: 'coinflip', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/coinflip', apiEndpoint: 'https://api.lever.co/v0/postings/coinflip?mode=json', enabled: true, priority: 2 },
    { name: 'Tegus', slug: 'tegus', source: JobSource.GREENHOUSE, careersUrl: 'https://www.tegus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tegus/jobs', enabled: true, priority: 2 },
    { name: 'Kin Insurance', slug: 'kin', source: JobSource.GREENHOUSE, careersUrl: 'https://www.kin.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kin/jobs', enabled: true, priority: 2 },
    { name: 'Rush Street Interactive', slug: 'rsi', source: JobSource.GREENHOUSE, careersUrl: 'https://rushstreetinteractive.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rushstreetinteractive/jobs', enabled: true, priority: 2 },
    { name: 'Braviant Holdings', slug: 'braviant', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/braviantholdings', apiEndpoint: 'https://api.lever.co/v0/postings/braviantholdings?mode=json', enabled: true, priority: 2 },
    { name: 'ActiveCampaign', slug: 'activecampaign', source: JobSource.GREENHOUSE, careersUrl: 'https://www.activecampaign.com/about/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/activecampaign/jobs', enabled: true, priority: 2 },
    { name: 'Jellyvision', slug: 'jellyvision', source: JobSource.GREENHOUSE, careersUrl: 'https://www.jellyvision.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/jellyvision/jobs', enabled: true, priority: 2 },
    { name: 'G2', slug: 'g2', source: JobSource.GREENHOUSE, careersUrl: 'https://www.g2.com/company/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/g2crowd/jobs', enabled: true, priority: 2 },
    { name: 'project44', slug: 'project44', source: JobSource.GREENHOUSE, careersUrl: 'https://www.project44.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/project44/jobs', enabled: true, priority: 2 },
    { name: 'Hireology', slug: 'hireology', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/hireology', apiEndpoint: 'https://api.lever.co/v0/postings/hireology?mode=json', enabled: true, priority: 2 },
    { name: 'Reverb', slug: 'reverb', source: JobSource.GREENHOUSE, careersUrl: 'https://reverb.com/page/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/reverb/jobs', enabled: true, priority: 2 },
    { name: 'kCura', slug: 'kcura', source: JobSource.GREENHOUSE, careersUrl: 'https://www.relativity.com/company/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kcura/jobs', enabled: true, priority: 2 },
    { name: 'SMS Assist', slug: 'smsassist', source: JobSource.GREENHOUSE, careersUrl: 'https://www.smsassist.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/smsassist/jobs', enabled: true, priority: 2 },
    { name: 'Enova International', slug: 'enova', source: JobSource.GREENHOUSE, careersUrl: 'https://www.enova.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/enova/jobs', enabled: true, priority: 2 },
    { name: 'Trunk Club', slug: 'trunkclub', source: JobSource.GREENHOUSE, careersUrl: 'https://www.trunkclub.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/trunkclub/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // ADDITIONAL WISCONSIN IT COMPANIES (Madison, Milwaukee, Brookfield, Delafield)
    // ============================================================================
    // Madison Tech Hub
    { name: 'AkitaBox', slug: 'akitabox', source: JobSource.GREENHOUSE, careersUrl: 'https://akitabox.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/akitabox/jobs', enabled: true, priority: 3 },
    { name: 'Moxe Health', slug: 'moxe', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/moxehealth', apiEndpoint: 'https://api.lever.co/v0/postings/moxehealth?mode=json', enabled: true, priority: 3 },
    { name: 'Propeller Health', slug: 'propeller', source: JobSource.GREENHOUSE, careersUrl: 'https://propellerhealth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/propellerhealth/jobs', enabled: true, priority: 3 },
    { name: 'Health eFilings', slug: 'healthefilings', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/healthefilings', apiEndpoint: 'https://api.lever.co/v0/postings/healthefilings?mode=json', enabled: true, priority: 3 },
    { name: 'Singlewire Software', slug: 'singlewire', source: JobSource.GREENHOUSE, careersUrl: 'https://singlewire.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/singlewire/jobs', enabled: true, priority: 3 },
    { name: 'EatStreet', slug: 'eatstreet', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/eatstreet', apiEndpoint: 'https://api.lever.co/v0/postings/eatstreet?mode=json', enabled: true, priority: 3 },
    { name: 'Datica', slug: 'datica', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/datica', apiEndpoint: 'https://api.lever.co/v0/postings/datica?mode=json', enabled: true, priority: 3 },
    { name: 'Noble Applications', slug: 'noble', source: JobSource.GREENHOUSE, careersUrl: 'https://nobleapplications.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/nobleapplications/jobs', enabled: true, priority: 3 },
    { name: 'Wellbe', slug: 'wellbe', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/wellbe', apiEndpoint: 'https://api.lever.co/v0/postings/wellbe?mode=json', enabled: true, priority: 3 },
    { name: 'Bend Health', slug: 'bendhealth', source: JobSource.GREENHOUSE, careersUrl: 'https://bendhealth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bendhealth/jobs', enabled: true, priority: 3 },
    { name: 'Synthetaic', slug: 'synthetaic', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/synthetaic', apiEndpoint: 'https://api.lever.co/v0/postings/synthetaic?mode=json', enabled: true, priority: 3 },
    { name: 'Polco', slug: 'polco', source: JobSource.GREENHOUSE, careersUrl: 'https://polco.us/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/polco/jobs', enabled: true, priority: 3 },
    { name: 'DataChat', slug: 'datachat', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/datachat', apiEndpoint: 'https://api.lever.co/v0/postings/datachat?mode=json', enabled: true, priority: 3 },
    { name: 'Type One Energy', slug: 'typeone', source: JobSource.GREENHOUSE, careersUrl: 'https://typeoneenergy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/typeoneenergy/jobs', enabled: true, priority: 3 },
    { name: 'Esker', slug: 'esker', source: JobSource.WORKDAY, careersUrl: 'https://esker.com/careers', apiEndpoint: null, enabled: true, priority: 3 },
    { name: '7Rivers', slug: '7rivers', source: JobSource.GREENHOUSE, careersUrl: 'https://7rivers.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/7rivers/jobs', enabled: true, priority: 3 },
    { name: 'Technova Industries', slug: 'technova', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/technova', apiEndpoint: 'https://api.lever.co/v0/postings/technova?mode=json', enabled: true, priority: 3 },
    // Milwaukee Software Companies
    { name: 'Geneca', slug: 'geneca', source: JobSource.GREENHOUSE, careersUrl: 'https://geneca.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/geneca/jobs', enabled: true, priority: 3 },
    { name: 'Entrision', slug: 'entrision', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/entrision', apiEndpoint: 'https://api.lever.co/v0/postings/entrision?mode=json', enabled: true, priority: 3 },
    { name: 'Mitratech', slug: 'mitratech', source: JobSource.GREENHOUSE, careersUrl: 'https://mitratech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mitratech/jobs', enabled: true, priority: 3 },
    { name: 'SoftwareOne', slug: 'softwareone', source: JobSource.WORKDAY, careersUrl: 'https://softwareone.com/careers', apiEndpoint: null, enabled: true, priority: 3 },
    { name: 'Sift Healthcare', slug: 'sifthealthcare', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/sifthealthcare', apiEndpoint: 'https://api.lever.co/v0/postings/sifthealthcare?mode=json', enabled: true, priority: 3 },
    { name: 'zizzl Health', slug: 'zizzl', source: JobSource.GREENHOUSE, careersUrl: 'https://zizzl.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zizzl/jobs', enabled: true, priority: 3 },

    // ============================================================================
    // ADDITIONAL CHICAGO/ILLINOIS IT COMPANIES
    // ============================================================================
    // Major Tech & Software
    { name: 'Morningstar', slug: 'morningstar', source: JobSource.WORKDAY, careersUrl: 'https://morningstar.wd5.myworkdayjobs.com/morningstar', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Paylocity', slug: 'paylocity', source: JobSource.GREENHOUSE, careersUrl: 'https://paylocity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/paylocity/jobs', enabled: true, priority: 2 },
    { name: 'Origami Risk', slug: 'origamirisk', source: JobSource.GREENHOUSE, careersUrl: 'https://origamirisk.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/origamirisk/jobs', enabled: true, priority: 2 },
    { name: 'LogicGate', slug: 'logicgate', source: JobSource.GREENHOUSE, careersUrl: 'https://logicgate.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/logicgate/jobs', enabled: true, priority: 2 },
    { name: 'CCC Intelligent Solutions', slug: 'ccc', source: JobSource.WORKDAY, careersUrl: 'https://ccc.wd1.myworkdayjobs.com/CCC_Careers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Duck Creek Technologies', slug: 'duckcreek', source: JobSource.GREENHOUSE, careersUrl: 'https://duckcreek.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/duckcreek/jobs', enabled: true, priority: 2 },
    { name: 'Clearcover', slug: 'clearcover', source: JobSource.GREENHOUSE, careersUrl: 'https://clearcover.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/clearcover/jobs', enabled: true, priority: 2 },
    { name: 'Kalderos', slug: 'kalderos', source: JobSource.GREENHOUSE, careersUrl: 'https://kalderos.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kalderos/jobs', enabled: true, priority: 2 },
    { name: 'Gogo Business Aviation', slug: 'gogo', source: JobSource.GREENHOUSE, careersUrl: 'https://gogo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gogo/jobs', enabled: true, priority: 2 },
    { name: 'Strata Decision Technology', slug: 'stratadecision', source: JobSource.GREENHOUSE, careersUrl: 'https://stratadecision.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/stratadecision/jobs', enabled: true, priority: 2 },
    { name: 'Vivid Seats', slug: 'vividseats', source: JobSource.GREENHOUSE, careersUrl: 'https://vividseats.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vividseats/jobs', enabled: true, priority: 2 },
    { name: 'Logiwa', slug: 'logiwa', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/logiwa', apiEndpoint: 'https://api.lever.co/v0/postings/logiwa?mode=json', enabled: true, priority: 2 },
    { name: 'OppLoans', slug: 'opploans', source: JobSource.GREENHOUSE, careersUrl: 'https://opploans.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/opploans/jobs', enabled: true, priority: 2 },
    { name: 'Showpad', slug: 'showpad', source: JobSource.GREENHOUSE, careersUrl: 'https://showpad.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/showpad/jobs', enabled: true, priority: 2 },
    { name: 'Tock', slug: 'tock', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tock', apiEndpoint: 'https://api.lever.co/v0/postings/tock?mode=json', enabled: true, priority: 2 },
    { name: 'Flywire', slug: 'flywire', source: JobSource.GREENHOUSE, careersUrl: 'https://flywire.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/flywire/jobs', enabled: true, priority: 2 },
    { name: 'Enfusion', slug: 'enfusion', source: JobSource.GREENHOUSE, careersUrl: 'https://enfusion.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/enfusion/jobs', enabled: true, priority: 2 },
    { name: 'NinjaTrader', slug: 'ninjatrader', source: JobSource.GREENHOUSE, careersUrl: 'https://ninjatrader.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ninjatrader/jobs', enabled: true, priority: 2 },
    { name: 'Home Chef', slug: 'homechef', source: JobSource.GREENHOUSE, careersUrl: 'https://homechef.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/homechef/jobs', enabled: true, priority: 2 },
    { name: 'Screencastify', slug: 'screencastify', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/screencastify', apiEndpoint: 'https://api.lever.co/v0/postings/screencastify?mode=json', enabled: true, priority: 2 },
    { name: 'Bswift', slug: 'bswift', source: JobSource.WORKDAY, careersUrl: 'https://bswift.com/careers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Amount', slug: 'amount', source: JobSource.GREENHOUSE, careersUrl: 'https://amount.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/amount/jobs', enabled: true, priority: 2 },
    { name: 'Logik.io', slug: 'logikio', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/logik', apiEndpoint: 'https://api.lever.co/v0/postings/logik?mode=json', enabled: true, priority: 2 },
    { name: 'Renterra', slug: 'renterra', source: JobSource.GREENHOUSE, careersUrl: 'https://renterra.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/renterra/jobs', enabled: true, priority: 3 },
    { name: 'Anthill', slug: 'anthill', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/anthill', apiEndpoint: 'https://api.lever.co/v0/postings/anthill?mode=json', enabled: true, priority: 3 },
    { name: 'Foursquare', slug: 'foursquare', source: JobSource.GREENHOUSE, careersUrl: 'https://foursquare.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/foursquare/jobs', enabled: true, priority: 2 },
    { name: 'Qualtrics', slug: 'qualtrics', source: JobSource.GREENHOUSE, careersUrl: 'https://qualtrics.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/qualtrics/jobs', enabled: true, priority: 2 },
    { name: 'Cognizant', slug: 'cognizant', source: JobSource.WORKDAY, careersUrl: 'https://cognizant.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Accenture', slug: 'accenture', source: JobSource.WORKDAY, careersUrl: 'https://accenture.com/careers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'SAP Fieldglass', slug: 'sapfieldglass', source: JobSource.WORKDAY, careersUrl: 'https://sap.com/careers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'OneSpan', slug: 'onespan', source: JobSource.GREENHOUSE, careersUrl: 'https://onespan.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/onespan/jobs', enabled: true, priority: 2 },
    { name: 'Inteliquent', slug: 'inteliquent', source: JobSource.GREENHOUSE, careersUrl: 'https://inteliquent.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/inteliquent/jobs', enabled: true, priority: 2 },
    { name: 'Basis Technologies', slug: 'basis', source: JobSource.GREENHOUSE, careersUrl: 'https://basis.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/basis/jobs', enabled: true, priority: 2 },
    { name: 'Instawork', slug: 'instawork', source: JobSource.GREENHOUSE, careersUrl: 'https://instawork.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/instawork/jobs', enabled: true, priority: 2 },
    { name: 'CSC', slug: 'csc', source: JobSource.WORKDAY, careersUrl: 'https://csc.com/careers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'DFIN', slug: 'dfin', source: JobSource.GREENHOUSE, careersUrl: 'https://dfin.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dfin/jobs', enabled: true, priority: 2 },
    { name: 'Spark Hire', slug: 'sparkhire', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/sparkhire', apiEndpoint: 'https://api.lever.co/v0/postings/sparkhire?mode=json', enabled: true, priority: 2 },
    { name: 'SurePayroll', slug: 'surepayroll', source: JobSource.GREENHOUSE, careersUrl: 'https://surepayroll.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/surepayroll/jobs', enabled: true, priority: 2 },
    { name: 'Buildout', slug: 'buildout', source: JobSource.GREENHOUSE, careersUrl: 'https://buildout.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/buildout/jobs', enabled: true, priority: 2 },
    { name: 'Dealer Inspire', slug: 'dealerinspire', source: JobSource.GREENHOUSE, careersUrl: 'https://dealerinspire.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dealerinspire/jobs', enabled: true, priority: 2 },
    { name: 'Highland', slug: 'highland', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/highland', apiEndpoint: 'https://api.lever.co/v0/postings/highland?mode=json', enabled: true, priority: 2 },
    { name: 'TXI', slug: 'txi', source: JobSource.GREENHOUSE, careersUrl: 'https://txi.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/txi/jobs', enabled: true, priority: 2 },
    { name: 'Codal', slug: 'codal', source: JobSource.GREENHOUSE, careersUrl: 'https://codal.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/codal/jobs', enabled: true, priority: 2 },
    { name: 'Dscout', slug: 'dscout', source: JobSource.GREENHOUSE, careersUrl: 'https://dscout.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dscout/jobs', enabled: true, priority: 2 },
    { name: 'Cleo', slug: 'cleo', source: JobSource.GREENHOUSE, careersUrl: 'https://cleo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cleo/jobs', enabled: true, priority: 2 },
    { name: 'Club Automation', slug: 'clubautomation', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/clubautomation', apiEndpoint: 'https://api.lever.co/v0/postings/clubautomation?mode=json', enabled: true, priority: 2 },
    { name: 'Bitnomial', slug: 'bitnomial', source: JobSource.GREENHOUSE, careersUrl: 'https://bitnomial.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bitnomial/jobs', enabled: true, priority: 2 },
    { name: 'IMC Trading', slug: 'imc', source: JobSource.GREENHOUSE, careersUrl: 'https://imc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/imc/jobs', enabled: true, priority: 2 },
    { name: 'PerkSpot', slug: 'perkspot', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/perkspot', apiEndpoint: 'https://api.lever.co/v0/postings/perkspot?mode=json', enabled: true, priority: 2 },
    { name: 'CellTrak', slug: 'celltrak', source: JobSource.GREENHOUSE, careersUrl: 'https://celltrak.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/celltrak/jobs', enabled: true, priority: 2 },
    { name: 'Pricefx', slug: 'pricefx', source: JobSource.GREENHOUSE, careersUrl: 'https://pricefx.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pricefx/jobs', enabled: true, priority: 2 },
    { name: 'SteelSeries', slug: 'steelseries', source: JobSource.GREENHOUSE, careersUrl: 'https://steelseries.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/steelseries/jobs', enabled: true, priority: 2 },
    { name: 'Connamara Systems', slug: 'connamara', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/connamara', apiEndpoint: 'https://api.lever.co/v0/postings/connamara?mode=json', enabled: true, priority: 2 },
    { name: 'Dataiku', slug: 'dataiku', source: JobSource.GREENHOUSE, careersUrl: 'https://dataiku.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dataiku/jobs', enabled: true, priority: 2 },
    { name: 'Knock', slug: 'knock', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/knock', apiEndpoint: 'https://api.lever.co/v0/postings/knock?mode=json', enabled: true, priority: 2 },
    { name: 'Simplex Trading', slug: 'simplextrading', source: JobSource.GREENHOUSE, careersUrl: 'https://simplextrading.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/simplextrading/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // TEXAS IT COMPANIES (Austin, Dallas, Houston)
    // ============================================================================
    { name: 'Indeed', slug: 'indeed', source: JobSource.GREENHOUSE, careersUrl: 'https://indeed.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/indeed/jobs', enabled: true, priority: 2 },
    { name: 'Dell Technologies', slug: 'dell', source: JobSource.WORKDAY, careersUrl: 'https://dell.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Q2', slug: 'q2', source: JobSource.GREENHOUSE, careersUrl: 'https://q2.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/q2/jobs', enabled: true, priority: 2 },
    { name: 'WP Engine', slug: 'wpengine', source: JobSource.GREENHOUSE, careersUrl: 'https://wpengine.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/wpengine/jobs', enabled: true, priority: 2 },
    { name: 'WillowTree', slug: 'willowtree', source: JobSource.GREENHOUSE, careersUrl: 'https://willowtreeapps.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/willowtree/jobs', enabled: true, priority: 2 },
    { name: 'National Instruments', slug: 'ni', source: JobSource.WORKDAY, careersUrl: 'https://ni.wd1.myworkdayjobs.com/NI', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Expedia Group', slug: 'expedia', source: JobSource.GREENHOUSE, careersUrl: 'https://lifeatexpediagroup.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/expediagroup/jobs', enabled: true, priority: 2 },
    { name: '7T', slug: '7t', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/7t', apiEndpoint: 'https://api.lever.co/v0/postings/7t?mode=json', enabled: true, priority: 3 },
    { name: 'BMC Software', slug: 'bmc', source: JobSource.WORKDAY, careersUrl: 'https://bmc.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Hewlett Packard Enterprise', slug: 'hpe', source: JobSource.WORKDAY, careersUrl: 'https://hpe.wd5.myworkdayjobs.com/Jobsathpe', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'HighRadius', slug: 'highradius', source: JobSource.GREENHOUSE, careersUrl: 'https://highradius.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/highradius/jobs', enabled: true, priority: 2 },
    { name: 'Sabre', slug: 'sabre', source: JobSource.WORKDAY, careersUrl: 'https://sabre.wd1.myworkdayjobs.com/SabreJobs', apiEndpoint: null, enabled: true, priority: 2 },

    // ============================================================================
    // COLORADO IT COMPANIES (Denver, Boulder)
    // ============================================================================
    { name: 'Ibotta', slug: 'ibotta', source: JobSource.GREENHOUSE, careersUrl: 'https://ibotta.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ibotta/jobs', enabled: true, priority: 2 },
    { name: 'TransUnion', slug: 'transunion', source: JobSource.WORKDAY, careersUrl: 'https://transunion.wd5.myworkdayjobs.com/TransUnion', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Quantum Metric', slug: 'quantummetric', source: JobSource.GREENHOUSE, careersUrl: 'https://quantummetric.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/quantummetric/jobs', enabled: true, priority: 2 },
    { name: 'TIFIN', slug: 'tifin', source: JobSource.GREENHOUSE, careersUrl: 'https://tifin.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tifin/jobs', enabled: true, priority: 2 },
    { name: 'Pie Insurance', slug: 'pie', source: JobSource.GREENHOUSE, careersUrl: 'https://pieinsurance.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pieinsurance/jobs', enabled: true, priority: 2 },
    { name: 'Strive Health', slug: 'strivehealth', source: JobSource.GREENHOUSE, careersUrl: 'https://strivehealth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/strivehealth/jobs', enabled: true, priority: 2 },
    { name: 'Guild Education', slug: 'guild', source: JobSource.GREENHOUSE, careersUrl: 'https://guild.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/guildeducation/jobs', enabled: true, priority: 2 },
    { name: 'Crusoe Energy', slug: 'crusoe', source: JobSource.GREENHOUSE, careersUrl: 'https://crusoe.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/crusoe/jobs', enabled: true, priority: 2 },
    { name: 'MagicSchool AI', slug: 'magicschool', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/magicschool', apiEndpoint: 'https://api.lever.co/v0/postings/magicschool?mode=json', enabled: true, priority: 3 },
    { name: 'Udemy', slug: 'udemy', source: JobSource.GREENHOUSE, careersUrl: 'https://udemy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/udemy/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // WASHINGTON IT COMPANIES (Seattle, Bellevue, Redmond)
    // ============================================================================
    { name: 'Expedia Seattle', slug: 'expedia-seattle', source: JobSource.GREENHOUSE, careersUrl: 'https://lifeatexpediagroup.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/expediagroup/jobs', enabled: true, priority: 2 },
    { name: 'F5 Networks', slug: 'f5', source: JobSource.WORKDAY, careersUrl: 'https://f5.wd5.myworkdayjobs.com/f5jobs', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Cloudflare', slug: 'cloudflare', source: JobSource.GREENHOUSE, careersUrl: 'https://cloudflare.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cloudflare/jobs', enabled: true, priority: 2 },
    { name: 'Getty Images', slug: 'gettyimages', source: JobSource.GREENHOUSE, careersUrl: 'https://gettyimages.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gettyimages/jobs', enabled: true, priority: 2 },
    { name: 'Okta', slug: 'okta', source: JobSource.GREENHOUSE, careersUrl: 'https://okta.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/okta/jobs', enabled: true, priority: 2 },
    { name: 'Snap Inc', slug: 'snap', source: JobSource.GREENHOUSE, careersUrl: 'https://snap.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snap/jobs', enabled: true, priority: 2 },
    { name: 'Redfin', slug: 'redfin', source: JobSource.GREENHOUSE, careersUrl: 'https://redfin.com/about/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/redfin/jobs', enabled: true, priority: 2 },
    { name: 'Zillow', slug: 'zillow', source: JobSource.GREENHOUSE, careersUrl: 'https://zillow.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zillowgroup/jobs', enabled: true, priority: 2 },
    { name: 'Highspot', slug: 'highspot', source: JobSource.GREENHOUSE, careersUrl: 'https://highspot.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/highspot/jobs', enabled: true, priority: 2 },
    { name: 'Outreach', slug: 'outreach', source: JobSource.GREENHOUSE, careersUrl: 'https://outreach.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/outreach/jobs', enabled: true, priority: 2 },
    { name: 'Amperity', slug: 'amperity', source: JobSource.GREENHOUSE, careersUrl: 'https://amperity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/amperity/jobs', enabled: true, priority: 2 },
    { name: 'Remitly', slug: 'remitly', source: JobSource.GREENHOUSE, careersUrl: 'https://remitly.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/remitly/jobs', enabled: true, priority: 2 },
    { name: 'PitchBook', slug: 'pitchbook', source: JobSource.GREENHOUSE, careersUrl: 'https://pitchbook.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pitchbook/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // MASSACHUSETTS IT COMPANIES (Boston, Cambridge)
    // ============================================================================
    { name: 'PTC', slug: 'ptc', source: JobSource.WORKDAY, careersUrl: 'https://ptc.wd3.myworkdayjobs.com/PTCCareers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Rapid7', slug: 'rapid7', source: JobSource.GREENHOUSE, careersUrl: 'https://rapid7.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rapid7/jobs', enabled: true, priority: 2 },
    { name: 'Akamai Technologies', slug: 'akamai', source: JobSource.WORKDAY, careersUrl: 'https://akamai.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'HubSpot', slug: 'hubspot', source: JobSource.GREENHOUSE, careersUrl: 'https://hubspot.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hubspot/jobs', enabled: true, priority: 2 },
    { name: 'Toast', slug: 'toast', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.toasttab.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/toast/jobs', enabled: true, priority: 2 },
    { name: 'Klaviyo', slug: 'klaviyo', source: JobSource.GREENHOUSE, careersUrl: 'https://klaviyo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/klaviyo/jobs', enabled: true, priority: 2 },
    { name: 'Datadog', slug: 'datadog', source: JobSource.GREENHOUSE, careersUrl: 'https://datadoghq.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/datadog/jobs', enabled: true, priority: 2 },
    { name: 'Alteryx', slug: 'alteryx', source: JobSource.GREENHOUSE, careersUrl: 'https://alteryx.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/alteryx/jobs', enabled: true, priority: 2 },
    { name: 'Veeva Systems', slug: 'veeva', source: JobSource.GREENHOUSE, careersUrl: 'https://veeva.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/veeva/jobs', enabled: true, priority: 2 },
    { name: 'Nuance Communications', slug: 'nuance', source: JobSource.WORKDAY, careersUrl: 'https://nuance.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Pegasystems', slug: 'pega', source: JobSource.GREENHOUSE, careersUrl: 'https://pega.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pegasystems/jobs', enabled: true, priority: 2 },
    { name: 'Rocket Software', slug: 'rocket', source: JobSource.WORKDAY, careersUrl: 'https://rocketsoftware.wd5.myworkdayjobs.com/RocketSoftwareCareers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Dynatrace', slug: 'dynatrace', source: JobSource.GREENHOUSE, careersUrl: 'https://dynatrace.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dynatrace/jobs', enabled: true, priority: 2 },
    { name: 'DataRobot', slug: 'datarobot', source: JobSource.GREENHOUSE, careersUrl: 'https://datarobot.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/datarobot/jobs', enabled: true, priority: 2 },
    { name: 'Buildium', slug: 'buildium', source: JobSource.GREENHOUSE, careersUrl: 'https://buildium.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/buildium/jobs', enabled: true, priority: 2 },
    { name: 'Snyk', slug: 'snyk', source: JobSource.GREENHOUSE, careersUrl: 'https://snyk.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snyk/jobs', enabled: true, priority: 2 },
    { name: 'Mabl', slug: 'mabl', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/mabl', apiEndpoint: 'https://api.lever.co/v0/postings/mabl?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // NEW YORK IT COMPANIES (NYC, Manhattan)
    // ============================================================================
    { name: 'Bloomberg', slug: 'bloomberg', source: JobSource.WORKDAY, careersUrl: 'https://bloomberg.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Ramp', slug: 'ramp', source: JobSource.GREENHOUSE, careersUrl: 'https://ramp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ramp/jobs', enabled: true, priority: 2 },
    { name: 'Kensho Technologies', slug: 'kensho', source: JobSource.GREENHOUSE, careersUrl: 'https://kensho.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kensho/jobs', enabled: true, priority: 2 },
    { name: 'SeatGeek', slug: 'seatgeek', source: JobSource.GREENHOUSE, careersUrl: 'https://seatgeek.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/seatgeek/jobs', enabled: true, priority: 2 },
    { name: 'FloQast', slug: 'floqast', source: JobSource.GREENHOUSE, careersUrl: 'https://floqast.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/floqast/jobs', enabled: true, priority: 2 },
    { name: 'Monte Carlo', slug: 'montecarlo', source: JobSource.GREENHOUSE, careersUrl: 'https://montecarlo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/montecarlodata/jobs', enabled: true, priority: 2 },
    { name: 'EliseAI', slug: 'eliseai', source: JobSource.GREENHOUSE, careersUrl: 'https://eliseai.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/eliseai/jobs', enabled: true, priority: 2 },
    { name: 'Runway', slug: 'runway', source: JobSource.GREENHOUSE, careersUrl: 'https://runwayml.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/runwayml/jobs', enabled: true, priority: 2 },
    { name: 'Brigit', slug: 'brigit', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/brigit', apiEndpoint: 'https://api.lever.co/v0/postings/brigit?mode=json', enabled: true, priority: 2 },
    { name: 'Huge', slug: 'huge', source: JobSource.GREENHOUSE, careersUrl: 'https://hugeinc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/huge/jobs', enabled: true, priority: 2 },
    { name: 'Headway', slug: 'headway', source: JobSource.GREENHOUSE, careersUrl: 'https://headway.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/headwayco/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // GEORGIA IT COMPANIES (Atlanta, Alpharetta)
    // ============================================================================
    { name: 'NCR Corporation', slug: 'ncr', source: JobSource.WORKDAY, careersUrl: 'https://ncr.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Mailchimp', slug: 'mailchimp', source: JobSource.GREENHOUSE, careersUrl: 'https://mailchimp.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mailchimp/jobs', enabled: true, priority: 2 },
    { name: 'Secureworks', slug: 'secureworks', source: JobSource.WORKDAY, careersUrl: 'https://secureworks.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Global Payments', slug: 'globalpayments', source: JobSource.WORKDAY, careersUrl: 'https://globalpayments.wd1.myworkdayjobs.com/Careers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Salesloft', slug: 'salesloft', source: JobSource.GREENHOUSE, careersUrl: 'https://salesloft.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/salesloft/jobs', enabled: true, priority: 2 },
    { name: 'OneTrust', slug: 'onetrust', source: JobSource.GREENHOUSE, careersUrl: 'https://onetrust.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/onetrust/jobs', enabled: true, priority: 2 },
    { name: 'Flock Safety', slug: 'flocksafety', source: JobSource.GREENHOUSE, careersUrl: 'https://flocksafety.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/flocksafety/jobs', enabled: true, priority: 2 },
    { name: 'Greenlight Financial', slug: 'greenlight', source: JobSource.GREENHOUSE, careersUrl: 'https://greenlight.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/greenlight/jobs', enabled: true, priority: 2 },
    { name: 'Cardlytics', slug: 'cardlytics', source: JobSource.GREENHOUSE, careersUrl: 'https://cardlytics.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cardlytics/jobs', enabled: true, priority: 2 },
    { name: 'Terminus', slug: 'terminus', source: JobSource.GREENHOUSE, careersUrl: 'https://terminus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/terminus/jobs', enabled: true, priority: 2 },
    { name: 'Stord', slug: 'stord', source: JobSource.GREENHOUSE, careersUrl: 'https://stord.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/stord/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // NORTH CAROLINA IT COMPANIES (Raleigh, Durham, Research Triangle)
    // ============================================================================
    { name: 'Red Hat', slug: 'redhat', source: JobSource.WORKDAY, careersUrl: 'https://redhat.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'SAS Institute', slug: 'sas', source: JobSource.WORKDAY, careersUrl: 'https://sas.wd1.myworkdayjobs.com/SAS', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Pendo', slug: 'pendo', source: JobSource.GREENHOUSE, careersUrl: 'https://pendo.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pendo/jobs', enabled: true, priority: 2 },
    { name: 'Bandwidth', slug: 'bandwidth', source: JobSource.GREENHOUSE, careersUrl: 'https://bandwidth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bandwidth/jobs', enabled: true, priority: 2 },
    { name: 'Epic Games', slug: 'epicgames', source: JobSource.GREENHOUSE, careersUrl: 'https://epicgames.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/epicgames/jobs', enabled: true, priority: 2 },
    { name: 'CData Software', slug: 'cdata', source: JobSource.GREENHOUSE, careersUrl: 'https://cdata.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cdata/jobs', enabled: true, priority: 2 },
    { name: 'Pryon', slug: 'pryon', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/pryon', apiEndpoint: 'https://api.lever.co/v0/postings/pryon?mode=json', enabled: true, priority: 2 },
    { name: 'JupiterOne', slug: 'jupiterone', source: JobSource.GREENHOUSE, careersUrl: 'https://jupiterone.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/jupiterone/jobs', enabled: true, priority: 2 },
    { name: 'Levitate', slug: 'levitate', source: JobSource.GREENHOUSE, careersUrl: 'https://levitate.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/levitate/jobs', enabled: true, priority: 2 },
    { name: 'Allscripts', slug: 'allscripts', source: JobSource.WORKDAY, careersUrl: 'https://allscripts.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Zaloni', slug: 'zaloni', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/zaloni', apiEndpoint: 'https://api.lever.co/v0/postings/zaloni?mode=json', enabled: true, priority: 2 },
    { name: 'AppViewX', slug: 'appviewx', source: JobSource.GREENHOUSE, careersUrl: 'https://appviewx.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/appviewx/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // CALIFORNIA IT COMPANIES (San Francisco, Silicon Valley, Bay Area)
    // ============================================================================
    { name: 'Twilio', slug: 'twilio', source: JobSource.GREENHOUSE, careersUrl: 'https://twilio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/twilio/jobs', enabled: true, priority: 2 },
    { name: 'Zoom', slug: 'zoom', source: JobSource.WORKDAY, careersUrl: 'https://zoom.wd5.myworkdayjobs.com/Zoom', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'DocuSign', slug: 'docusign', source: JobSource.GREENHOUSE, careersUrl: 'https://docusign.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/docusign/jobs', enabled: true, priority: 2 },
    { name: 'PagerDuty', slug: 'pagerduty', source: JobSource.GREENHOUSE, careersUrl: 'https://pagerduty.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pagerduty/jobs', enabled: true, priority: 2 },
    { name: 'Brex', slug: 'brex', source: JobSource.GREENHOUSE, careersUrl: 'https://brex.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/brex/jobs', enabled: true, priority: 2 },
    { name: 'Deel', slug: 'deel', source: JobSource.GREENHOUSE, careersUrl: 'https://deel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/deel/jobs', enabled: true, priority: 2 },
    { name: 'Harvey AI', slug: 'harvey', source: JobSource.GREENHOUSE, careersUrl: 'https://harvey.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/harvey/jobs', enabled: true, priority: 2 },
    { name: 'Figure AI', slug: 'figureai', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/figureai', apiEndpoint: 'https://api.lever.co/v0/postings/figureai?mode=json', enabled: true, priority: 2 },
    { name: 'HomeLight', slug: 'homelight', source: JobSource.GREENHOUSE, careersUrl: 'https://homelight.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/homelight/jobs', enabled: true, priority: 2 },
    { name: 'Sendbird', slug: 'sendbird', source: JobSource.GREENHOUSE, careersUrl: 'https://sendbird.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sendbird/jobs', enabled: true, priority: 2 },
    { name: 'Snapdocs', slug: 'snapdocs', source: JobSource.GREENHOUSE, careersUrl: 'https://snapdocs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snapdocs/jobs', enabled: true, priority: 2 },
    { name: 'Truffle Security', slug: 'truffleSecurity', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/trufflesecurity', apiEndpoint: 'https://api.lever.co/v0/postings/trufflesecurity?mode=json', enabled: true, priority: 2 },
    { name: 'Textio', slug: 'textio', source: JobSource.GREENHOUSE, careersUrl: 'https://textio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/textio/jobs', enabled: true, priority: 2 },
    { name: 'Cisco Systems', slug: 'cisco', source: JobSource.WORKDAY, careersUrl: 'https://cisco.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Workday', slug: 'workday', source: JobSource.WORKDAY, careersUrl: 'https://workday.wd5.myworkdayjobs.com/Workday', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Pinterest', slug: 'pinterest', source: JobSource.GREENHOUSE, careersUrl: 'https://pinterest.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pinterest/jobs', enabled: true, priority: 2 },
    { name: 'Instacart', slug: 'instacart', source: JobSource.GREENHOUSE, careersUrl: 'https://instacart.careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/instacart/jobs', enabled: true, priority: 2 },
    { name: 'Box', slug: 'box', source: JobSource.GREENHOUSE, careersUrl: 'https://box.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/box/jobs', enabled: true, priority: 2 },
    { name: 'Splunk', slug: 'splunk', source: JobSource.WORKDAY, careersUrl: 'https://splunk.wd1.myworkdayjobs.com/Splunk', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Slack', slug: 'slack', source: JobSource.GREENHOUSE, careersUrl: 'https://slack.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/slack/jobs', enabled: true, priority: 2 },
    { name: 'Rubrik', slug: 'rubrik', source: JobSource.GREENHOUSE, careersUrl: 'https://rubrik.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rubrik/jobs', enabled: true, priority: 2 },
    { name: 'SentinelOne', slug: 'sentinelone', source: JobSource.GREENHOUSE, careersUrl: 'https://sentinelone.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sentinelone/jobs', enabled: true, priority: 2 },
    { name: 'CrowdStrike', slug: 'crowdstrike', source: JobSource.GREENHOUSE, careersUrl: 'https://crowdstrike.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/crowdstrike/jobs', enabled: true, priority: 2 },
    { name: 'Palantir', slug: 'palantir', source: JobSource.GREENHOUSE, careersUrl: 'https://palantir.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/palantir/jobs', enabled: true, priority: 2 },
    { name: 'Notion', slug: 'notion', source: JobSource.GREENHOUSE, careersUrl: 'https://notion.so/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/notion/jobs', enabled: true, priority: 2 },
    { name: 'Airtable', slug: 'airtable', source: JobSource.GREENHOUSE, careersUrl: 'https://airtable.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/airtable/jobs', enabled: true, priority: 2 },
    { name: 'Asana', slug: 'asana', source: JobSource.GREENHOUSE, careersUrl: 'https://asana.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/asana/jobs', enabled: true, priority: 2 },
    { name: 'Webflow', slug: 'webflow', source: JobSource.GREENHOUSE, careersUrl: 'https://webflow.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/webflow/jobs', enabled: true, priority: 2 },
    { name: 'Confluent', slug: 'confluent', source: JobSource.GREENHOUSE, careersUrl: 'https://confluent.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/confluent/jobs', enabled: true, priority: 2 },
    { name: 'HashiCorp', slug: 'hashicorp', source: JobSource.GREENHOUSE, careersUrl: 'https://hashicorp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hashicorp/jobs', enabled: true, priority: 2 },
    { name: 'Snowflake', slug: 'snowflake', source: JobSource.GREENHOUSE, careersUrl: 'https://snowflake.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snowflake/jobs', enabled: true, priority: 2 },
    { name: 'Databricks', slug: 'databricks', source: JobSource.GREENHOUSE, careersUrl: 'https://databricks.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/databricks/jobs', enabled: true, priority: 2 },
    { name: 'MongoDB', slug: 'mongodb', source: JobSource.GREENHOUSE, careersUrl: 'https://mongodb.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mongodb/jobs', enabled: true, priority: 2 },
    { name: 'GitLab', slug: 'gitlab', source: JobSource.GREENHOUSE, careersUrl: 'https://gitlab.com/jobs', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gitlab/jobs', enabled: true, priority: 2 },
    { name: 'Figma', slug: 'figma', source: JobSource.GREENHOUSE, careersUrl: 'https://figma.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/figma/jobs', enabled: true, priority: 2 },
    { name: 'Retool', slug: 'retool', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/retool', apiEndpoint: 'https://api.lever.co/v0/postings/retool?mode=json', enabled: true, priority: 2 },
    { name: 'Linear', slug: 'linear', source: JobSource.GREENHOUSE, careersUrl: 'https://linear.app/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/linear/jobs', enabled: true, priority: 2 },
    { name: 'Vercel', slug: 'vercel', source: JobSource.GREENHOUSE, careersUrl: 'https://vercel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vercel/jobs', enabled: true, priority: 2 },
    { name: 'Supabase', slug: 'supabase', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/supabase', apiEndpoint: 'https://api.lever.co/v0/postings/supabase?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // CALIFORNIA IT COMPANIES (Los Angeles, San Diego)
    // ============================================================================
    { name: 'Block', slug: 'block', source: JobSource.GREENHOUSE, careersUrl: 'https://block.xyz/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/block/jobs', enabled: true, priority: 2 },
    { name: 'Qualcomm', slug: 'qualcomm', source: JobSource.WORKDAY, careersUrl: 'https://qualcomm.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Hulu', slug: 'hulu', source: JobSource.GREENHOUSE, careersUrl: 'https://hulu.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hulu/jobs', enabled: true, priority: 2 },
    { name: 'Snap LA', slug: 'snap-la', source: JobSource.GREENHOUSE, careersUrl: 'https://snap.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snap/jobs', enabled: true, priority: 2 },
    { name: 'Riot Games', slug: 'riotgames', source: JobSource.GREENHOUSE, careersUrl: 'https://riotgames.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/riotgames/jobs', enabled: true, priority: 2 },
    { name: 'SpaceX', slug: 'spacex', source: JobSource.GREENHOUSE, careersUrl: 'https://spacex.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/spacex/jobs', enabled: true, priority: 2 },
    { name: 'Bird', slug: 'bird', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/bird', apiEndpoint: 'https://api.lever.co/v0/postings/bird?mode=json', enabled: true, priority: 2 },
    { name: 'Beyond Meat', slug: 'beyondmeat', source: JobSource.GREENHOUSE, careersUrl: 'https://beyondmeat.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/beyondmeat/jobs', enabled: true, priority: 2 },
    { name: 'TikTok', slug: 'tiktok', source: JobSource.GREENHOUSE, careersUrl: 'https://careers.tiktok.com', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tiktok/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // ARIZONA IT COMPANIES (Phoenix, Scottsdale, Chandler)
    // ============================================================================
    { name: 'GoDaddy', slug: 'godaddy', source: JobSource.WORKDAY, careersUrl: 'https://godaddy.wd1.myworkdayjobs.com/GoDaddyCareers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Insight Enterprises', slug: 'insight', source: JobSource.WORKDAY, careersUrl: 'https://insight.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Axon', slug: 'axon', source: JobSource.GREENHOUSE, careersUrl: 'https://axon.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/axon/jobs', enabled: true, priority: 2 },
    { name: 'Carvana', slug: 'carvana', source: JobSource.GREENHOUSE, careersUrl: 'https://carvana.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/carvana/jobs', enabled: true, priority: 2 },
    { name: 'Gen Digital', slug: 'gendigital', source: JobSource.WORKDAY, careersUrl: 'https://gendigital.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'WebPT', slug: 'webpt', source: JobSource.GREENHOUSE, careersUrl: 'https://webpt.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/webpt/jobs', enabled: true, priority: 2 },
    { name: 'Microchip Technology', slug: 'microchip', source: JobSource.WORKDAY, careersUrl: 'https://microchip.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Yardi Systems', slug: 'yardi', source: JobSource.WORKDAY, careersUrl: 'https://yardi.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Avnet', slug: 'avnet', source: JobSource.WORKDAY, careersUrl: 'https://avnet.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Tyler Technologies', slug: 'tylertech', source: JobSource.WORKDAY, careersUrl: 'https://tylertech.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Inovalon', slug: 'inovalon', source: JobSource.GREENHOUSE, careersUrl: 'https://inovalon.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/inovalon/jobs', enabled: true, priority: 2 },
    { name: 'KUBRA', slug: 'kubra', source: JobSource.GREENHOUSE, careersUrl: 'https://kubra.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kubra/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // FLORIDA IT COMPANIES (Miami, Tampa, Orlando, Jacksonville)
    // ============================================================================
    { name: 'KnowBe4', slug: 'knowbe4', source: JobSource.GREENHOUSE, careersUrl: 'https://knowbe4.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/knowbe4/jobs', enabled: true, priority: 2 },
    { name: 'ReliaQuest', slug: 'reliaquest', source: JobSource.GREENHOUSE, careersUrl: 'https://reliaquest.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/reliaquest/jobs', enabled: true, priority: 2 },
    { name: 'ConnectWise', slug: 'connectwise', source: JobSource.GREENHOUSE, careersUrl: 'https://connectwise.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/connectwise/jobs', enabled: true, priority: 2 },
    { name: 'PowerDMS', slug: 'powerdms', source: JobSource.GREENHOUSE, careersUrl: 'https://powerdms.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/powerdms/jobs', enabled: true, priority: 2 },
    { name: 'FIS Global', slug: 'fisglobal', source: JobSource.WORKDAY, careersUrl: 'https://fis.wd1.myworkdayjobs.com/FISCareers', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Electronic Arts Orlando', slug: 'ea-orlando', source: JobSource.GREENHOUSE, careersUrl: 'https://ea.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ea/jobs', enabled: true, priority: 2 },
    { name: 'Redwire', slug: 'redwire', source: JobSource.GREENHOUSE, careersUrl: 'https://redwirespace.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/redwire/jobs', enabled: true, priority: 2 },
    { name: 'Vultr', slug: 'vultr', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/vultr', apiEndpoint: 'https://api.lever.co/v0/postings/vultr?mode=json', enabled: true, priority: 2 },
    { name: 'Luminor Technologies', slug: 'luminor', source: JobSource.GREENHOUSE, careersUrl: 'https://luminortechnologies.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/luminor/jobs', enabled: true, priority: 2 },
    { name: 'Chetu', slug: 'chetu', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/chetu', apiEndpoint: 'https://api.lever.co/v0/postings/chetu?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // UTAH IT COMPANIES (Salt Lake City, Provo, Lehi - Silicon Slopes)
    // ============================================================================
    { name: 'Qualtrics', slug: 'qualtrics', source: JobSource.GREENHOUSE, careersUrl: 'https://qualtrics.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/qualtrics/jobs', enabled: true, priority: 2 },
    { name: 'Podium', slug: 'podium', source: JobSource.GREENHOUSE, careersUrl: 'https://podium.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/podium/jobs', enabled: true, priority: 2 },
    { name: 'Pluralsight', slug: 'pluralsight', source: JobSource.GREENHOUSE, careersUrl: 'https://pluralsight.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pluralsight/jobs', enabled: true, priority: 2 },
    { name: 'Instructure', slug: 'instructure', source: JobSource.GREENHOUSE, careersUrl: 'https://instructure.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/instructure/jobs', enabled: true, priority: 2 },
    { name: 'Lucid Software', slug: 'lucidsoftware', source: JobSource.GREENHOUSE, careersUrl: 'https://lucid.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lucidsoftware/jobs', enabled: true, priority: 2 },
    { name: 'Entrata', slug: 'entrata', source: JobSource.GREENHOUSE, careersUrl: 'https://entrata.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/entrata/jobs', enabled: true, priority: 2 },
    { name: 'Weave', slug: 'weave', source: JobSource.GREENHOUSE, careersUrl: 'https://weave.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/weave/jobs', enabled: true, priority: 2 },
    { name: 'Divvy', slug: 'divvy', source: JobSource.GREENHOUSE, careersUrl: 'https://divvy.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/divvy/jobs', enabled: true, priority: 2 },
    { name: 'MX', slug: 'mx', source: JobSource.GREENHOUSE, careersUrl: 'https://mx.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mx/jobs', enabled: true, priority: 2 },
    { name: 'DigiCert', slug: 'digicert', source: JobSource.GREENHOUSE, careersUrl: 'https://digicert.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/digicert/jobs', enabled: true, priority: 2 },
    { name: 'Jolt', slug: 'jolt', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/jolt', apiEndpoint: 'https://api.lever.co/v0/postings/jolt?mode=json', enabled: true, priority: 2 },
    { name: 'Ancestry', slug: 'ancestry', source: JobSource.WORKDAY, careersUrl: 'https://ancestry.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'RainFocus', slug: 'rainfocus', source: JobSource.GREENHOUSE, careersUrl: 'https://rainfocus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rainfocus/jobs', enabled: true, priority: 2 },
    { name: 'Pattern', slug: 'pattern', source: JobSource.GREENHOUSE, careersUrl: 'https://pattern.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pattern/jobs', enabled: true, priority: 2 },
    { name: 'Solutionreach', slug: 'solutionreach', source: JobSource.GREENHOUSE, careersUrl: 'https://solutionreach.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/solutionreach/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // MINNESOTA IT COMPANIES (Minneapolis, St. Paul)
    // ============================================================================
    { name: 'Jamf', slug: 'jamf', source: JobSource.GREENHOUSE, careersUrl: 'https://jamf.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/jamf/jobs', enabled: true, priority: 2 },
    { name: 'Arctic Wolf', slug: 'arcticwolf', source: JobSource.GREENHOUSE, careersUrl: 'https://arcticwolf.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/arcticwolf/jobs', enabled: true, priority: 2 },
    { name: 'NetSPI', slug: 'netspi', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/netspi', apiEndpoint: 'https://api.lever.co/v0/postings/netspi?mode=json', enabled: true, priority: 2 },
    { name: 'SPS Commerce', slug: 'spscommerce', source: JobSource.GREENHOUSE, careersUrl: 'https://spscommerce.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/spscommerce/jobs', enabled: true, priority: 2 },
    { name: 'Digital River', slug: 'digitalriver', source: JobSource.GREENHOUSE, careersUrl: 'https://digitalriver.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/digitalriver/jobs', enabled: true, priority: 2 },
    { name: 'Fortra', slug: 'fortra', source: JobSource.GREENHOUSE, careersUrl: 'https://fortra.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fortra/jobs', enabled: true, priority: 2 },
    { name: 'Calabrio', slug: 'calabrio', source: JobSource.GREENHOUSE, careersUrl: 'https://calabrio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/calabrio/jobs', enabled: true, priority: 2 },
    { name: 'Code 42', slug: 'code42', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/code42', apiEndpoint: 'https://api.lever.co/v0/postings/code42?mode=json', enabled: true, priority: 2 },
    { name: 'Drip', slug: 'drip', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/drip', apiEndpoint: 'https://api.lever.co/v0/postings/drip?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // MICHIGAN IT COMPANIES (Detroit, Ann Arbor, Grand Rapids)
    // ============================================================================
    { name: 'Detroit Labs', slug: 'detroitlabs', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/detroitlabs', apiEndpoint: 'https://api.lever.co/v0/postings/detroitlabs?mode=json', enabled: true, priority: 2 },
    { name: 'Waymark', slug: 'waymark', source: JobSource.GREENHOUSE, careersUrl: 'https://waymark.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/waymark/jobs', enabled: true, priority: 2 },
    { name: 'Signal Advisors', slug: 'signaladvisors', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/signaladvisors', apiEndpoint: 'https://api.lever.co/v0/postings/signaladvisors?mode=json', enabled: true, priority: 2 },
    { name: 'Kode Labs', slug: 'kodelabs', source: JobSource.GREENHOUSE, careersUrl: 'https://kodelabs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kodelabs/jobs', enabled: true, priority: 2 },
    { name: 'Autobooks', slug: 'autobooks', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/autobooks', apiEndpoint: 'https://api.lever.co/v0/postings/autobooks?mode=json', enabled: true, priority: 2 },
    { name: 'Altair Engineering', slug: 'altair', source: JobSource.WORKDAY, careersUrl: 'https://altair.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Atomic Object', slug: 'atomicobject', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/atomicobject', apiEndpoint: 'https://api.lever.co/v0/postings/atomicobject?mode=json', enabled: true, priority: 2 },
    { name: 'Rivet Work', slug: 'rivetwork', source: JobSource.GREENHOUSE, careersUrl: 'https://rivetwork.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rivetwork/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // OHIO IT COMPANIES (Columbus, Cleveland, Cincinnati)
    // ============================================================================
    { name: 'Path Robotics', slug: 'pathrobotics', source: JobSource.GREENHOUSE, careersUrl: 'https://pathrobotics.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pathrobotics/jobs', enabled: true, priority: 2 },
    { name: 'Seamless.AI', slug: 'seamlessai', source: JobSource.GREENHOUSE, careersUrl: 'https://seamless.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/seamlessai/jobs', enabled: true, priority: 2 },
    { name: 'Root Insurance', slug: 'rootinsurance', source: JobSource.GREENHOUSE, careersUrl: 'https://joinroot.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/root/jobs', enabled: true, priority: 2 },
    { name: 'Beam Benefits', slug: 'beambenefits', source: JobSource.GREENHOUSE, careersUrl: 'https://beam.dental/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/beam/jobs', enabled: true, priority: 2 },
    { name: 'CoverMyMeds', slug: 'covermymeds', source: JobSource.GREENHOUSE, careersUrl: 'https://covermymeds.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/covermymeds/jobs', enabled: true, priority: 2 },
    { name: 'Upstart', slug: 'upstart', source: JobSource.GREENHOUSE, careersUrl: 'https://upstart.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/upstart/jobs', enabled: true, priority: 2 },
    { name: 'MentorcliQ', slug: 'mentorcliq', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/mentorcliq', apiEndpoint: 'https://api.lever.co/v0/postings/mentorcliq?mode=json', enabled: true, priority: 2 },
    { name: 'Paycor', slug: 'paycor', source: JobSource.GREENHOUSE, careersUrl: 'https://paycor.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/paycor/jobs', enabled: true, priority: 2 },
    { name: 'MRI Software', slug: 'mrisoftware', source: JobSource.GREENHOUSE, careersUrl: 'https://mrisoftware.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mrisoftware/jobs', enabled: true, priority: 2 },
    { name: 'BoxCast', slug: 'boxcast', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/boxcast', apiEndpoint: 'https://api.lever.co/v0/postings/boxcast?mode=json', enabled: true, priority: 2 },
    { name: 'Astronomer', slug: 'astronomer', source: JobSource.GREENHOUSE, careersUrl: 'https://astronomer.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/astronomer/jobs', enabled: true, priority: 2 },
    { name: 'Veeva Systems', slug: 'veeva', source: JobSource.WORKDAY, careersUrl: 'https://veeva.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // ============================================================================
    // PENNSYLVANIA IT COMPANIES (Pittsburgh, Philadelphia)
    // ============================================================================
    { name: 'Duolingo', slug: 'duolingo', source: JobSource.GREENHOUSE, careersUrl: 'https://duolingo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/duolingo/jobs', enabled: true, priority: 2 },
    { name: 'ANSYS', slug: 'ansys', source: JobSource.WORKDAY, careersUrl: 'https://ansys.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Crossbeam', slug: 'crossbeam', source: JobSource.GREENHOUSE, careersUrl: 'https://crossbeam.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/crossbeam/jobs', enabled: true, priority: 2 },
    { name: 'ZeroEyes', slug: 'zeroeyes', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/zeroeyes', apiEndpoint: 'https://api.lever.co/v0/postings/zeroeyes?mode=json', enabled: true, priority: 2 },
    { name: 'dbt Labs', slug: 'dbtlabs', source: JobSource.GREENHOUSE, careersUrl: 'https://dbt.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dbt/jobs', enabled: true, priority: 2 },
    { name: 'Abridge', slug: 'abridge', source: JobSource.GREENHOUSE, careersUrl: 'https://abridge.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/abridge/jobs', enabled: true, priority: 2 },
    { name: 'Bentley Systems', slug: 'bentley', source: JobSource.WORKDAY, careersUrl: 'https://bentley.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'BlockSpan', slug: 'blockspan', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/blockspan', apiEndpoint: 'https://api.lever.co/v0/postings/blockspan?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // NEW JERSEY IT COMPANIES (Princeton, Newark)
    // ============================================================================
    { name: 'Audible', slug: 'audible', source: JobSource.GREENHOUSE, careersUrl: 'https://audible.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/audible/jobs', enabled: true, priority: 2 },
    { name: 'CoreWeave', slug: 'coreweave', source: JobSource.GREENHOUSE, careersUrl: 'https://coreweave.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/coreweave/jobs', enabled: true, priority: 2 },
    { name: 'Semperis', slug: 'semperis', source: JobSource.GREENHOUSE, careersUrl: 'https://semperis.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/semperis/jobs', enabled: true, priority: 2 },
    { name: 'Cyware', slug: 'cyware', source: JobSource.GREENHOUSE, careersUrl: 'https://cyware.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cyware/jobs', enabled: true, priority: 2 },
    { name: 'Zycus', slug: 'zycus', source: JobSource.GREENHOUSE, careersUrl: 'https://zycus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zycus/jobs', enabled: true, priority: 2 },
    { name: 'OpenLegacy', slug: 'openlegacy', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/openlegacy', apiEndpoint: 'https://api.lever.co/v0/postings/openlegacy?mode=json', enabled: true, priority: 2 },
    { name: 'Fulcrum Digital', slug: 'fulcrumdigital', source: JobSource.GREENHOUSE, careersUrl: 'https://fulcrumdigital.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fulcrumdigital/jobs', enabled: true, priority: 2 },
    { name: 'Vydia', slug: 'vydia', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/vydia', apiEndpoint: 'https://api.lever.co/v0/postings/vydia?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // VIRGINIA IT COMPANIES (Northern Virginia, Arlington, Richmond)
    // ============================================================================
    { name: 'Booz Allen Hamilton', slug: 'boozallen', source: JobSource.WORKDAY, careersUrl: 'https://boozallen.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'ManTech', slug: 'mantech', source: JobSource.WORKDAY, careersUrl: 'https://mantech.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Evolent Health', slug: 'evolenthealth', source: JobSource.GREENHOUSE, careersUrl: 'https://evolenthealth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/evolenthealth/jobs', enabled: true, priority: 2 },
    { name: 'MarginEdge', slug: 'marginedge', source: JobSource.GREENHOUSE, careersUrl: 'https://marginedge.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/marginedge/jobs', enabled: true, priority: 2 },
    { name: 'Urgently', slug: 'urgently', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/urgently', apiEndpoint: 'https://api.lever.co/v0/postings/urgently?mode=json', enabled: true, priority: 2 },
    { name: 'CoStar Group', slug: 'costargroup', source: JobSource.WORKDAY, careersUrl: 'https://costargroup.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'CapTech Consulting', slug: 'captech', source: JobSource.GREENHOUSE, careersUrl: 'https://captechconsulting.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/captech/jobs', enabled: true, priority: 2 },
    { name: 'Dominion Energy', slug: 'dominionenergy', source: JobSource.WORKDAY, careersUrl: 'https://dominionenergy.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // ============================================================================
    // OREGON IT COMPANIES (Portland)
    // ============================================================================
    { name: 'Jama Software', slug: 'jamasoftware', source: JobSource.GREENHOUSE, careersUrl: 'https://jamasoftware.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/jamasoftware/jobs', enabled: true, priority: 2 },
    { name: 'Act-On Software', slug: 'actonsoftware', source: JobSource.GREENHOUSE, careersUrl: 'https://act-on.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/acton/jobs', enabled: true, priority: 2 },
    { name: 'Dutchie', slug: 'dutchie', source: JobSource.GREENHOUSE, careersUrl: 'https://dutchie.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dutchie/jobs', enabled: true, priority: 2 },
    { name: 'Hydrolix', slug: 'hydrolix', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/hydrolix', apiEndpoint: 'https://api.lever.co/v0/postings/hydrolix?mode=json', enabled: true, priority: 2 },
    { name: 'Eclypsium', slug: 'eclypsium', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/eclypsium', apiEndpoint: 'https://api.lever.co/v0/postings/eclypsium?mode=json', enabled: true, priority: 2 },
    { name: 'ConductorOne', slug: 'conductorone', source: JobSource.GREENHOUSE, careersUrl: 'https://conductorone.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/conductorone/jobs', enabled: true, priority: 2 },
    { name: 'Reclaim.ai', slug: 'reclaimai', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/reclaim', apiEndpoint: 'https://api.lever.co/v0/postings/reclaim?mode=json', enabled: true, priority: 2 },
    { name: 'Upbound', slug: 'upbound', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/upbound', apiEndpoint: 'https://api.lever.co/v0/postings/upbound?mode=json', enabled: true, priority: 2 },
    { name: 'Customer.io', slug: 'customerio', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/customerio', apiEndpoint: 'https://api.lever.co/v0/postings/customerio?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // MARYLAND IT COMPANIES (Baltimore, Bethesda)
    // ============================================================================
    { name: 'Lockheed Martin', slug: 'lockheedmartin', source: JobSource.WORKDAY, careersUrl: 'https://lockheedmartin.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Fearless', slug: 'fearless', source: JobSource.GREENHOUSE, careersUrl: 'https://fearless.tech/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fearless/jobs', enabled: true, priority: 2 },
    { name: 'Mindgrub Technologies', slug: 'mindgrub', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/mindgrub', apiEndpoint: 'https://api.lever.co/v0/postings/mindgrub?mode=json', enabled: true, priority: 2 },
    { name: 'SmartLogic', slug: 'smartlogic', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/smartlogic', apiEndpoint: 'https://api.lever.co/v0/postings/smartlogic?mode=json', enabled: true, priority: 2 },
    { name: 'Bethesda Softworks', slug: 'bethesda', source: JobSource.GREENHOUSE, careersUrl: 'https://bethesda.net/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bethesdasoftworks/jobs', enabled: true, priority: 2 },
    { name: 'Flywheel', slug: 'flywheel', source: JobSource.GREENHOUSE, careersUrl: 'https://getflywheel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/flywheel/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // TENNESSEE IT COMPANIES (Nashville)
    // ============================================================================
    { name: 'Zeta Global', slug: 'zetaglobal', source: JobSource.GREENHOUSE, careersUrl: 'https://zetaglobal.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zetaglobal/jobs', enabled: true, priority: 2 },
    { name: 'Core10', slug: 'core10', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/core10', apiEndpoint: 'https://api.lever.co/v0/postings/core10?mode=json', enabled: true, priority: 2 },
    { name: 'Qualifacts', slug: 'qualifacts', source: JobSource.GREENHOUSE, careersUrl: 'https://qualifacts.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/qualifacts/jobs', enabled: true, priority: 2 },
    { name: 'TechnologyAdvice', slug: 'technologyadvice', source: JobSource.GREENHOUSE, careersUrl: 'https://technologyadvice.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/technologyadvice/jobs', enabled: true, priority: 2 },
    { name: 'symplr', slug: 'symplr', source: JobSource.GREENHOUSE, careersUrl: 'https://symplr.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/symplr/jobs', enabled: true, priority: 2 },
    { name: 'ProviderTrust', slug: 'providertrust', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/providertrust', apiEndpoint: 'https://api.lever.co/v0/postings/providertrust?mode=json', enabled: true, priority: 2 },
    { name: 'Wellvana', slug: 'wellvana', source: JobSource.GREENHOUSE, careersUrl: 'https://wellvana.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/wellvana/jobs', enabled: true, priority: 2 },
    { name: 'Toast TN', slug: 'toast-tn', source: JobSource.GREENHOUSE, careersUrl: 'https://toast.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/toast/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // NEVADA IT COMPANIES (Las Vegas, Reno)
    // ============================================================================
    { name: 'Switch', slug: 'switch', source: JobSource.GREENHOUSE, careersUrl: 'https://switch.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/switch/jobs', enabled: true, priority: 2 },
    { name: 'Zappos', slug: 'zappos', source: JobSource.GREENHOUSE, careersUrl: 'https://zappos.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zappos/jobs', enabled: true, priority: 2 },
    { name: 'Aristocrat Technologies', slug: 'aristocrat', source: JobSource.WORKDAY, careersUrl: 'https://aristocrat.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Light and Wonder', slug: 'lightandwonder', source: JobSource.WORKDAY, careersUrl: 'https://lightandwonder.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Rimini Street', slug: 'riministreet', source: JobSource.GREENHOUSE, careersUrl: 'https://riministreet.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/riministreet/jobs', enabled: true, priority: 2 },
    { name: 'Ormat Technologies', slug: 'ormat', source: JobSource.GREENHOUSE, careersUrl: 'https://ormat.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ormat/jobs', enabled: true, priority: 2 },
    { name: 'Sunbit', slug: 'sunbit', source: JobSource.GREENHOUSE, careersUrl: 'https://sunbit.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sunbit/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // INDIANA IT COMPANIES (Indianapolis)
    // ============================================================================
    { name: 'Genesys', slug: 'genesys', source: JobSource.GREENHOUSE, careersUrl: 'https://genesys.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/genesys/jobs', enabled: true, priority: 2 },
    { name: 'High Alpha', slug: 'highalpha', source: JobSource.GREENHOUSE, careersUrl: 'https://highalpha.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/highalpha/jobs', enabled: true, priority: 2 },
    { name: 'Formstack', slug: 'formstack', source: JobSource.GREENHOUSE, careersUrl: 'https://formstack.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/formstack/jobs', enabled: true, priority: 2 },
    { name: 'Springbuk', slug: 'springbuk', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/springbuk', apiEndpoint: 'https://api.lever.co/v0/postings/springbuk?mode=json', enabled: true, priority: 2 },
    { name: 'Zylo', slug: 'zylo', source: JobSource.GREENHOUSE, careersUrl: 'https://zylo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zylo/jobs', enabled: true, priority: 2 },
    { name: 'Greenlight Guru', slug: 'greenlightguru', source: JobSource.GREENHOUSE, careersUrl: 'https://greenlightguru.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/greenlightguru/jobs', enabled: true, priority: 2 },
    { name: 'Bloomerang', slug: 'bloomerang', source: JobSource.GREENHOUSE, careersUrl: 'https://bloomerang.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bloomerang/jobs', enabled: true, priority: 2 },
    { name: 'Scale Computing', slug: 'scalecomputing', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/scalecomputing', apiEndpoint: 'https://api.lever.co/v0/postings/scalecomputing?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // CONNECTICUT IT COMPANIES (Hartford, Stamford)
    // ============================================================================
    { name: 'Gartner', slug: 'gartner', source: JobSource.WORKDAY, careersUrl: 'https://gartner.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'KAYAK', slug: 'kayak', source: JobSource.GREENHOUSE, careersUrl: 'https://kayak.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kayak/jobs', enabled: true, priority: 2 },
    { name: 'Synchrony', slug: 'synchrony', source: JobSource.WORKDAY, careersUrl: 'https://synchrony.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Booking Holdings', slug: 'bookingholdings', source: JobSource.GREENHOUSE, careersUrl: 'https://bookingholdings.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bookingholdings/jobs', enabled: true, priority: 2 },
    { name: 'Datto', slug: 'datto', source: JobSource.GREENHOUSE, careersUrl: 'https://datto.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/datto/jobs', enabled: true, priority: 2 },
    { name: 'Insurity', slug: 'insurity', source: JobSource.GREENHOUSE, careersUrl: 'https://insurity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/insurity/jobs', enabled: true, priority: 2 },
    { name: 'HARMAN International', slug: 'harman', source: JobSource.WORKDAY, careersUrl: 'https://harman.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // ============================================================================
    // MISSOURI IT COMPANIES (St. Louis, Kansas City)
    // ============================================================================
    { name: 'World Wide Technology', slug: 'wwt', source: JobSource.WORKDAY, careersUrl: 'https://wwt.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Cerner Corporation', slug: 'cerner', source: JobSource.WORKDAY, careersUrl: 'https://oracle.wd1.myworkdayjobs.com/Cerner', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Garmin', slug: 'garmin', source: JobSource.WORKDAY, careersUrl: 'https://garmin.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'VML', slug: 'vml', source: JobSource.GREENHOUSE, careersUrl: 'https://vml.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vml/jobs', enabled: true, priority: 2 },
    { name: 'PayIt', slug: 'payit', source: JobSource.GREENHOUSE, careersUrl: 'https://payit.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/payit/jobs', enabled: true, priority: 2 },
    { name: 'Brightergy', slug: 'brightergy', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/brightergy', apiEndpoint: 'https://api.lever.co/v0/postings/brightergy?mode=json', enabled: true, priority: 2 },
    { name: 'FanThreeSixty', slug: 'fanthreesixty', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/fanthreesixty', apiEndpoint: 'https://api.lever.co/v0/postings/fanthreesixty?mode=json', enabled: true, priority: 2 },
    { name: 'Object Computing', slug: 'objectcomputing', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/objectcomputing', apiEndpoint: 'https://api.lever.co/v0/postings/objectcomputing?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // MORE CALIFORNIA & ADDITIONAL MAJOR COMPANIES
    // ============================================================================
    { name: 'Scale AI', slug: 'scaleai', source: JobSource.GREENHOUSE, careersUrl: 'https://scale.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/scale/jobs', enabled: true, priority: 2 },
    { name: 'Verkada', slug: 'verkada', source: JobSource.GREENHOUSE, careersUrl: 'https://verkada.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/verkada/jobs', enabled: true, priority: 2 },
    { name: 'Anduril', slug: 'anduril', source: JobSource.GREENHOUSE, careersUrl: 'https://anduril.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/anduril/jobs', enabled: true, priority: 2 },
    { name: 'Flexport', slug: 'flexport', source: JobSource.GREENHOUSE, careersUrl: 'https://flexport.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/flexport/jobs', enabled: true, priority: 2 },
    { name: 'Discord', slug: 'discord', source: JobSource.GREENHOUSE, careersUrl: 'https://discord.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/discord/jobs', enabled: true, priority: 2 },
    { name: 'Mercury', slug: 'mercury', source: JobSource.GREENHOUSE, careersUrl: 'https://mercury.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mercury/jobs', enabled: true, priority: 2 },
    { name: 'Gusto', slug: 'gusto', source: JobSource.GREENHOUSE, careersUrl: 'https://gusto.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gusto/jobs', enabled: true, priority: 2 },
    { name: 'Chime', slug: 'chime', source: JobSource.GREENHOUSE, careersUrl: 'https://chime.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/chime/jobs', enabled: true, priority: 2 },
    { name: 'Navan', slug: 'navan', source: JobSource.GREENHOUSE, careersUrl: 'https://navan.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/navan/jobs', enabled: true, priority: 2 },
    { name: 'Waymo', slug: 'waymo', source: JobSource.GREENHOUSE, careersUrl: 'https://waymo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/waymo/jobs', enabled: true, priority: 2 },
    { name: 'Loom', slug: 'loom', source: JobSource.GREENHOUSE, careersUrl: 'https://loom.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/loom/jobs', enabled: true, priority: 2 },
    { name: 'Miro', slug: 'miro', source: JobSource.GREENHOUSE, careersUrl: 'https://miro.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/miro/jobs', enabled: true, priority: 2 },
    { name: 'Carta', slug: 'carta', source: JobSource.GREENHOUSE, careersUrl: 'https://carta.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/carta/jobs', enabled: true, priority: 2 },
    { name: 'AppLovin', slug: 'applovin', source: JobSource.GREENHOUSE, careersUrl: 'https://applovin.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/applovin/jobs', enabled: true, priority: 2 },
    { name: 'Canva', slug: 'canva', source: JobSource.GREENHOUSE, careersUrl: 'https://canva.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/canva/jobs', enabled: true, priority: 2 },
    { name: 'Amplitude', slug: 'amplitude', source: JobSource.GREENHOUSE, careersUrl: 'https://amplitude.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/amplitude/jobs', enabled: true, priority: 2 },
    { name: 'Segment', slug: 'segment', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/segment', apiEndpoint: 'https://api.lever.co/v0/postings/segment?mode=json', enabled: true, priority: 2 },
    { name: 'LaunchDarkly', slug: 'launchdarkly', source: JobSource.GREENHOUSE, careersUrl: 'https://launchdarkly.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/launchdarkly/jobs', enabled: true, priority: 2 },
    { name: 'Mixpanel', slug: 'mixpanel', source: JobSource.GREENHOUSE, careersUrl: 'https://mixpanel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mixpanel/jobs', enabled: true, priority: 2 },
    { name: 'PlanetScale', slug: 'planetscale', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/planetscale', apiEndpoint: 'https://api.lever.co/v0/postings/planetscale?mode=json', enabled: true, priority: 2 },
    { name: 'CircleCI', slug: 'circleci', source: JobSource.GREENHOUSE, careersUrl: 'https://circleci.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/circleci/jobs', enabled: true, priority: 2 },
    { name: 'Cockroach Labs', slug: 'cockroachlabs', source: JobSource.GREENHOUSE, careersUrl: 'https://cockroachlabs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cockroachlabs/jobs', enabled: true, priority: 2 },
    { name: 'SingleStore', slug: 'singlestore', source: JobSource.GREENHOUSE, careersUrl: 'https://singlestore.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/singlestore/jobs', enabled: true, priority: 2 },
    { name: 'Weights and Biases', slug: 'wandb', source: JobSource.GREENHOUSE, careersUrl: 'https://wandb.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/wandb/jobs', enabled: true, priority: 2 },
    { name: 'Cohere', slug: 'cohere', source: JobSource.GREENHOUSE, careersUrl: 'https://cohere.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cohere/jobs', enabled: true, priority: 2 },
    { name: 'Hugging Face', slug: 'huggingface', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/huggingface', apiEndpoint: 'https://api.lever.co/v0/postings/huggingface?mode=json', enabled: true, priority: 2 },
    { name: 'Perplexity', slug: 'perplexity', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/perplexity', apiEndpoint: 'https://api.lever.co/v0/postings/perplexity?mode=json', enabled: true, priority: 2 },
    { name: 'Together AI', slug: 'togetherai', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/togetherai', apiEndpoint: 'https://api.lever.co/v0/postings/togetherai?mode=json', enabled: true, priority: 2 },
    { name: 'Replicate', slug: 'replicate', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/replicate', apiEndpoint: 'https://api.lever.co/v0/postings/replicate?mode=json', enabled: true, priority: 2 },
    { name: 'Modal', slug: 'modal', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/modal', apiEndpoint: 'https://api.lever.co/v0/postings/modal?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // SOUTH CAROLINA IT COMPANIES (Charleston, Greenville)
    // ============================================================================
    { name: 'Blackbaud', slug: 'blackbaud', source: JobSource.WORKDAY, careersUrl: 'https://blackbaud.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Benefitfocus', slug: 'benefitfocus', source: JobSource.GREENHOUSE, careersUrl: 'https://benefitfocus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/benefitfocus/jobs', enabled: true, priority: 2 },
    { name: 'BoomTown', slug: 'boomtown', source: JobSource.GREENHOUSE, careersUrl: 'https://boomtown.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/boomtown/jobs', enabled: true, priority: 2 },
    { name: 'PhishLabs', slug: 'phishlabs', source: JobSource.GREENHOUSE, careersUrl: 'https://phishlabs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/phishlabs/jobs', enabled: true, priority: 2 },
    { name: 'Blue Acorn iCi', slug: 'blueacorn', source: JobSource.GREENHOUSE, careersUrl: 'https://blueacorn.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/blueacorn/jobs', enabled: true, priority: 2 },
    { name: 'SPARC', slug: 'sparc', source: JobSource.GREENHOUSE, careersUrl: 'https://sparc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sparc/jobs', enabled: true, priority: 2 },
    { name: 'ScanSource', slug: 'scansource', source: JobSource.WORKDAY, careersUrl: 'https://scansource.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Designli', slug: 'designli', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/designli', apiEndpoint: 'https://api.lever.co/v0/postings/designli?mode=json', enabled: true, priority: 2 },
    { name: 'Kopis', slug: 'kopis', source: JobSource.GREENHOUSE, careersUrl: 'https://kopis.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kopis/jobs', enabled: true, priority: 2 },
    { name: 'Varigence', slug: 'varigence', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/varigence', apiEndpoint: 'https://api.lever.co/v0/postings/varigence?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // ALABAMA IT COMPANIES (Birmingham, Huntsville)
    // ============================================================================
    { name: 'KEYSYS', slug: 'keysys', source: JobSource.GREENHOUSE, careersUrl: 'https://keysys.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/keysys/jobs', enabled: true, priority: 2 },
    { name: 'Abacus Technology', slug: 'abacustech', source: JobSource.GREENHOUSE, careersUrl: 'https://abacustech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/abacustech/jobs', enabled: true, priority: 2 },
    { name: 'Quantum Research International', slug: 'quantumri', source: JobSource.GREENHOUSE, careersUrl: 'https://quantum-intl.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/quantumri/jobs', enabled: true, priority: 2 },
    { name: 'Astrion', slug: 'astrion', source: JobSource.GREENHOUSE, careersUrl: 'https://astrion.us/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/astrion/jobs', enabled: true, priority: 2 },
    { name: 'Momentum Technologies', slug: 'momentum', source: JobSource.GREENHOUSE, careersUrl: 'https://gomomentum.tech/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/momentum/jobs', enabled: true, priority: 2 },
    { name: 'Sawyer Solutions', slug: 'sawyersolutions', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/sawyersolutions', apiEndpoint: 'https://api.lever.co/v0/postings/sawyersolutions?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // LOUISIANA IT COMPANIES (New Orleans, Baton Rouge)
    // ============================================================================
    { name: 'Revelry Labs', slug: 'revelrylabs', source: JobSource.GREENHOUSE, careersUrl: 'https://revelry.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/revelry/jobs', enabled: true, priority: 2 },
    { name: 'Lumen Technologies', slug: 'lumen', source: JobSource.WORKDAY, careersUrl: 'https://lumen.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Resilia', slug: 'resilia', source: JobSource.GREENHOUSE, careersUrl: 'https://resilia.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/resilia/jobs', enabled: true, priority: 2 },
    { name: 'iSeatz', slug: 'iseatz', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/iseatz', apiEndpoint: 'https://api.lever.co/v0/postings/iseatz?mode=json', enabled: true, priority: 2 },
    { name: 'General Informatics', slug: 'generalinformatics', source: JobSource.GREENHOUSE, careersUrl: 'https://gi.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gi/jobs', enabled: true, priority: 2 },
    { name: 'LookFar', slug: 'lookfar', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/lookfar', apiEndpoint: 'https://api.lever.co/v0/postings/lookfar?mode=json', enabled: true, priority: 2 },
    { name: 'Envoc', slug: 'envoc', source: JobSource.GREENHOUSE, careersUrl: 'https://envoc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/envoc/jobs', enabled: true, priority: 2 },
    { name: 'Sparkhound', slug: 'sparkhound', source: JobSource.GREENHOUSE, careersUrl: 'https://sparkhound.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sparkhound/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // KENTUCKY IT COMPANIES (Louisville, Lexington)
    // ============================================================================
    { name: 'Rubicon', slug: 'rubicon', source: JobSource.GREENHOUSE, careersUrl: 'https://rubicon.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rubicon/jobs', enabled: true, priority: 2 },
    { name: 'Lexmark', slug: 'lexmark', source: JobSource.WORKDAY, careersUrl: 'https://lexmark.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'NetGain Technologies', slug: 'netgain', source: JobSource.GREENHOUSE, careersUrl: 'https://netgainit.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/netgain/jobs', enabled: true, priority: 2 },
    { name: 'GlowTouch Technologies', slug: 'glowtouch', source: JobSource.GREENHOUSE, careersUrl: 'https://glowtouch.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/glowtouch/jobs', enabled: true, priority: 2 },
    { name: 'HW Tech', slug: 'hwtech', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/hwtech', apiEndpoint: 'https://api.lever.co/v0/postings/hwtech?mode=json', enabled: true, priority: 2 },
    { name: 'InfoBeyond Technology', slug: 'infobeyond', source: JobSource.GREENHOUSE, careersUrl: 'https://infobeyondtech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/infobeyond/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // KANSAS IT COMPANIES (Wichita, Overland Park)
    // ============================================================================
    { name: 'Garmin', slug: 'garmin-ks', source: JobSource.WORKDAY, careersUrl: 'https://garmin.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'C2FO', slug: 'c2fo', source: JobSource.GREENHOUSE, careersUrl: 'https://c2fo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/c2fo/jobs', enabled: true, priority: 2 },
    { name: 'High Touch Technologies', slug: 'hightouch', source: JobSource.GREENHOUSE, careersUrl: 'https://hightouchtechnologies.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hightouch/jobs', enabled: true, priority: 2 },
    { name: 'Moonbase Labs', slug: 'moonbaselabs', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/moonbaselabs', apiEndpoint: 'https://api.lever.co/v0/postings/moonbaselabs?mode=json', enabled: true, priority: 2 },
    { name: 'Keycentrix', slug: 'keycentrix', source: JobSource.GREENHOUSE, careersUrl: 'https://keycentrix.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/keycentrix/jobs', enabled: true, priority: 2 },
    { name: 'ISG Technology', slug: 'isgtechnology', source: JobSource.GREENHOUSE, careersUrl: 'https://isgtech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/isgtechnology/jobs', enabled: true, priority: 2 },
    { name: 'RESULTS Technology', slug: 'resultstech', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/resultstech', apiEndpoint: 'https://api.lever.co/v0/postings/resultstech?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // IOWA IT COMPANIES (Des Moines, Cedar Rapids)
    // ============================================================================
    { name: 'Workiva', slug: 'workiva', source: JobSource.GREENHOUSE, careersUrl: 'https://workiva.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/workiva/jobs', enabled: true, priority: 2 },
    { name: 'Involta', slug: 'involta', source: JobSource.GREENHOUSE, careersUrl: 'https://involta.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/involta/jobs', enabled: true, priority: 2 },
    { name: 'Geonetric', slug: 'geonetric', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/geonetric', apiEndpoint: 'https://api.lever.co/v0/postings/geonetric?mode=json', enabled: true, priority: 2 },
    { name: 'LightEdge Solutions', slug: 'lightedge', source: JobSource.GREENHOUSE, careersUrl: 'https://lightedge.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lightedge/jobs', enabled: true, priority: 2 },
    { name: 'QCI', slug: 'qci', source: JobSource.GREENHOUSE, careersUrl: 'https://qci.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/qci/jobs', enabled: true, priority: 2 },
    { name: 'Seven Verbs', slug: 'sevenverbs', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/sevenverbs', apiEndpoint: 'https://api.lever.co/v0/postings/sevenverbs?mode=json', enabled: true, priority: 2 },
    { name: 'IP Pathways', slug: 'ippathways', source: JobSource.GREENHOUSE, careersUrl: 'https://ippathways.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ippathways/jobs', enabled: true, priority: 2 },
    { name: 'Spinutech', slug: 'spinutech', source: JobSource.GREENHOUSE, careersUrl: 'https://spinutech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/spinutech/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // NEBRASKA IT COMPANIES (Omaha, Lincoln)
    // ============================================================================
    { name: 'Hudl', slug: 'hudl', source: JobSource.GREENHOUSE, careersUrl: 'https://hudl.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hudl/jobs', enabled: true, priority: 2 },
    { name: 'Buildertrend', slug: 'buildertrend', source: JobSource.GREENHOUSE, careersUrl: 'https://buildertrend.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/buildertrend/jobs', enabled: true, priority: 2 },
    { name: 'Flywheel', slug: 'flywheel', source: JobSource.GREENHOUSE, careersUrl: 'https://getflywheel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/flywheel/jobs', enabled: true, priority: 2 },
    { name: 'Quantum Workplace', slug: 'quantumworkplace', source: JobSource.GREENHOUSE, careersUrl: 'https://quantumworkplace.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/quantumworkplace/jobs', enabled: true, priority: 2 },
    { name: 'Don\'t Panic Labs', slug: 'dontpaniclabs', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/dontpaniclabs', apiEndpoint: 'https://api.lever.co/v0/postings/dontpaniclabs?mode=json', enabled: true, priority: 2 },
    { name: 'Aviture', slug: 'aviture', source: JobSource.GREENHOUSE, careersUrl: 'https://aviture.us.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/aviture/jobs', enabled: true, priority: 2 },
    { name: 'Orion Advisor Solutions', slug: 'orionadvisor', source: JobSource.GREENHOUSE, careersUrl: 'https://orion.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/orion/jobs', enabled: true, priority: 2 },
    { name: 'CompanyCam', slug: 'companycam', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/companycam', apiEndpoint: 'https://api.lever.co/v0/postings/companycam?mode=json', enabled: true, priority: 2 },
    { name: 'Team Software', slug: 'teamsoftware', source: JobSource.GREENHOUSE, careersUrl: 'https://teamsoftware.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/teamsoftware/jobs', enabled: true, priority: 2 },
    { name: 'OpsCompass', slug: 'opscompass', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/opscompass', apiEndpoint: 'https://api.lever.co/v0/postings/opscompass?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // OKLAHOMA IT COMPANIES (Oklahoma City, Tulsa)
    // ============================================================================
    { name: 'Paycom', slug: 'paycom', source: JobSource.WORKDAY, careersUrl: 'https://paycom.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'ConsumerAffairs', slug: 'consumeraffairs', source: JobSource.GREENHOUSE, careersUrl: 'https://consumeraffairs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/consumeraffairs/jobs', enabled: true, priority: 2 },
    { name: 'Clevyr', slug: 'clevyr', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/clevyr', apiEndpoint: 'https://api.lever.co/v0/postings/clevyr?mode=json', enabled: true, priority: 2 },
    { name: 'Deep Fork Technology', slug: 'deepforktechnology', source: JobSource.GREENHOUSE, careersUrl: 'https://deepforktech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/deepfork/jobs', enabled: true, priority: 2 },
    { name: 'Exaptive', slug: 'exaptive', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/exaptive', apiEndpoint: 'https://api.lever.co/v0/postings/exaptive?mode=json', enabled: true, priority: 2 },
    { name: 'Tenstreet', slug: 'tenstreet', source: JobSource.GREENHOUSE, careersUrl: 'https://tenstreet.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tenstreet/jobs', enabled: true, priority: 2 },
    { name: 'SageNet', slug: 'sagenet', source: JobSource.GREENHOUSE, careersUrl: 'https://sagenet.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sagenet/jobs', enabled: true, priority: 2 },
    { name: 'Crusoe', slug: 'crusoe', source: JobSource.GREENHOUSE, careersUrl: 'https://crusoe.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/crusoe/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // ARKANSAS IT COMPANIES (Little Rock, Fayetteville)
    // ============================================================================
    { name: 'Acxiom', slug: 'acxiom', source: JobSource.WORKDAY, careersUrl: 'https://acxiom.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Apptegy', slug: 'apptegy', source: JobSource.GREENHOUSE, careersUrl: 'https://apptegy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/apptegy/jobs', enabled: true, priority: 2 },
    { name: 'First Orion', slug: 'firstorion', source: JobSource.GREENHOUSE, careersUrl: 'https://firstorion.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/firstorion/jobs', enabled: true, priority: 2 },
    { name: 'Metova', slug: 'metova', source: JobSource.GREENHOUSE, careersUrl: 'https://metova.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/metova/jobs', enabled: true, priority: 2 },
    { name: 'MedEvolve', slug: 'medevolve', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/medevolve', apiEndpoint: 'https://api.lever.co/v0/postings/medevolve?mode=json', enabled: true, priority: 2 },
    { name: 'Mainstream Technologies', slug: 'mainstream', source: JobSource.GREENHOUSE, careersUrl: 'https://mainstream-tech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mainstream/jobs', enabled: true, priority: 2 },
    { name: 'Keyhole Software', slug: 'keyholesoftware', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/keyholesoftware', apiEndpoint: 'https://api.lever.co/v0/postings/keyholesoftware?mode=json', enabled: true, priority: 2 },
    { name: 'Ozark Apps', slug: 'ozarkapps', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/ozarkapps', apiEndpoint: 'https://api.lever.co/v0/postings/ozarkapps?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // NEW MEXICO IT COMPANIES (Albuquerque, Santa Fe)
    // ============================================================================
    { name: 'Sandia National Laboratories', slug: 'sandia', source: JobSource.WORKDAY, careersUrl: 'https://sandia.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'RS21', slug: 'rs21', source: JobSource.GREENHOUSE, careersUrl: 'https://rs21.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rs21/jobs', enabled: true, priority: 2 },
    { name: 'Descartes Labs', slug: 'descarteslabs', source: JobSource.GREENHOUSE, careersUrl: 'https://descarteslabs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/descarteslabs/jobs', enabled: true, priority: 2 },
    { name: 'Lavu', slug: 'lavu', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/lavu', apiEndpoint: 'https://api.lever.co/v0/postings/lavu?mode=json', enabled: true, priority: 2 },
    { name: 'Indica Labs', slug: 'indicalabs', source: JobSource.GREENHOUSE, careersUrl: 'https://indicalab.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/indicalabs/jobs', enabled: true, priority: 2 },
    { name: 'QuEra Computing', slug: 'quera', source: JobSource.GREENHOUSE, careersUrl: 'https://quera.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/quera/jobs', enabled: true, priority: 2 },
    { name: 'Flow Science', slug: 'flowscience', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/flowscience', apiEndpoint: 'https://api.lever.co/v0/postings/flowscience?mode=json', enabled: true, priority: 2 },
    { name: 'RiskSense', slug: 'risksense', source: JobSource.GREENHOUSE, careersUrl: 'https://risksense.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/risksense/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // WEST VIRGINIA IT COMPANIES (Charleston, Morgantown)
    // ============================================================================
    { name: 'Agile5 Technologies', slug: 'agile5', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/agile5', apiEndpoint: 'https://api.lever.co/v0/postings/agile5?mode=json', enabled: true, priority: 2 },
    { name: 'Fusion Technology', slug: 'fusiontech', source: JobSource.GREENHOUSE, careersUrl: 'https://fusiontechllc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fusiontech/jobs', enabled: true, priority: 2 },
    { name: 'KeyLogic Systems', slug: 'keylogic', source: JobSource.WORKDAY, careersUrl: 'https://keylogic.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'NextGen Federal Systems', slug: 'nextgenfederal', source: JobSource.GREENHOUSE, careersUrl: 'https://nextgenfed.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/nextgenfed/jobs', enabled: true, priority: 2 },
    { name: 'eGroup Enabling Technologies', slug: 'egrp', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/egrp', apiEndpoint: 'https://api.lever.co/v0/postings/egrp?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // NEW HAMPSHIRE IT COMPANIES (Manchester, Portsmouth)
    // ============================================================================
    { name: 'Bottomline Technologies', slug: 'bottomline', source: JobSource.GREENHOUSE, careersUrl: 'https://bottomline.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bottomline/jobs', enabled: true, priority: 2 },
    { name: 'Connection', slug: 'connection', source: JobSource.WORKDAY, careersUrl: 'https://connection.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'ATOM Group', slug: 'atomgroup', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/atomgroup', apiEndpoint: 'https://api.lever.co/v0/postings/atomgroup?mode=json', enabled: true, priority: 2 },
    { name: 'Newforma', slug: 'newforma', source: JobSource.GREENHOUSE, careersUrl: 'https://newforma.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/newforma/jobs', enabled: true, priority: 2 },
    { name: 'Minim', slug: 'minim', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/minim', apiEndpoint: 'https://api.lever.co/v0/postings/minim?mode=json', enabled: true, priority: 2 },
    { name: 'SkillSoft', slug: 'skillsoft', source: JobSource.WORKDAY, careersUrl: 'https://skillsoft.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Zco Corporation', slug: 'zcocorp', source: JobSource.GREENHOUSE, careersUrl: 'https://zco.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zco/jobs', enabled: true, priority: 2 },
    { name: 'Extreme Networks', slug: 'extremenetworks', source: JobSource.WORKDAY, careersUrl: 'https://extremenetworks.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // ============================================================================
    // DELAWARE IT COMPANIES (Wilmington, Dover)
    // ============================================================================
    { name: 'AuditBoard', slug: 'auditboard', source: JobSource.GREENHOUSE, careersUrl: 'https://auditboard.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/auditboard/jobs', enabled: true, priority: 2 },
    { name: 'LabWare', slug: 'labware', source: JobSource.GREENHOUSE, careersUrl: 'https://labware.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/labware/jobs', enabled: true, priority: 2 },
    { name: 'Smartcat', slug: 'smartcat', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/smartcat', apiEndpoint: 'https://api.lever.co/v0/postings/smartcat?mode=json', enabled: true, priority: 2 },
    { name: 'VU Security', slug: 'vusecurity', source: JobSource.GREENHOUSE, careersUrl: 'https://vusecurity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vusecurity/jobs', enabled: true, priority: 2 },
    { name: 'Tyler Technologies', slug: 'tylertech-de', source: JobSource.WORKDAY, careersUrl: 'https://tylertech.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Xailient', slug: 'xailient', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/xailient', apiEndpoint: 'https://api.lever.co/v0/postings/xailient?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // VERMONT IT COMPANIES (Burlington)
    // ============================================================================
    { name: 'BETA Technologies', slug: 'betatech', source: JobSource.GREENHOUSE, careersUrl: 'https://beta.team/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/beta/jobs', enabled: true, priority: 2 },
    { name: 'GlobalFoundries', slug: 'globalfoundries', source: JobSource.WORKDAY, careersUrl: 'https://globalfoundries.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Dealer.com', slug: 'dealer', source: JobSource.GREENHOUSE, careersUrl: 'https://dealer.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dealer/jobs', enabled: true, priority: 2 },
    { name: 'OnLogic', slug: 'onlogic', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/onlogic', apiEndpoint: 'https://api.lever.co/v0/postings/onlogic?mode=json', enabled: true, priority: 2 },
    { name: 'Image Relay', slug: 'imagerelay', source: JobSource.GREENHOUSE, careersUrl: 'https://imagerelay.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/imagerelay/jobs', enabled: true, priority: 2 },
    { name: 'Data Innovations', slug: 'datainnovations', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/datainnovations', apiEndpoint: 'https://api.lever.co/v0/postings/datainnovations?mode=json', enabled: true, priority: 2 },
    { name: 'Resonant Link', slug: 'resonantlink', source: JobSource.GREENHOUSE, careersUrl: 'https://resonantlink.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/resonantlink/jobs', enabled: true, priority: 2 },
    { name: 'Widewail', slug: 'widewail', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/widewail', apiEndpoint: 'https://api.lever.co/v0/postings/widewail?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // HAWAII IT COMPANIES (Honolulu)
    // ============================================================================
    { name: 'Oceanit', slug: 'oceanit', source: JobSource.GREENHOUSE, careersUrl: 'https://oceanit.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/oceanit/jobs', enabled: true, priority: 2 },
    { name: 'Hawaiian Telcom', slug: 'hawaiiantelcom', source: JobSource.WORKDAY, careersUrl: 'https://hawaiiantel.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'RevaComm', slug: 'revacomm', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/revacomm', apiEndpoint: 'https://api.lever.co/v0/postings/revacomm?mode=json', enabled: true, priority: 2 },
    { name: 'Referentia Systems', slug: 'referentia', source: JobSource.GREENHOUSE, careersUrl: 'https://referentia.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/referentia/jobs', enabled: true, priority: 2 },
    { name: 'Pacxa', slug: 'pacxa', source: JobSource.GREENHOUSE, careersUrl: 'https://pacxa.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pacxa/jobs', enabled: true, priority: 2 },
    { name: 'Hohonu', slug: 'hohonu', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/hohonu', apiEndpoint: 'https://api.lever.co/v0/postings/hohonu?mode=json', enabled: true, priority: 2 },
    { name: 'Shifted Energy', slug: 'shiftedenergy', source: JobSource.GREENHOUSE, careersUrl: 'https://shiftedenergy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/shiftedenergy/jobs', enabled: true, priority: 2 },
    { name: 'Turno', slug: 'turno', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/turno', apiEndpoint: 'https://api.lever.co/v0/postings/turno?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // RHODE ISLAND IT COMPANIES (Providence)
    // ============================================================================
    { name: 'Infosys', slug: 'infosys-ri', source: JobSource.WORKDAY, careersUrl: 'https://infosys.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Fidelity Investments', slug: 'fidelity-ri', source: JobSource.WORKDAY, careersUrl: 'https://fidelity.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Swipely', slug: 'swipely', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/swipely', apiEndpoint: 'https://api.lever.co/v0/postings/swipely?mode=json', enabled: true, priority: 2 },
    { name: 'Tech Collective', slug: 'techcollective', source: JobSource.GREENHOUSE, careersUrl: 'https://techcollective.org/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/techcollective/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // MAINE IT COMPANIES (Portland)
    // ============================================================================
    { name: 'Tyler Technologies', slug: 'tylertech-me', source: JobSource.WORKDAY, careersUrl: 'https://tylertech.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'WEX', slug: 'wex', source: JobSource.GREENHOUSE, careersUrl: 'https://wex.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/wex/jobs', enabled: true, priority: 2 },
    { name: 'IDEXX', slug: 'idexx', source: JobSource.WORKDAY, careersUrl: 'https://idexx.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Tilson Technology Management', slug: 'tilson', source: JobSource.GREENHOUSE, careersUrl: 'https://tilsontech.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tilson/jobs', enabled: true, priority: 2 },
    { name: 'Kepware', slug: 'kepware', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/kepware', apiEndpoint: 'https://api.lever.co/v0/postings/kepware?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // ADDITIONAL MAJOR TECH COMPANIES (Multiple Locations)
    // ============================================================================
    { name: 'Samsara', slug: 'samsara', source: JobSource.GREENHOUSE, careersUrl: 'https://samsara.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/samsara/jobs', enabled: true, priority: 1 },
    { name: 'Faire', slug: 'faire', source: JobSource.GREENHOUSE, careersUrl: 'https://faire.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/faire/jobs', enabled: true, priority: 1 },
    { name: 'Notion', slug: 'notion', source: JobSource.GREENHOUSE, careersUrl: 'https://notion.so/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/notion/jobs', enabled: true, priority: 1 },
    { name: 'Airtable', slug: 'airtable', source: JobSource.GREENHOUSE, careersUrl: 'https://airtable.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/airtable/jobs', enabled: true, priority: 1 },
    { name: 'Figma', slug: 'figma', source: JobSource.GREENHOUSE, careersUrl: 'https://figma.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/figma/jobs', enabled: true, priority: 1 },
    { name: 'Linear', slug: 'linear', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/linear', apiEndpoint: 'https://api.lever.co/v0/postings/linear?mode=json', enabled: true, priority: 1 },
    { name: 'Vercel', slug: 'vercel', source: JobSource.GREENHOUSE, careersUrl: 'https://vercel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vercel/jobs', enabled: true, priority: 1 },
    { name: 'Supabase', slug: 'supabase', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/supabase', apiEndpoint: 'https://api.lever.co/v0/postings/supabase?mode=json', enabled: true, priority: 1 },
    { name: 'Render', slug: 'render', source: JobSource.GREENHOUSE, careersUrl: 'https://render.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/render/jobs', enabled: true, priority: 1 },
    { name: 'Railway', slug: 'railway', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/railway', apiEndpoint: 'https://api.lever.co/v0/postings/railway?mode=json', enabled: true, priority: 2 },
    { name: 'Neon', slug: 'neon', source: JobSource.GREENHOUSE, careersUrl: 'https://neon.tech/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/neon/jobs', enabled: true, priority: 2 },
    { name: 'Temporal', slug: 'temporal', source: JobSource.GREENHOUSE, careersUrl: 'https://temporal.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/temporal/jobs', enabled: true, priority: 2 },
    { name: 'Prisma', slug: 'prisma', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/prisma', apiEndpoint: 'https://api.lever.co/v0/postings/prisma?mode=json', enabled: true, priority: 2 },
    { name: 'Retool', slug: 'retool', source: JobSource.GREENHOUSE, careersUrl: 'https://retool.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/retool/jobs', enabled: true, priority: 1 },
    { name: 'PostHog', slug: 'posthog', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/posthog', apiEndpoint: 'https://api.lever.co/v0/postings/posthog?mode=json', enabled: true, priority: 2 },
    { name: 'Cal.com', slug: 'calcom', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/calcom', apiEndpoint: 'https://api.lever.co/v0/postings/calcom?mode=json', enabled: true, priority: 2 },
    { name: 'Convex', slug: 'convex', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/convex', apiEndpoint: 'https://api.lever.co/v0/postings/convex?mode=json', enabled: true, priority: 2 },
    { name: 'Stytch', slug: 'stytch', source: JobSource.GREENHOUSE, careersUrl: 'https://stytch.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/stytch/jobs', enabled: true, priority: 2 },
    { name: 'Clerk', slug: 'clerk', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/clerk', apiEndpoint: 'https://api.lever.co/v0/postings/clerk?mode=json', enabled: true, priority: 2 },
    { name: 'Resend', slug: 'resend', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/resend', apiEndpoint: 'https://api.lever.co/v0/postings/resend?mode=json', enabled: true, priority: 2 },
    { name: 'Inngest', slug: 'inngest', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/inngest', apiEndpoint: 'https://api.lever.co/v0/postings/inngest?mode=json', enabled: true, priority: 2 },
    { name: 'Dagger', slug: 'dagger', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/dagger', apiEndpoint: 'https://api.lever.co/v0/postings/dagger?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // YC TOP STARTUPS & UNICORNS
    // ============================================================================
    { name: 'Lattice', slug: 'lattice', source: JobSource.GREENHOUSE, careersUrl: 'https://lattice.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lattice/jobs', enabled: true, priority: 1 },
    { name: 'Astranis', slug: 'astranis', source: JobSource.GREENHOUSE, careersUrl: 'https://astranis.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/astranis/jobs', enabled: true, priority: 2 },
    { name: 'Front', slug: 'front', source: JobSource.GREENHOUSE, careersUrl: 'https://front.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/front/jobs', enabled: true, priority: 2 },
    { name: 'Podium', slug: 'podium-yc', source: JobSource.GREENHOUSE, careersUrl: 'https://podium.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/podium/jobs', enabled: true, priority: 2 },
    { name: 'HealthSherpa', slug: 'healthsherpa', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/healthsherpa', apiEndpoint: 'https://api.lever.co/v0/postings/healthsherpa?mode=json', enabled: true, priority: 2 },
    { name: 'Clipboard Health', slug: 'clipboardhealth', source: JobSource.GREENHOUSE, careersUrl: 'https://clipboardhealth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/clipboardhealth/jobs', enabled: true, priority: 2 },
    { name: 'Harvey AI', slug: 'harvey', source: JobSource.GREENHOUSE, careersUrl: 'https://harvey.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/harvey/jobs', enabled: true, priority: 1 },
    { name: 'Ambience Healthcare', slug: 'ambiencehealthcare', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/ambience', apiEndpoint: 'https://api.lever.co/v0/postings/ambience?mode=json', enabled: true, priority: 2 },
    { name: 'Zepto', slug: 'zepto', source: JobSource.GREENHOUSE, careersUrl: 'https://zepto.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zepto/jobs', enabled: true, priority: 2 },
    { name: 'Razorpay', slug: 'razorpay', source: JobSource.GREENHOUSE, careersUrl: 'https://razorpay.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/razorpay/jobs', enabled: true, priority: 2 },
    { name: 'Boom Supersonic', slug: 'boom', source: JobSource.GREENHOUSE, careersUrl: 'https://boomsupersonic.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/boom/jobs', enabled: true, priority: 2 },
    { name: 'Human Interest', slug: 'humaninterest', source: JobSource.GREENHOUSE, careersUrl: 'https://humaninterest.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/humaninterest/jobs', enabled: true, priority: 2 },
    { name: 'Snapdocs', slug: 'snapdocs', source: JobSource.GREENHOUSE, careersUrl: 'https://snapdocs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snapdocs/jobs', enabled: true, priority: 2 },
    { name: 'Fountain', slug: 'fountain', source: JobSource.GREENHOUSE, careersUrl: 'https://fountain.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fountain/jobs', enabled: true, priority: 2 },
    { name: 'MessageBird', slug: 'messagebird', source: JobSource.GREENHOUSE, careersUrl: 'https://messagebird.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/messagebird/jobs', enabled: true, priority: 2 },
    { name: 'People.ai', slug: 'peopleai', source: JobSource.GREENHOUSE, careersUrl: 'https://people.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/peopleai/jobs', enabled: true, priority: 2 },
    { name: 'Embark', slug: 'embark', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/embark', apiEndpoint: 'https://api.lever.co/v0/postings/embark?mode=json', enabled: true, priority: 2 },
    { name: 'Flirtey', slug: 'flirtey', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/flirtey', apiEndpoint: 'https://api.lever.co/v0/postings/flirtey?mode=json', enabled: true, priority: 2 },
    { name: 'Tennr', slug: 'tennr', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tennr', apiEndpoint: 'https://api.lever.co/v0/postings/tennr?mode=json', enabled: true, priority: 2 },
    { name: 'OpenRouter', slug: 'openrouter', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/openrouter', apiEndpoint: 'https://api.lever.co/v0/postings/openrouter?mode=json', enabled: true, priority: 2 },
    { name: 'Glean', slug: 'glean', source: JobSource.GREENHOUSE, careersUrl: 'https://glean.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/glean/jobs', enabled: true, priority: 1 },
    { name: 'Sierra AI', slug: 'sierra', source: JobSource.GREENHOUSE, careersUrl: 'https://sierra.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sierra/jobs', enabled: true, priority: 1 },
    { name: 'Granola AI', slug: 'granola', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/granola', apiEndpoint: 'https://api.lever.co/v0/postings/granola?mode=json', enabled: true, priority: 2 },
    { name: 'Hightouch', slug: 'hightouch', source: JobSource.GREENHOUSE, careersUrl: 'https://hightouch.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hightouch/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // AI & ML STARTUPS (2024 UNICORNS)
    // ============================================================================
    { name: 'xAI', slug: 'xai', source: JobSource.GREENHOUSE, careersUrl: 'https://x.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/xai/jobs', enabled: true, priority: 1 },
    { name: 'Physical Intelligence', slug: 'physicalintelligence', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/physicalintelligence', apiEndpoint: 'https://api.lever.co/v0/postings/physicalintelligence?mode=json', enabled: true, priority: 1 },
    { name: 'Cognition AI', slug: 'cognition', source: JobSource.GREENHOUSE, careersUrl: 'https://cognition.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cognition/jobs', enabled: true, priority: 1 },
    { name: 'Groq', slug: 'groq', source: JobSource.GREENHOUSE, careersUrl: 'https://groq.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/groq/jobs', enabled: true, priority: 1 },
    { name: 'Codeium', slug: 'codeium', source: JobSource.GREENHOUSE, careersUrl: 'https://codeium.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/codeium/jobs', enabled: true, priority: 1 },
    { name: 'Safe Superintelligence', slug: 'ssi', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/ssi', apiEndpoint: 'https://api.lever.co/v0/postings/ssi?mode=json', enabled: true, priority: 1 },
    { name: 'Anysphere', slug: 'anysphere', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/anysphere', apiEndpoint: 'https://api.lever.co/v0/postings/anysphere?mode=json', enabled: true, priority: 1 },
    { name: 'Applied Intuition', slug: 'appliedintuition', source: JobSource.GREENHOUSE, careersUrl: 'https://appliedintuition.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/appliedintuition/jobs', enabled: true, priority: 1 },
    { name: 'Xaira Therapeutics', slug: 'xaira', source: JobSource.GREENHOUSE, careersUrl: 'https://xaira.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/xaira/jobs', enabled: true, priority: 2 },
    { name: 'Grow Therapy', slug: 'growtherapy', source: JobSource.GREENHOUSE, careersUrl: 'https://growtherapy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/growtherapy/jobs', enabled: true, priority: 2 },
    { name: 'BillionToOne', slug: 'billiontoone', source: JobSource.GREENHOUSE, careersUrl: 'https://billiontoone.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/billiontoone/jobs', enabled: true, priority: 2 },
    { name: 'Halcyon', slug: 'halcyon', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/halcyon', apiEndpoint: 'https://api.lever.co/v0/postings/halcyon?mode=json', enabled: true, priority: 2 },
    { name: 'Chainguard', slug: 'chainguard', source: JobSource.GREENHOUSE, careersUrl: 'https://chainguard.dev/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/chainguard/jobs', enabled: true, priority: 2 },
    { name: 'Huntress', slug: 'huntress', source: JobSource.GREENHOUSE, careersUrl: 'https://huntress.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/huntress/jobs', enabled: true, priority: 2 },
    { name: 'Bugcrowd', slug: 'bugcrowd', source: JobSource.GREENHOUSE, careersUrl: 'https://bugcrowd.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bugcrowd/jobs', enabled: true, priority: 2 },
    { name: 'Altruist', slug: 'altruist', source: JobSource.GREENHOUSE, careersUrl: 'https://altruist.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/altruist/jobs', enabled: true, priority: 2 },
    { name: 'Flex', slug: 'flex', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/flex', apiEndpoint: 'https://api.lever.co/v0/postings/flex?mode=json', enabled: true, priority: 2 },
    { name: 'Aven', slug: 'aven', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/aven', apiEndpoint: 'https://api.lever.co/v0/postings/aven?mode=json', enabled: true, priority: 2 },
    { name: 'Sigma Computing', slug: 'sigmacomputing', source: JobSource.GREENHOUSE, careersUrl: 'https://sigmacomputing.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sigmacomputing/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // B2B SaaS & ENTERPRISE SOFTWARE
    // ============================================================================
    { name: 'Zendesk', slug: 'zendesk', source: JobSource.WORKDAY, careersUrl: 'https://zendesk.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'DocuSign', slug: 'docusign', source: JobSource.WORKDAY, careersUrl: 'https://docusign.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Monday.com', slug: 'monday', source: JobSource.GREENHOUSE, careersUrl: 'https://monday.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/monday/jobs', enabled: true, priority: 1 },
    { name: 'ClickUp', slug: 'clickup', source: JobSource.GREENHOUSE, careersUrl: 'https://clickup.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/clickup/jobs', enabled: true, priority: 1 },
    { name: 'Mailchimp', slug: 'mailchimp', source: JobSource.GREENHOUSE, careersUrl: 'https://mailchimp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mailchimp/jobs', enabled: true, priority: 2 },
    { name: 'Typeform', slug: 'typeform', source: JobSource.GREENHOUSE, careersUrl: 'https://typeform.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/typeform/jobs', enabled: true, priority: 2 },
    { name: 'Deel', slug: 'deel', source: JobSource.GREENHOUSE, careersUrl: 'https://deel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/deel/jobs', enabled: true, priority: 1 },
    { name: 'Remote', slug: 'remote', source: JobSource.GREENHOUSE, careersUrl: 'https://remote.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/remote/jobs', enabled: true, priority: 1 },
    { name: 'SEMrush', slug: 'semrush', source: JobSource.GREENHOUSE, careersUrl: 'https://semrush.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/semrush/jobs', enabled: true, priority: 2 },
    { name: 'Autodesk', slug: 'autodesk', source: JobSource.WORKDAY, careersUrl: 'https://autodesk.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'BigCommerce', slug: 'bigcommerce', source: JobSource.GREENHOUSE, careersUrl: 'https://bigcommerce.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bigcommerce/jobs', enabled: true, priority: 2 },
    { name: 'Wix', slug: 'wix', source: JobSource.GREENHOUSE, careersUrl: 'https://wix.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/wix/jobs', enabled: true, priority: 2 },
    { name: 'Xero', slug: 'xero', source: JobSource.WORKDAY, careersUrl: 'https://xero.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Aurora Solar', slug: 'aurorasolar', source: JobSource.GREENHOUSE, careersUrl: 'https://aurorasolar.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/aurorasolar/jobs', enabled: true, priority: 2 },
    { name: 'Textio', slug: 'textio', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/textio', apiEndpoint: 'https://api.lever.co/v0/postings/textio?mode=json', enabled: true, priority: 2 },
    { name: 'Sendbird', slug: 'sendbird', source: JobSource.GREENHOUSE, careersUrl: 'https://sendbird.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sendbird/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // FINTECH COMPANIES
    // ============================================================================
    { name: 'Revolut', slug: 'revolut', source: JobSource.GREENHOUSE, careersUrl: 'https://revolut.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/revolut/jobs', enabled: true, priority: 1 },
    { name: 'Nubank', slug: 'nubank', source: JobSource.GREENHOUSE, careersUrl: 'https://nubank.com.br/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/nubank/jobs', enabled: true, priority: 1 },
    { name: 'Monzo', slug: 'monzo', source: JobSource.GREENHOUSE, careersUrl: 'https://monzo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/monzo/jobs', enabled: true, priority: 2 },
    { name: 'Klarna', slug: 'klarna', source: JobSource.GREENHOUSE, careersUrl: 'https://klarna.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/klarna/jobs', enabled: true, priority: 1 },
    { name: 'Wise', slug: 'wise', source: JobSource.GREENHOUSE, careersUrl: 'https://wise.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/wise/jobs', enabled: true, priority: 1 },
    { name: 'DailyPay', slug: 'dailypay', source: JobSource.GREENHOUSE, careersUrl: 'https://dailypay.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dailypay/jobs', enabled: true, priority: 2 },
    { name: 'Marqeta', slug: 'marqeta', source: JobSource.GREENHOUSE, careersUrl: 'https://marqeta.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/marqeta/jobs', enabled: true, priority: 2 },
    { name: 'GoCardless', slug: 'gocardless', source: JobSource.GREENHOUSE, careersUrl: 'https://gocardless.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gocardless/jobs', enabled: true, priority: 2 },
    { name: 'Nuvei', slug: 'nuvei', source: JobSource.GREENHOUSE, careersUrl: 'https://nuvei.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/nuvei/jobs', enabled: true, priority: 2 },
    { name: 'Checkout.com', slug: 'checkoutcom', source: JobSource.GREENHOUSE, careersUrl: 'https://checkout.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/checkout/jobs', enabled: true, priority: 1 },
    { name: 'SumUp', slug: 'sumup', source: JobSource.GREENHOUSE, careersUrl: 'https://sumup.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sumup/jobs', enabled: true, priority: 2 },
    { name: 'Pleo', slug: 'pleo', source: JobSource.GREENHOUSE, careersUrl: 'https://pleo.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pleo/jobs', enabled: true, priority: 2 },
    { name: 'TrueLayer', slug: 'truelayer', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/truelayer', apiEndpoint: 'https://api.lever.co/v0/postings/truelayer?mode=json', enabled: true, priority: 2 },
    { name: 'Column', slug: 'column', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/column', apiEndpoint: 'https://api.lever.co/v0/postings/column?mode=json', enabled: true, priority: 2 },
    { name: 'Upstart', slug: 'upstart-fintech', source: JobSource.GREENHOUSE, careersUrl: 'https://upstart.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/upstart/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // MORE DEVELOPER TOOLS & INFRASTRUCTURE
    // ============================================================================
    { name: 'Netlify', slug: 'netlify', source: JobSource.GREENHOUSE, careersUrl: 'https://netlify.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/netlify/jobs', enabled: true, priority: 1 },
    { name: 'Fly.io', slug: 'flyio', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/fly-io', apiEndpoint: 'https://api.lever.co/v0/postings/fly-io?mode=json', enabled: true, priority: 2 },
    { name: 'Buildkite', slug: 'buildkite', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/buildkite', apiEndpoint: 'https://api.lever.co/v0/postings/buildkite?mode=json', enabled: true, priority: 2 },
    { name: 'Sentry', slug: 'sentry', source: JobSource.GREENHOUSE, careersUrl: 'https://sentry.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sentry/jobs', enabled: true, priority: 2 },
    { name: 'Sourcegraph', slug: 'sourcegraph', source: JobSource.GREENHOUSE, careersUrl: 'https://sourcegraph.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sourcegraph/jobs', enabled: true, priority: 2 },
    { name: 'Grafana Labs', slug: 'grafana', source: JobSource.GREENHOUSE, careersUrl: 'https://grafana.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/grafana/jobs', enabled: true, priority: 1 },
    { name: 'Kong', slug: 'kong', source: JobSource.GREENHOUSE, careersUrl: 'https://konghq.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kong/jobs', enabled: true, priority: 2 },
    { name: 'Snyk', slug: 'snyk', source: JobSource.GREENHOUSE, careersUrl: 'https://snyk.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snyk/jobs', enabled: true, priority: 1 },
    { name: 'Linear', slug: 'linear-app', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/linear', apiEndpoint: 'https://api.lever.co/v0/postings/linear?mode=json', enabled: true, priority: 1 },
    { name: 'Raycast', slug: 'raycast', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/raycast', apiEndpoint: 'https://api.lever.co/v0/postings/raycast?mode=json', enabled: true, priority: 2 },
    { name: 'Zed', slug: 'zed', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/zed', apiEndpoint: 'https://api.lever.co/v0/postings/zed?mode=json', enabled: true, priority: 2 },
    { name: 'Warp', slug: 'warp', source: JobSource.GREENHOUSE, careersUrl: 'https://warp.dev/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/warp/jobs', enabled: true, priority: 2 },
    { name: 'Airplane', slug: 'airplane', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/airplane', apiEndpoint: 'https://api.lever.co/v0/postings/airplane?mode=json', enabled: true, priority: 2 },
    { name: 'Incident.io', slug: 'incidentio', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/incident-io', apiEndpoint: 'https://api.lever.co/v0/postings/incident-io?mode=json', enabled: true, priority: 2 },
    { name: 'Stainless', slug: 'stainless', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/stainless', apiEndpoint: 'https://api.lever.co/v0/postings/stainless?mode=json', enabled: true, priority: 2 },
    { name: 'Depot', slug: 'depot', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/depot', apiEndpoint: 'https://api.lever.co/v0/postings/depot?mode=json', enabled: true, priority: 2 },
    { name: 'Axiom', slug: 'axiom', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/axiom', apiEndpoint: 'https://api.lever.co/v0/postings/axiom?mode=json', enabled: true, priority: 2 },
    { name: 'Upstash', slug: 'upstash', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/upstash', apiEndpoint: 'https://api.lever.co/v0/postings/upstash?mode=json', enabled: true, priority: 2 },
    { name: 'Turso', slug: 'turso', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/turso', apiEndpoint: 'https://api.lever.co/v0/postings/turso?mode=json', enabled: true, priority: 2 },
    { name: 'EdgeDB', slug: 'edgedb', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/edgedb', apiEndpoint: 'https://api.lever.co/v0/postings/edgedb?mode=json', enabled: true, priority: 2 },
    { name: 'Tinybird', slug: 'tinybird', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tinybird', apiEndpoint: 'https://api.lever.co/v0/postings/tinybird?mode=json', enabled: true, priority: 2 },
    { name: 'MotherDuck', slug: 'motherduck', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/motherduck', apiEndpoint: 'https://api.lever.co/v0/postings/motherduck?mode=json', enabled: true, priority: 2 },
    { name: 'Hydra', slug: 'hydra', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/hydra', apiEndpoint: 'https://api.lever.co/v0/postings/hydra?mode=json', enabled: true, priority: 2 },
    { name: 'ReadySet', slug: 'readyset', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/readyset', apiEndpoint: 'https://api.lever.co/v0/postings/readyset?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // GAMING & ENTERTAINMENT
    // ============================================================================
    { name: 'Epic Games', slug: 'epicgames', source: JobSource.GREENHOUSE, careersUrl: 'https://epicgames.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/epicgames/jobs', enabled: true, priority: 1 },
    { name: 'Riot Games', slug: 'riotgames', source: JobSource.GREENHOUSE, careersUrl: 'https://riotgames.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/riotgames/jobs', enabled: true, priority: 1 },
    { name: 'Activision Blizzard', slug: 'activisionblizzard', source: JobSource.WORKDAY, careersUrl: 'https://activision.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Unity Technologies', slug: 'unity', source: JobSource.GREENHOUSE, careersUrl: 'https://unity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/unity/jobs', enabled: true, priority: 1 },
    { name: 'Niantic', slug: 'niantic', source: JobSource.GREENHOUSE, careersUrl: 'https://niantic.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/niantic/jobs', enabled: true, priority: 2 },
    { name: 'Roblox', slug: 'roblox', source: JobSource.GREENHOUSE, careersUrl: 'https://roblox.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/roblox/jobs', enabled: true, priority: 1 },
    { name: 'Supercell', slug: 'supercell', source: JobSource.GREENHOUSE, careersUrl: 'https://supercell.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/supercell/jobs', enabled: true, priority: 2 },
    { name: 'Valve', slug: 'valve', source: JobSource.GREENHOUSE, careersUrl: 'https://valvesoftware.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/valve/jobs', enabled: true, priority: 1 },
    { name: 'Zynga', slug: 'zynga', source: JobSource.GREENHOUSE, careersUrl: 'https://zynga.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zynga/jobs', enabled: true, priority: 2 },
    { name: 'Playtika', slug: 'playtika', source: JobSource.GREENHOUSE, careersUrl: 'https://playtika.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/playtika/jobs', enabled: true, priority: 2 },
    { name: 'Scopely', slug: 'scopely', source: JobSource.GREENHOUSE, careersUrl: 'https://scopely.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/scopely/jobs', enabled: true, priority: 2 },
    { name: 'AppLovin', slug: 'applovin-gaming', source: JobSource.GREENHOUSE, careersUrl: 'https://applovin.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/applovin/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // HEALTHTECH & BIOTECH
    // ============================================================================
    { name: 'Oscar Health', slug: 'oscarhealth', source: JobSource.GREENHOUSE, careersUrl: 'https://hioscar.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/oscarhealth/jobs', enabled: true, priority: 2 },
    { name: 'Devoted Health', slug: 'devotedhealth', source: JobSource.GREENHOUSE, careersUrl: 'https://devoted.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/devotedhealth/jobs', enabled: true, priority: 2 },
    { name: 'Calm', slug: 'calm', source: JobSource.GREENHOUSE, careersUrl: 'https://calm.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/calm/jobs', enabled: true, priority: 2 },
    { name: 'Headspace', slug: 'headspace', source: JobSource.GREENHOUSE, careersUrl: 'https://headspace.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/headspace/jobs', enabled: true, priority: 2 },
    { name: 'Tempus', slug: 'tempus', source: JobSource.GREENHOUSE, careersUrl: 'https://tempus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tempus/jobs', enabled: true, priority: 2 },
    { name: 'Clover Health', slug: 'cloverhealth', source: JobSource.GREENHOUSE, careersUrl: 'https://cloverhealth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cloverhealth/jobs', enabled: true, priority: 2 },
    { name: 'Ro', slug: 'ro', source: JobSource.GREENHOUSE, careersUrl: 'https://ro.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ro/jobs', enabled: true, priority: 2 },
    { name: 'Hims & Hers', slug: 'himshers', source: JobSource.GREENHOUSE, careersUrl: 'https://hims.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/himshers/jobs', enabled: true, priority: 2 },
    { name: 'Zocdoc', slug: 'zocdoc', source: JobSource.GREENHOUSE, careersUrl: 'https://zocdoc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zocdoc/jobs', enabled: true, priority: 2 },
    { name: 'GoodRx', slug: 'goodrx', source: JobSource.GREENHOUSE, careersUrl: 'https://goodrx.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/goodrx/jobs', enabled: true, priority: 2 },
    { name: 'Carbon Health', slug: 'carbonhealth', source: JobSource.GREENHOUSE, careersUrl: 'https://carbonhealth.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/carbonhealth/jobs', enabled: true, priority: 2 },
    { name: 'Color', slug: 'color', source: JobSource.GREENHOUSE, careersUrl: 'https://color.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/color/jobs', enabled: true, priority: 2 },
    { name: 'Ginkgo Bioworks', slug: 'ginkgo', source: JobSource.GREENHOUSE, careersUrl: 'https://ginkgobioworks.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ginkgo/jobs', enabled: true, priority: 2 },
    { name: 'Benchling', slug: 'benchling', source: JobSource.GREENHOUSE, careersUrl: 'https://benchling.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/benchling/jobs', enabled: true, priority: 2 },
    { name: '23andMe', slug: '23andme', source: JobSource.GREENHOUSE, careersUrl: 'https://23andme.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/23andme/jobs', enabled: true, priority: 2 },
    { name: 'Grail', slug: 'grail', source: JobSource.GREENHOUSE, careersUrl: 'https://grail.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/grail/jobs', enabled: true, priority: 2 },
    { name: 'Recursion', slug: 'recursion', source: JobSource.GREENHOUSE, careersUrl: 'https://recursion.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/recursion/jobs', enabled: true, priority: 2 },
    { name: 'Freenome', slug: 'freenome', source: JobSource.GREENHOUSE, careersUrl: 'https://freenome.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/freenome/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // MORE CYBERSECURITY COMPANIES
    // ============================================================================
    { name: 'Wiz', slug: 'wiz', source: JobSource.GREENHOUSE, careersUrl: 'https://wiz.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/wiz/jobs', enabled: true, priority: 1 },
    { name: 'Lacework', slug: 'lacework', source: JobSource.GREENHOUSE, careersUrl: 'https://lacework.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lacework/jobs', enabled: true, priority: 2 },
    { name: 'Vanta', slug: 'vanta', source: JobSource.GREENHOUSE, careersUrl: 'https://vanta.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vanta/jobs', enabled: true, priority: 1 },
    { name: 'Drata', slug: 'drata', source: JobSource.GREENHOUSE, careersUrl: 'https://drata.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/drata/jobs', enabled: true, priority: 2 },
    { name: 'Abnormal Security', slug: 'abnormalsecurity', source: JobSource.GREENHOUSE, careersUrl: 'https://abnormalsecurity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/abnormalsecurity/jobs', enabled: true, priority: 2 },
    { name: 'Tanium', slug: 'tanium', source: JobSource.GREENHOUSE, careersUrl: 'https://tanium.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tanium/jobs', enabled: true, priority: 2 },
    { name: 'Vectra AI', slug: 'vectra', source: JobSource.GREENHOUSE, careersUrl: 'https://vectra.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vectra/jobs', enabled: true, priority: 2 },
    { name: 'Expel', slug: 'expel', source: JobSource.GREENHOUSE, careersUrl: 'https://expel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/expel/jobs', enabled: true, priority: 2 },
    { name: 'Orca Security', slug: 'orcasecurity', source: JobSource.GREENHOUSE, careersUrl: 'https://orca.security/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/orcasecurity/jobs', enabled: true, priority: 2 },
    { name: 'Axonius', slug: 'axonius', source: JobSource.GREENHOUSE, careersUrl: 'https://axonius.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/axonius/jobs', enabled: true, priority: 2 },
    { name: 'Tenable', slug: 'tenable', source: JobSource.WORKDAY, careersUrl: 'https://tenable.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Rapid7', slug: 'rapid7', source: JobSource.GREENHOUSE, careersUrl: 'https://rapid7.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rapid7/jobs', enabled: true, priority: 2 },
    { name: 'Tessian', slug: 'tessian', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tessian', apiEndpoint: 'https://api.lever.co/v0/postings/tessian?mode=json', enabled: true, priority: 2 },
    { name: 'Beyond Identity', slug: 'beyondidentity', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/beyondidentity', apiEndpoint: 'https://api.lever.co/v0/postings/beyondidentity?mode=json', enabled: true, priority: 2 },
    { name: 'Material Security', slug: 'materialsecurity', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/materialsecurity', apiEndpoint: 'https://api.lever.co/v0/postings/materialsecurity?mode=json', enabled: true, priority: 2 },
    { name: 'Grip Security', slug: 'gripsecurity', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/gripsecurity', apiEndpoint: 'https://api.lever.co/v0/postings/gripsecurity?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // E-COMMERCE & MARKETPLACE
    // ============================================================================
    { name: 'Faire', slug: 'faire-marketplace', source: JobSource.GREENHOUSE, careersUrl: 'https://faire.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/faire/jobs', enabled: true, priority: 1 },
    { name: 'Whatnot', slug: 'whatnot', source: JobSource.GREENHOUSE, careersUrl: 'https://whatnot.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/whatnot/jobs', enabled: true, priority: 2 },
    { name: 'Thrasio', slug: 'thrasio', source: JobSource.GREENHOUSE, careersUrl: 'https://thrasio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/thrasio/jobs', enabled: true, priority: 2 },
    { name: 'Bolt', slug: 'bolt', source: JobSource.GREENHOUSE, careersUrl: 'https://bolt.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bolt/jobs', enabled: true, priority: 2 },
    { name: 'Attentive', slug: 'attentive', source: JobSource.GREENHOUSE, careersUrl: 'https://attentive.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/attentive/jobs', enabled: true, priority: 2 },
    { name: 'Klaviyo', slug: 'klaviyo', source: JobSource.GREENHOUSE, careersUrl: 'https://klaviyo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/klaviyo/jobs', enabled: true, priority: 1 },
    { name: 'Gorgias', slug: 'gorgias', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/gorgias', apiEndpoint: 'https://api.lever.co/v0/postings/gorgias?mode=json', enabled: true, priority: 2 },
    { name: 'Yotpo', slug: 'yotpo', source: JobSource.GREENHOUSE, careersUrl: 'https://yotpo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/yotpo/jobs', enabled: true, priority: 2 },
    { name: 'Nosto', slug: 'nosto', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/nosto', apiEndpoint: 'https://api.lever.co/v0/postings/nosto?mode=json', enabled: true, priority: 2 },
    { name: 'Recharge', slug: 'recharge', source: JobSource.GREENHOUSE, careersUrl: 'https://rechargepayments.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/recharge/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // HR & RECRUITING TECH
    // ============================================================================
    { name: 'Greenhouse', slug: 'greenhouseio', source: JobSource.GREENHOUSE, careersUrl: 'https://greenhouse.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/greenhouse/jobs', enabled: true, priority: 2 },
    { name: 'Lever', slug: 'leverco', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/lever', apiEndpoint: 'https://api.lever.co/v0/postings/lever?mode=json', enabled: true, priority: 2 },
    { name: 'Ashby', slug: 'ashby', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/ashby', apiEndpoint: 'https://api.lever.co/v0/postings/ashby?mode=json', enabled: true, priority: 2 },
    { name: 'Gem', slug: 'gem', source: JobSource.GREENHOUSE, careersUrl: 'https://gem.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gem/jobs', enabled: true, priority: 2 },
    { name: 'BambooHR', slug: 'bamboohr', source: JobSource.GREENHOUSE, careersUrl: 'https://bamboohr.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bamboohr/jobs', enabled: true, priority: 2 },
    { name: 'Namely', slug: 'namely', source: JobSource.GREENHOUSE, careersUrl: 'https://namely.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/namely/jobs', enabled: true, priority: 2 },
    { name: 'Personio', slug: 'personio', source: JobSource.GREENHOUSE, careersUrl: 'https://personio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/personio/jobs', enabled: true, priority: 2 },
    { name: 'HiBob', slug: 'hibob', source: JobSource.GREENHOUSE, careersUrl: 'https://hibob.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hibob/jobs', enabled: true, priority: 2 },
    { name: 'Culture Amp', slug: 'cultureamp', source: JobSource.GREENHOUSE, careersUrl: 'https://cultureamp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cultureamp/jobs', enabled: true, priority: 2 },
    { name: 'Oyster', slug: 'oysterhr', source: JobSource.GREENHOUSE, careersUrl: 'https://oysterhr.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/oyster/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // DATA & ANALYTICS
    // ============================================================================
    { name: 'Fivetran', slug: 'fivetran', source: JobSource.GREENHOUSE, careersUrl: 'https://fivetran.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fivetran/jobs', enabled: true, priority: 1 },
    { name: 'Airbyte', slug: 'airbyte', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/airbyte', apiEndpoint: 'https://api.lever.co/v0/postings/airbyte?mode=json', enabled: true, priority: 2 },
    { name: 'Monte Carlo', slug: 'montecarlo', source: JobSource.GREENHOUSE, careersUrl: 'https://montecarlodata.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/montecarlo/jobs', enabled: true, priority: 2 },
    { name: 'Starburst', slug: 'starburst', source: JobSource.GREENHOUSE, careersUrl: 'https://starburst.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/starburst/jobs', enabled: true, priority: 2 },
    { name: 'Prefect', slug: 'prefect', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/prefect', apiEndpoint: 'https://api.lever.co/v0/postings/prefect?mode=json', enabled: true, priority: 2 },
    { name: 'Dagster', slug: 'dagster', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/dagster', apiEndpoint: 'https://api.lever.co/v0/postings/dagster?mode=json', enabled: true, priority: 2 },
    { name: 'Census', slug: 'census', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/census', apiEndpoint: 'https://api.lever.co/v0/postings/census?mode=json', enabled: true, priority: 2 },
    { name: 'Materialize', slug: 'materialize', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/materialize', apiEndpoint: 'https://api.lever.co/v0/postings/materialize?mode=json', enabled: true, priority: 2 },
    { name: 'Hex', slug: 'hex', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/hex', apiEndpoint: 'https://api.lever.co/v0/postings/hex?mode=json', enabled: true, priority: 2 },
    { name: 'Mode Analytics', slug: 'mode', source: JobSource.GREENHOUSE, careersUrl: 'https://mode.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mode/jobs', enabled: true, priority: 2 },
    { name: 'Lightdash', slug: 'lightdash', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/lightdash', apiEndpoint: 'https://api.lever.co/v0/postings/lightdash?mode=json', enabled: true, priority: 2 },
    { name: 'Evidence', slug: 'evidence', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/evidence', apiEndpoint: 'https://api.lever.co/v0/postings/evidence?mode=json', enabled: true, priority: 2 },
    { name: 'Preset', slug: 'preset', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/preset', apiEndpoint: 'https://api.lever.co/v0/postings/preset?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // MORE REAL ESTATE & PROPTECH
    // ============================================================================
    { name: 'Opendoor', slug: 'opendoor', source: JobSource.GREENHOUSE, careersUrl: 'https://opendoor.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/opendoor/jobs', enabled: true, priority: 2 },
    { name: 'Offerpad', slug: 'offerpad', source: JobSource.GREENHOUSE, careersUrl: 'https://offerpad.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/offerpad/jobs', enabled: true, priority: 2 },
    { name: 'Compass', slug: 'compass', source: JobSource.GREENHOUSE, careersUrl: 'https://compass.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/compass/jobs', enabled: true, priority: 2 },
    { name: 'Better.com', slug: 'bettercom', source: JobSource.GREENHOUSE, careersUrl: 'https://better.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/better/jobs', enabled: true, priority: 2 },
    { name: 'Roofstock', slug: 'roofstock', source: JobSource.GREENHOUSE, careersUrl: 'https://roofstock.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/roofstock/jobs', enabled: true, priority: 2 },
    { name: 'Buildium', slug: 'buildium', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/buildium', apiEndpoint: 'https://api.lever.co/v0/postings/buildium?mode=json', enabled: true, priority: 2 },
    { name: 'AppFolio', slug: 'appfolio', source: JobSource.GREENHOUSE, careersUrl: 'https://appfolio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/appfolio/jobs', enabled: true, priority: 2 },
    { name: 'RentSpree', slug: 'rentspree', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/rentspree', apiEndpoint: 'https://api.lever.co/v0/postings/rentspree?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // FORBES CLOUD 100 2024 - TOP PRIVATE CLOUD COMPANIES
    // ============================================================================
    { name: 'Databricks', slug: 'databricks', source: JobSource.GREENHOUSE, careersUrl: 'https://databricks.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/databricks/jobs', enabled: true, priority: 1 },
    { name: 'Ramp', slug: 'ramp', source: JobSource.GREENHOUSE, careersUrl: 'https://ramp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ramp/jobs', enabled: true, priority: 1 },
    { name: 'Notion', slug: 'notion', source: JobSource.GREENHOUSE, careersUrl: 'https://notion.so/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/notion/jobs', enabled: true, priority: 1 },
    { name: 'Figma', slug: 'figma', source: JobSource.GREENHOUSE, careersUrl: 'https://figma.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/figma/jobs', enabled: true, priority: 1 },
    { name: 'Seismic', slug: 'seismic', source: JobSource.GREENHOUSE, careersUrl: 'https://seismic.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/seismic/jobs', enabled: true, priority: 2 },
    { name: 'Contentful', slug: 'contentful', source: JobSource.GREENHOUSE, careersUrl: 'https://contentful.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/contentful/jobs', enabled: true, priority: 2 },
    { name: 'Airtable', slug: 'airtable', source: JobSource.GREENHOUSE, careersUrl: 'https://airtable.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/airtable/jobs', enabled: true, priority: 1 },
    { name: 'AppsFlyer', slug: 'appsflyer', source: JobSource.GREENHOUSE, careersUrl: 'https://appsflyer.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/appsflyer/jobs', enabled: true, priority: 2 },
    { name: 'Mural', slug: 'mural', source: JobSource.GREENHOUSE, careersUrl: 'https://mural.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mural/jobs', enabled: true, priority: 2 },
    { name: 'Confluent', slug: 'confluent', source: JobSource.GREENHOUSE, careersUrl: 'https://confluent.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/confluent/jobs', enabled: true, priority: 1 },
    { name: 'Gong', slug: 'gong', source: JobSource.GREENHOUSE, careersUrl: 'https://gong.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gong/jobs', enabled: true, priority: 1 },
    { name: 'Outreach', slug: 'outreach', source: JobSource.GREENHOUSE, careersUrl: 'https://outreach.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/outreach/jobs', enabled: true, priority: 2 },
    { name: 'SalesLoft', slug: 'salesloft', source: JobSource.GREENHOUSE, careersUrl: 'https://salesloft.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/salesloft/jobs', enabled: true, priority: 2 },
    { name: 'ZoomInfo', slug: 'zoominfo', source: JobSource.GREENHOUSE, careersUrl: 'https://zoominfo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zoominfo/jobs', enabled: true, priority: 2 },
    { name: 'Sprinklr', slug: 'sprinklr', source: JobSource.GREENHOUSE, careersUrl: 'https://sprinklr.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sprinklr/jobs', enabled: true, priority: 2 },
    { name: 'Freshworks', slug: 'freshworks', source: JobSource.GREENHOUSE, careersUrl: 'https://freshworks.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/freshworks/jobs', enabled: true, priority: 2 },
    { name: 'Celonis', slug: 'celonis', source: JobSource.GREENHOUSE, careersUrl: 'https://celonis.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/celonis/jobs', enabled: true, priority: 2 },
    { name: 'Tanzu', slug: 'tanzu', source: JobSource.GREENHOUSE, careersUrl: 'https://tanzu.vmware.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vmware/jobs', enabled: true, priority: 2 },
    { name: 'Immuta', slug: 'immuta', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/immuta', apiEndpoint: 'https://api.lever.co/v0/postings/immuta?mode=json', enabled: true, priority: 2 },
    { name: 'Alation', slug: 'alation', source: JobSource.GREENHOUSE, careersUrl: 'https://alation.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/alation/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // EDTECH COMPANIES
    // ============================================================================
    { name: 'Coursera', slug: 'coursera', source: JobSource.GREENHOUSE, careersUrl: 'https://coursera.org/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/coursera/jobs', enabled: true, priority: 1 },
    { name: 'Udemy', slug: 'udemy', source: JobSource.GREENHOUSE, careersUrl: 'https://udemy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/udemy/jobs', enabled: true, priority: 1 },
    { name: 'Duolingo', slug: 'duolingo', source: JobSource.GREENHOUSE, careersUrl: 'https://duolingo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/duolingo/jobs', enabled: true, priority: 1 },
    { name: 'Pluralsight', slug: 'pluralsight', source: JobSource.GREENHOUSE, careersUrl: 'https://pluralsight.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pluralsight/jobs', enabled: true, priority: 2 },
    { name: 'Skillshare', slug: 'skillshare', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/skillshare', apiEndpoint: 'https://api.lever.co/v0/postings/skillshare?mode=json', enabled: true, priority: 2 },
    { name: 'Udacity', slug: 'udacity', source: JobSource.GREENHOUSE, careersUrl: 'https://udacity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/udacity/jobs', enabled: true, priority: 2 },
    { name: 'Khan Academy', slug: 'khanacademy', source: JobSource.GREENHOUSE, careersUrl: 'https://khanacademy.org/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/khanacademy/jobs', enabled: true, priority: 2 },
    { name: 'Chegg', slug: 'chegg', source: JobSource.GREENHOUSE, careersUrl: 'https://chegg.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/chegg/jobs', enabled: true, priority: 2 },
    { name: 'Quizlet', slug: 'quizlet', source: JobSource.GREENHOUSE, careersUrl: 'https://quizlet.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/quizlet/jobs', enabled: true, priority: 2 },
    { name: 'Eruditus', slug: 'eruditus', source: JobSource.GREENHOUSE, careersUrl: 'https://eruditus.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/eruditus/jobs', enabled: true, priority: 2 },
    { name: 'Newsela', slug: 'newsela', source: JobSource.GREENHOUSE, careersUrl: 'https://newsela.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/newsela/jobs', enabled: true, priority: 2 },
    { name: 'Instructure', slug: 'instructure', source: JobSource.GREENHOUSE, careersUrl: 'https://instructure.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/instructure/jobs', enabled: true, priority: 2 },
    { name: 'Padlet', slug: 'padlet', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/padlet', apiEndpoint: 'https://api.lever.co/v0/postings/padlet?mode=json', enabled: true, priority: 2 },
    { name: 'Degreed', slug: 'degreed', source: JobSource.GREENHOUSE, careersUrl: 'https://degreed.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/degreed/jobs', enabled: true, priority: 2 },
    { name: 'Guild Education', slug: 'guildeducation', source: JobSource.GREENHOUSE, careersUrl: 'https://guild.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/guild/jobs', enabled: true, priority: 2 },
    { name: 'Handshake', slug: 'handshake', source: JobSource.GREENHOUSE, careersUrl: 'https://joinhandshake.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/handshake/jobs', enabled: true, priority: 2 },
    { name: 'Loom Education', slug: 'loomedu', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/loom', apiEndpoint: 'https://api.lever.co/v0/postings/loom?mode=json', enabled: true, priority: 2 },
    { name: 'BrainPOP', slug: 'brainpop', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/brainpop', apiEndpoint: 'https://api.lever.co/v0/postings/brainpop?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // SUPPLY CHAIN & LOGISTICS TECH
    // ============================================================================
    { name: 'Blue Yonder', slug: 'blueyonder', source: JobSource.WORKDAY, careersUrl: 'https://blueyonder.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Kinaxis', slug: 'kinaxis', source: JobSource.GREENHOUSE, careersUrl: 'https://kinaxis.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kinaxis/jobs', enabled: true, priority: 2 },
    { name: 'Manhattan Associates', slug: 'manhattanassociates', source: JobSource.WORKDAY, careersUrl: 'https://manh.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Descartes', slug: 'descartes', source: JobSource.GREENHOUSE, careersUrl: 'https://descartes.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/descartes/jobs', enabled: true, priority: 2 },
    { name: 'E2open', slug: 'e2open', source: JobSource.WORKDAY, careersUrl: 'https://e2open.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Coupa', slug: 'coupa', source: JobSource.GREENHOUSE, careersUrl: 'https://coupa.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/coupa/jobs', enabled: true, priority: 2 },
    { name: 'FourKites', slug: 'fourkites', source: JobSource.GREENHOUSE, careersUrl: 'https://fourkites.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fourkites/jobs', enabled: true, priority: 2 },
    { name: 'Project44', slug: 'project44', source: JobSource.GREENHOUSE, careersUrl: 'https://project44.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/project44/jobs', enabled: true, priority: 2 },
    { name: 'Samsara', slug: 'samsara', source: JobSource.GREENHOUSE, careersUrl: 'https://samsara.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/samsara/jobs', enabled: true, priority: 1 },
    { name: 'Convoy', slug: 'convoy', source: JobSource.GREENHOUSE, careersUrl: 'https://convoy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/convoy/jobs', enabled: true, priority: 2 },
    { name: 'Flexe', slug: 'flexe', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/flexe', apiEndpoint: 'https://api.lever.co/v0/postings/flexe?mode=json', enabled: true, priority: 2 },
    { name: 'Locus', slug: 'locus', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/locus', apiEndpoint: 'https://api.lever.co/v0/postings/locus?mode=json', enabled: true, priority: 2 },
    { name: 'Shippo', slug: 'shippo', source: JobSource.GREENHOUSE, careersUrl: 'https://goshippo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/shippo/jobs', enabled: true, priority: 2 },
    { name: 'ShipBob', slug: 'shipbob', source: JobSource.GREENHOUSE, careersUrl: 'https://shipbob.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/shipbob/jobs', enabled: true, priority: 2 },
    { name: 'Stord', slug: 'stord', source: JobSource.GREENHOUSE, careersUrl: 'https://stord.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/stord/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // INSURTECH COMPANIES
    // ============================================================================
    { name: 'Bestow', slug: 'bestow', source: JobSource.GREENHOUSE, careersUrl: 'https://bestow.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bestow/jobs', enabled: true, priority: 2 },
    { name: 'Hippo Insurance', slug: 'hippo', source: JobSource.GREENHOUSE, careersUrl: 'https://hippo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hippo/jobs', enabled: true, priority: 2 },
    { name: 'Root Insurance', slug: 'rootinsurance', source: JobSource.GREENHOUSE, careersUrl: 'https://root.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/root/jobs', enabled: true, priority: 2 },
    { name: 'Lemonade', slug: 'lemonade', source: JobSource.GREENHOUSE, careersUrl: 'https://lemonade.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lemonade/jobs', enabled: true, priority: 2 },
    { name: 'Clearcover', slug: 'clearcover', source: JobSource.GREENHOUSE, careersUrl: 'https://clearcover.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/clearcover/jobs', enabled: true, priority: 2 },
    { name: 'Next Insurance', slug: 'nextinsurance', source: JobSource.GREENHOUSE, careersUrl: 'https://nextinsurance.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/nextinsurance/jobs', enabled: true, priority: 2 },
    { name: 'Kin Insurance', slug: 'kininsurance', source: JobSource.GREENHOUSE, careersUrl: 'https://kin.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/kin/jobs', enabled: true, priority: 2 },
    { name: 'Ethos Life', slug: 'ethoslife', source: JobSource.GREENHOUSE, careersUrl: 'https://ethoslife.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ethos/jobs', enabled: true, priority: 2 },
    { name: 'Guidewire', slug: 'guidewire', source: JobSource.WORKDAY, careersUrl: 'https://guidewire.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Duck Creek', slug: 'duckcreek', source: JobSource.GREENHOUSE, careersUrl: 'https://duckcreek.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/duckcreek/jobs', enabled: true, priority: 2 },
    { name: 'Pie Insurance', slug: 'pieinsurance', source: JobSource.GREENHOUSE, careersUrl: 'https://pieinsurance.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pieinsurance/jobs', enabled: true, priority: 2 },
    { name: 'Coalition', slug: 'coalition', source: JobSource.GREENHOUSE, careersUrl: 'https://coalitioninc.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/coalition/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // LEGAL TECH COMPANIES
    // ============================================================================
    { name: 'Clio', slug: 'clio', source: JobSource.GREENHOUSE, careersUrl: 'https://clio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/clio/jobs', enabled: true, priority: 2 },
    { name: 'LegalZoom', slug: 'legalzoom', source: JobSource.GREENHOUSE, careersUrl: 'https://legalzoom.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/legalzoom/jobs', enabled: true, priority: 2 },
    { name: 'Ironclad', slug: 'ironclad', source: JobSource.GREENHOUSE, careersUrl: 'https://ironcladapp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ironclad/jobs', enabled: true, priority: 2 },
    { name: 'Relativity', slug: 'relativity', source: JobSource.GREENHOUSE, careersUrl: 'https://relativity.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/relativity/jobs', enabled: true, priority: 2 },
    { name: 'ContractPodAi', slug: 'contractpodai', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/contractpodai', apiEndpoint: 'https://api.lever.co/v0/postings/contractpodai?mode=json', enabled: true, priority: 2 },
    { name: 'Everlaw', slug: 'everlaw', source: JobSource.GREENHOUSE, careersUrl: 'https://everlaw.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/everlaw/jobs', enabled: true, priority: 2 },
    { name: 'LinkSquares', slug: 'linksquares', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/linksquares', apiEndpoint: 'https://api.lever.co/v0/postings/linksquares?mode=json', enabled: true, priority: 2 },
    { name: 'Juro', slug: 'juro', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/juro', apiEndpoint: 'https://api.lever.co/v0/postings/juro?mode=json', enabled: true, priority: 2 },
    { name: 'PracticePanther', slug: 'practicepanther', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/practicepanther', apiEndpoint: 'https://api.lever.co/v0/postings/practicepanther?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // CONSTRUCTION TECH & BUILDTECH
    // ============================================================================
    { name: 'Procore', slug: 'procore', source: JobSource.GREENHOUSE, careersUrl: 'https://procore.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/procore/jobs', enabled: true, priority: 1 },
    { name: 'PlanGrid', slug: 'plangrid', source: JobSource.GREENHOUSE, careersUrl: 'https://plangrid.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/plangrid/jobs', enabled: true, priority: 2 },
    { name: 'Katerra', slug: 'katerra', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/katerra', apiEndpoint: 'https://api.lever.co/v0/postings/katerra?mode=json', enabled: true, priority: 2 },
    { name: 'Built', slug: 'built', source: JobSource.GREENHOUSE, careersUrl: 'https://getbuilt.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/built/jobs', enabled: true, priority: 2 },
    { name: 'Bluebeam', slug: 'bluebeam', source: JobSource.GREENHOUSE, careersUrl: 'https://bluebeam.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bluebeam/jobs', enabled: true, priority: 2 },
    { name: 'OpenSpace', slug: 'openspace', source: JobSource.GREENHOUSE, careersUrl: 'https://openspace.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/openspace/jobs', enabled: true, priority: 2 },
    { name: 'Fieldwire', slug: 'fieldwire', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/fieldwire', apiEndpoint: 'https://api.lever.co/v0/postings/fieldwire?mode=json', enabled: true, priority: 2 },
    { name: 'Buildertrend-HQ', slug: 'buildertrend-hq', source: JobSource.GREENHOUSE, careersUrl: 'https://buildertrend.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/buildertrend/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // AGTECH & FOODTECH
    // ============================================================================
    { name: 'Farmers Business Network', slug: 'fbn', source: JobSource.GREENHOUSE, careersUrl: 'https://fbn.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fbn/jobs', enabled: true, priority: 2 },
    { name: 'Indigo Agriculture', slug: 'indigoag', source: JobSource.GREENHOUSE, careersUrl: 'https://indigoag.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/indigoag/jobs', enabled: true, priority: 2 },
    { name: 'Climate Corporation', slug: 'climatecorp', source: JobSource.GREENHOUSE, careersUrl: 'https://climate.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/climate/jobs', enabled: true, priority: 2 },
    { name: 'Bowery Farming', slug: 'bowery', source: JobSource.GREENHOUSE, careersUrl: 'https://boweryfarming.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bowery/jobs', enabled: true, priority: 2 },
    { name: 'Plenty Unlimited', slug: 'plenty', source: JobSource.GREENHOUSE, careersUrl: 'https://plenty.ag/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/plenty/jobs', enabled: true, priority: 2 },
    { name: 'AppHarvest', slug: 'appharvest', source: JobSource.GREENHOUSE, careersUrl: 'https://appharvest.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/appharvest/jobs', enabled: true, priority: 2 },
    { name: 'Apeel Sciences', slug: 'apeel', source: JobSource.GREENHOUSE, careersUrl: 'https://apeel.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/apeel/jobs', enabled: true, priority: 2 },
    { name: 'Impossible Foods', slug: 'impossiblefoods', source: JobSource.GREENHOUSE, careersUrl: 'https://impossiblefoods.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/impossiblefoods/jobs', enabled: true, priority: 1 },
    { name: 'Beyond Meat', slug: 'beyondmeat', source: JobSource.GREENHOUSE, careersUrl: 'https://beyondmeat.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/beyondmeat/jobs', enabled: true, priority: 2 },
    { name: 'Eat Just', slug: 'eatjust', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/eatjust', apiEndpoint: 'https://api.lever.co/v0/postings/eatjust?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // CLEANTECH & CLIMATE TECH
    // ============================================================================
    { name: 'Rivian', slug: 'rivian', source: JobSource.GREENHOUSE, careersUrl: 'https://rivian.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rivian/jobs', enabled: true, priority: 1 },
    { name: 'Lucid Motors', slug: 'lucid', source: JobSource.GREENHOUSE, careersUrl: 'https://lucidmotors.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lucid/jobs', enabled: true, priority: 1 },
    { name: 'ChargePoint', slug: 'chargepoint', source: JobSource.GREENHOUSE, careersUrl: 'https://chargepoint.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/chargepoint/jobs', enabled: true, priority: 2 },
    { name: 'Sunnova', slug: 'sunnova', source: JobSource.GREENHOUSE, careersUrl: 'https://sunnova.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sunnova/jobs', enabled: true, priority: 2 },
    { name: 'Sunrun', slug: 'sunrun', source: JobSource.GREENHOUSE, careersUrl: 'https://sunrun.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sunrun/jobs', enabled: true, priority: 2 },
    { name: 'Sila Nanotechnologies', slug: 'silanano', source: JobSource.GREENHOUSE, careersUrl: 'https://silanano.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/silanano/jobs', enabled: true, priority: 2 },
    { name: 'QuantumScape', slug: 'quantumscape', source: JobSource.GREENHOUSE, careersUrl: 'https://quantumscape.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/quantumscape/jobs', enabled: true, priority: 2 },
    { name: 'Redwood Materials', slug: 'redwoodmaterials', source: JobSource.GREENHOUSE, careersUrl: 'https://redwoodmaterials.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/redwoodmaterials/jobs', enabled: true, priority: 2 },
    { name: 'Span.io', slug: 'span', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/span', apiEndpoint: 'https://api.lever.co/v0/postings/span?mode=json', enabled: true, priority: 2 },
    { name: 'Arcadia', slug: 'arcadia', source: JobSource.GREENHOUSE, careersUrl: 'https://arcadia.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/arcadia/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // TRAVEL & HOSPITALITY TECH
    // ============================================================================
    { name: 'Airbnb', slug: 'airbnb', source: JobSource.GREENHOUSE, careersUrl: 'https://airbnb.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/airbnb/jobs', enabled: true, priority: 1 },
    { name: 'Expedia', slug: 'expedia', source: JobSource.WORKDAY, careersUrl: 'https://expedia.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Booking.com', slug: 'booking', source: JobSource.GREENHOUSE, careersUrl: 'https://booking.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/booking/jobs', enabled: true, priority: 1 },
    { name: 'Tripadvisor', slug: 'tripadvisor', source: JobSource.GREENHOUSE, careersUrl: 'https://tripadvisor.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tripadvisor/jobs', enabled: true, priority: 2 },
    { name: 'Hopper', slug: 'hopper', source: JobSource.GREENHOUSE, careersUrl: 'https://hopper.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hopper/jobs', enabled: true, priority: 2 },
    { name: 'Getaround', slug: 'getaround', source: JobSource.GREENHOUSE, careersUrl: 'https://getaround.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/getaround/jobs', enabled: true, priority: 2 },
    { name: 'Sonder', slug: 'sonder', source: JobSource.GREENHOUSE, careersUrl: 'https://sonder.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sonder/jobs', enabled: true, priority: 2 },
    { name: 'Vacasa', slug: 'vacasa', source: JobSource.GREENHOUSE, careersUrl: 'https://vacasa.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vacasa/jobs', enabled: true, priority: 2 },
    { name: 'Mews', slug: 'mews', source: JobSource.GREENHOUSE, careersUrl: 'https://mews.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mews/jobs', enabled: true, priority: 2 },
    { name: 'Cloudbeds', slug: 'cloudbeds', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/cloudbeds', apiEndpoint: 'https://api.lever.co/v0/postings/cloudbeds?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // MEDIA & ENTERTAINMENT TECH
    // ============================================================================
    { name: 'Spotify', slug: 'spotify', source: JobSource.GREENHOUSE, careersUrl: 'https://spotify.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/spotify/jobs', enabled: true, priority: 1 },
    { name: 'Netflix', slug: 'netflix', source: JobSource.GREENHOUSE, careersUrl: 'https://netflix.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/netflix/jobs', enabled: true, priority: 1 },
    { name: 'Hulu', slug: 'hulu', source: JobSource.GREENHOUSE, careersUrl: 'https://hulu.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hulu/jobs', enabled: true, priority: 2 },
    { name: 'SoundCloud', slug: 'soundcloud', source: JobSource.GREENHOUSE, careersUrl: 'https://soundcloud.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/soundcloud/jobs', enabled: true, priority: 2 },
    { name: 'Twitch', slug: 'twitch', source: JobSource.GREENHOUSE, careersUrl: 'https://twitch.tv/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/twitch/jobs', enabled: true, priority: 1 },
    { name: 'Vimeo', slug: 'vimeo', source: JobSource.GREENHOUSE, careersUrl: 'https://vimeo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vimeo/jobs', enabled: true, priority: 2 },
    { name: 'Deezer', slug: 'deezer', source: JobSource.GREENHOUSE, careersUrl: 'https://deezer.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/deezer/jobs', enabled: true, priority: 2 },
    { name: 'Tidal', slug: 'tidal', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tidal', apiEndpoint: 'https://api.lever.co/v0/postings/tidal?mode=json', enabled: true, priority: 2 },
    { name: 'Shutterstock', slug: 'shutterstock', source: JobSource.GREENHOUSE, careersUrl: 'https://shutterstock.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/shutterstock/jobs', enabled: true, priority: 2 },
    { name: 'Getty Images', slug: 'gettyimages', source: JobSource.GREENHOUSE, careersUrl: 'https://gettyimages.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/gettyimages/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // SOCIAL & COMMUNICATIONS
    // ============================================================================
    { name: 'Snap Inc', slug: 'snap', source: JobSource.GREENHOUSE, careersUrl: 'https://snap.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snap/jobs', enabled: true, priority: 1 },
    { name: 'Pinterest', slug: 'pinterest', source: JobSource.GREENHOUSE, careersUrl: 'https://pinterest.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pinterest/jobs', enabled: true, priority: 1 },
    { name: 'Reddit', slug: 'reddit', source: JobSource.GREENHOUSE, careersUrl: 'https://reddit.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/reddit/jobs', enabled: true, priority: 1 },
    { name: 'Twitter/X', slug: 'x', source: JobSource.GREENHOUSE, careersUrl: 'https://x.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/x/jobs', enabled: true, priority: 1 },
    { name: 'Nextdoor', slug: 'nextdoor', source: JobSource.GREENHOUSE, careersUrl: 'https://nextdoor.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/nextdoor/jobs', enabled: true, priority: 2 },
    { name: 'BeReal', slug: 'bereal', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/bereal', apiEndpoint: 'https://api.lever.co/v0/postings/bereal?mode=json', enabled: true, priority: 2 },
    { name: 'Flock Safety', slug: 'flocksafety', source: JobSource.GREENHOUSE, careersUrl: 'https://flocksafety.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/flocksafety/jobs', enabled: true, priority: 2 },
    { name: 'Community', slug: 'community', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/community', apiEndpoint: 'https://api.lever.co/v0/postings/community?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // RETAIL TECH
    // ============================================================================
    { name: 'Shopify', slug: 'shopify', source: JobSource.GREENHOUSE, careersUrl: 'https://shopify.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/shopify/jobs', enabled: true, priority: 1 },
    { name: 'Square', slug: 'square', source: JobSource.GREENHOUSE, careersUrl: 'https://squareup.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/square/jobs', enabled: true, priority: 1 },
    { name: 'Toast', slug: 'toast', source: JobSource.GREENHOUSE, careersUrl: 'https://toast.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/toast/jobs', enabled: true, priority: 1 },
    { name: 'Lightspeed', slug: 'lightspeed', source: JobSource.GREENHOUSE, careersUrl: 'https://lightspeedhq.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lightspeed/jobs', enabled: true, priority: 2 },
    { name: 'Vend', slug: 'vend', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/vend', apiEndpoint: 'https://api.lever.co/v0/postings/vend?mode=json', enabled: true, priority: 2 },
    { name: 'Olo', slug: 'olo', source: JobSource.GREENHOUSE, careersUrl: 'https://olo.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/olo/jobs', enabled: true, priority: 2 },
    { name: 'SpotOn', slug: 'spoton', source: JobSource.GREENHOUSE, careersUrl: 'https://spoton.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/spoton/jobs', enabled: true, priority: 2 },
    { name: 'MarketMan', slug: 'marketman', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/marketman', apiEndpoint: 'https://api.lever.co/v0/postings/marketman?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // ADDITIONAL NOTABLE TECH COMPANIES
    // ============================================================================
    { name: 'Palantir', slug: 'palantir', source: JobSource.GREENHOUSE, careersUrl: 'https://palantir.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/palantir/jobs', enabled: true, priority: 1 },
    { name: 'Snowflake', slug: 'snowflake', source: JobSource.GREENHOUSE, careersUrl: 'https://snowflake.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/snowflake/jobs', enabled: true, priority: 1 },
    { name: 'Splunk', slug: 'splunk', source: JobSource.GREENHOUSE, careersUrl: 'https://splunk.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/splunk/jobs', enabled: true, priority: 1 },
    { name: 'ServiceNow', slug: 'servicenow', source: JobSource.WORKDAY, careersUrl: 'https://servicenow.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Workday', slug: 'workday', source: JobSource.WORKDAY, careersUrl: 'https://workday.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Atlassian', slug: 'atlassian', source: JobSource.GREENHOUSE, careersUrl: 'https://atlassian.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/atlassian/jobs', enabled: true, priority: 1 },
    { name: 'Slack', slug: 'slack', source: JobSource.GREENHOUSE, careersUrl: 'https://slack.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/slack/jobs', enabled: true, priority: 1 },
    { name: 'Zoom', slug: 'zoom', source: JobSource.GREENHOUSE, careersUrl: 'https://zoom.us/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zoom/jobs', enabled: true, priority: 1 },
    { name: 'Box', slug: 'box', source: JobSource.GREENHOUSE, careersUrl: 'https://box.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/box/jobs', enabled: true, priority: 2 },
    { name: 'Dropbox', slug: 'dropbox', source: JobSource.GREENHOUSE, careersUrl: 'https://dropbox.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dropbox/jobs', enabled: true, priority: 1 },
    { name: 'HubSpot', slug: 'hubspot', source: JobSource.GREENHOUSE, careersUrl: 'https://hubspot.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hubspot/jobs', enabled: true, priority: 1 },
    { name: 'Okta', slug: 'okta', source: JobSource.GREENHOUSE, careersUrl: 'https://okta.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/okta/jobs', enabled: true, priority: 1 },
    { name: 'Twilio', slug: 'twilio', source: JobSource.GREENHOUSE, careersUrl: 'https://twilio.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/twilio/jobs', enabled: true, priority: 1 },
    { name: 'Datadog', slug: 'datadog', source: JobSource.GREENHOUSE, careersUrl: 'https://datadog.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/datadog/jobs', enabled: true, priority: 1 },
    { name: 'Cloudflare', slug: 'cloudflare', source: JobSource.GREENHOUSE, careersUrl: 'https://cloudflare.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cloudflare/jobs', enabled: true, priority: 1 },
    { name: 'Elastic', slug: 'elastic', source: JobSource.GREENHOUSE, careersUrl: 'https://elastic.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/elastic/jobs', enabled: true, priority: 1 },
    { name: 'HashiCorp', slug: 'hashicorp', source: JobSource.GREENHOUSE, careersUrl: 'https://hashicorp.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hashicorp/jobs', enabled: true, priority: 1 },
    { name: 'Confluent-Inc', slug: 'confluentinc', source: JobSource.GREENHOUSE, careersUrl: 'https://confluent.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/confluent/jobs', enabled: true, priority: 1 },
    { name: 'MongoDB', slug: 'mongodb', source: JobSource.GREENHOUSE, careersUrl: 'https://mongodb.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/mongodb/jobs', enabled: true, priority: 1 },
    { name: 'Redis', slug: 'redis', source: JobSource.GREENHOUSE, careersUrl: 'https://redis.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/redis/jobs', enabled: true, priority: 2 },
    { name: 'Supabase', slug: 'supabase', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/supabase', apiEndpoint: 'https://api.lever.co/v0/postings/supabase?mode=json', enabled: true, priority: 1 },
    { name: 'PagerDuty', slug: 'pagerduty', source: JobSource.GREENHOUSE, careersUrl: 'https://pagerduty.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/pagerduty/jobs', enabled: true, priority: 2 },
    { name: 'New Relic', slug: 'newrelic', source: JobSource.GREENHOUSE, careersUrl: 'https://newrelic.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/newrelic/jobs', enabled: true, priority: 2 },
    { name: 'Dynatrace', slug: 'dynatrace', source: JobSource.WORKDAY, careersUrl: 'https://dynatrace.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'AppDynamics', slug: 'appdynamics', source: JobSource.GREENHOUSE, careersUrl: 'https://appdynamics.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/appdynamics/jobs', enabled: true, priority: 2 },
    { name: 'Sumo Logic', slug: 'sumologic', source: JobSource.GREENHOUSE, careersUrl: 'https://sumologic.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/sumologic/jobs', enabled: true, priority: 2 },
    { name: 'LogicMonitor', slug: 'logicmonitor', source: JobSource.GREENHOUSE, careersUrl: 'https://logicmonitor.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/logicmonitor/jobs', enabled: true, priority: 2 },
    { name: 'Instana', slug: 'instana', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/instana', apiEndpoint: 'https://api.lever.co/v0/postings/instana?mode=json', enabled: true, priority: 2 },
    { name: 'Honeycomb', slug: 'honeycomb', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/honeycomb', apiEndpoint: 'https://api.lever.co/v0/postings/honeycomb?mode=json', enabled: true, priority: 2 },
    { name: 'Lightstep', slug: 'lightstep', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/lightstep', apiEndpoint: 'https://api.lever.co/v0/postings/lightstep?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // MOBILITY & TRANSPORTATION TECH
    // ============================================================================
    { name: 'Lime', slug: 'lime', source: JobSource.GREENHOUSE, careersUrl: 'https://li.me/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lime/jobs', enabled: true, priority: 2 },
    { name: 'Bird', slug: 'bird', source: JobSource.GREENHOUSE, careersUrl: 'https://bird.co/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/bird/jobs', enabled: true, priority: 2 },
    { name: 'Spin', slug: 'spin', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/spin', apiEndpoint: 'https://api.lever.co/v0/postings/spin?mode=json', enabled: true, priority: 2 },
    { name: 'Via', slug: 'via', source: JobSource.GREENHOUSE, careersUrl: 'https://ridewithvia.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/via/jobs', enabled: true, priority: 2 },
    { name: 'Lyft', slug: 'lyft', source: JobSource.GREENHOUSE, careersUrl: 'https://lyft.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lyft/jobs', enabled: true, priority: 1 },
    { name: 'Uber', slug: 'uber', source: JobSource.GREENHOUSE, careersUrl: 'https://uber.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/uber/jobs', enabled: true, priority: 1 },
    { name: 'Nuro', slug: 'nuro', source: JobSource.GREENHOUSE, careersUrl: 'https://nuro.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/nuro/jobs', enabled: true, priority: 2 },
    { name: 'Aurora Innovation', slug: 'aurora', source: JobSource.GREENHOUSE, careersUrl: 'https://aurora.tech/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/aurora/jobs', enabled: true, priority: 2 },
    { name: 'Argo AI', slug: 'argoai', source: JobSource.GREENHOUSE, careersUrl: 'https://argo.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/argo/jobs', enabled: true, priority: 2 },
    { name: 'Motional', slug: 'motional', source: JobSource.GREENHOUSE, careersUrl: 'https://motional.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/motional/jobs', enabled: true, priority: 2 },
    { name: 'Zoox', slug: 'zoox', source: JobSource.GREENHOUSE, careersUrl: 'https://zoox.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zoox/jobs', enabled: true, priority: 1 },
    { name: 'Cruise', slug: 'cruise', source: JobSource.GREENHOUSE, careersUrl: 'https://getcruise.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cruise/jobs', enabled: true, priority: 1 },
    { name: 'TuSimple', slug: 'tusimple', source: JobSource.GREENHOUSE, careersUrl: 'https://tusimple.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tusimple/jobs', enabled: true, priority: 2 },
    { name: 'Pony.ai', slug: 'ponyai', source: JobSource.GREENHOUSE, careersUrl: 'https://pony.ai/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/ponyai/jobs', enabled: true, priority: 2 },
    { name: 'Samsara-Fleet', slug: 'samsara-fleet', source: JobSource.GREENHOUSE, careersUrl: 'https://samsara.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/samsara/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // WEB3 & BLOCKCHAIN
    // ============================================================================
    { name: 'Alchemy', slug: 'alchemy-web3', source: JobSource.GREENHOUSE, careersUrl: 'https://alchemy.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/alchemy/jobs', enabled: true, priority: 1 },
    { name: 'Chainlink Labs', slug: 'chainlinklabs', source: JobSource.GREENHOUSE, careersUrl: 'https://chainlinklabs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/chainlinklabs/jobs', enabled: true, priority: 2 },
    { name: 'Consensys', slug: 'consensys', source: JobSource.GREENHOUSE, careersUrl: 'https://consensys.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/consensys/jobs', enabled: true, priority: 2 },
    { name: 'OpenSea', slug: 'opensea', source: JobSource.GREENHOUSE, careersUrl: 'https://opensea.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/opensea/jobs', enabled: true, priority: 2 },
    { name: 'Dapper Labs', slug: 'dapperlabs', source: JobSource.GREENHOUSE, careersUrl: 'https://dapperlabs.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dapperlabs/jobs', enabled: true, priority: 2 },
    { name: 'Polygon Labs', slug: 'polygonlabs', source: JobSource.GREENHOUSE, careersUrl: 'https://polygon.technology/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/polygonlabs/jobs', enabled: true, priority: 2 },
    { name: 'Circle', slug: 'circle', source: JobSource.GREENHOUSE, careersUrl: 'https://circle.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/circle/jobs', enabled: true, priority: 2 },
    { name: 'Fireblocks', slug: 'fireblocks', source: JobSource.GREENHOUSE, careersUrl: 'https://fireblocks.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fireblocks/jobs', enabled: true, priority: 2 },
    { name: 'Anchorage Digital', slug: 'anchorage', source: JobSource.GREENHOUSE, careersUrl: 'https://anchorage.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/anchorage/jobs', enabled: true, priority: 2 },
    { name: 'Paxos', slug: 'paxos', source: JobSource.GREENHOUSE, careersUrl: 'https://paxos.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/paxos/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // COMMUNICATION & COLLABORATION
    // ============================================================================
    { name: 'Calendly', slug: 'calendly', source: JobSource.GREENHOUSE, careersUrl: 'https://calendly.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/calendly/jobs', enabled: true, priority: 2 },
    { name: 'Loom-App', slug: 'loom-app', source: JobSource.GREENHOUSE, careersUrl: 'https://loom.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/loom/jobs', enabled: true, priority: 2 },
    { name: 'Around', slug: 'around', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/around', apiEndpoint: 'https://api.lever.co/v0/postings/around?mode=json', enabled: true, priority: 2 },
    { name: 'Whereby', slug: 'whereby', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/whereby', apiEndpoint: 'https://api.lever.co/v0/postings/whereby?mode=json', enabled: true, priority: 2 },
    { name: 'Hopin', slug: 'hopin', source: JobSource.GREENHOUSE, careersUrl: 'https://hopin.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hopin/jobs', enabled: true, priority: 2 },
    { name: 'Webex', slug: 'webex', source: JobSource.WORKDAY, careersUrl: 'https://cisco.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'RingCentral', slug: 'ringcentral', source: JobSource.WORKDAY, careersUrl: 'https://ringcentral.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Vonage', slug: 'vonage', source: JobSource.GREENHOUSE, careersUrl: 'https://vonage.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/vonage/jobs', enabled: true, priority: 2 },
    { name: 'Dialpad', slug: 'dialpad', source: JobSource.GREENHOUSE, careersUrl: 'https://dialpad.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dialpad/jobs', enabled: true, priority: 2 },
    { name: 'Aircall', slug: 'aircall', source: JobSource.GREENHOUSE, careersUrl: 'https://aircall.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/aircall/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // MARKETING & ADVERTISING TECH
    // ============================================================================
    { name: 'HubSpot-Marketing', slug: 'hubspot-marketing', source: JobSource.GREENHOUSE, careersUrl: 'https://hubspot.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/hubspot/jobs', enabled: true, priority: 2 },
    { name: 'Kochava', slug: 'kochava', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/kochava', apiEndpoint: 'https://api.lever.co/v0/postings/kochava?mode=json', enabled: true, priority: 2 },
    { name: 'Branch', slug: 'branch', source: JobSource.GREENHOUSE, careersUrl: 'https://branch.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/branch/jobs', enabled: true, priority: 2 },
    { name: 'Adjust', slug: 'adjust', source: JobSource.GREENHOUSE, careersUrl: 'https://adjust.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/adjust/jobs', enabled: true, priority: 2 },
    { name: 'Braze', slug: 'braze', source: JobSource.GREENHOUSE, careersUrl: 'https://braze.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/braze/jobs', enabled: true, priority: 2 },
    { name: 'Iterable', slug: 'iterable', source: JobSource.GREENHOUSE, careersUrl: 'https://iterable.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/iterable/jobs', enabled: true, priority: 2 },
    { name: 'Customer.io', slug: 'customerio', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/customer.io', apiEndpoint: 'https://api.lever.co/v0/postings/customer.io?mode=json', enabled: true, priority: 2 },
    { name: 'Segment-Marketing', slug: 'segment-marketing', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/segment', apiEndpoint: 'https://api.lever.co/v0/postings/segment?mode=json', enabled: true, priority: 2 },
    { name: 'Heap', slug: 'heap', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/heap', apiEndpoint: 'https://api.lever.co/v0/postings/heap?mode=json', enabled: true, priority: 2 },
    { name: 'FullStory', slug: 'fullstory', source: JobSource.GREENHOUSE, careersUrl: 'https://fullstory.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/fullstory/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // DESIGN & CREATIVE TOOLS
    // ============================================================================
    { name: 'InVision', slug: 'invision', source: JobSource.GREENHOUSE, careersUrl: 'https://invision.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/invision/jobs', enabled: true, priority: 2 },
    { name: 'Sketch', slug: 'sketch', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/sketch', apiEndpoint: 'https://api.lever.co/v0/postings/sketch?mode=json', enabled: true, priority: 2 },
    { name: 'Framer', slug: 'framer', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/framer', apiEndpoint: 'https://api.lever.co/v0/postings/framer?mode=json', enabled: true, priority: 2 },
    { name: 'Principle', slug: 'principle', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/principle', apiEndpoint: 'https://api.lever.co/v0/postings/principle?mode=json', enabled: true, priority: 2 },
    { name: 'Abstract', slug: 'abstract', source: JobSource.GREENHOUSE, careersUrl: 'https://abstract.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/abstract/jobs', enabled: true, priority: 2 },
    { name: 'Webflow', slug: 'webflow', source: JobSource.GREENHOUSE, careersUrl: 'https://webflow.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/webflow/jobs', enabled: true, priority: 1 },
    { name: 'Squarespace', slug: 'squarespace', source: JobSource.GREENHOUSE, careersUrl: 'https://squarespace.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/squarespace/jobs', enabled: true, priority: 2 },
    { name: 'Pitch', slug: 'pitch', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/pitch', apiEndpoint: 'https://api.lever.co/v0/postings/pitch?mode=json', enabled: true, priority: 2 },
    { name: 'Gumroad', slug: 'gumroad', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/gumroad', apiEndpoint: 'https://api.lever.co/v0/postings/gumroad?mode=json', enabled: true, priority: 2 },
    { name: 'Descript', slug: 'descript', source: JobSource.GREENHOUSE, careersUrl: 'https://descript.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/descript/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // PRODUCTIVITY & PERSONAL TOOLS
    // ============================================================================
    { name: '1Password', slug: '1password', source: JobSource.GREENHOUSE, careersUrl: 'https://1password.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/1password/jobs', enabled: true, priority: 2 },
    { name: 'Bitwarden', slug: 'bitwarden', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/bitwarden', apiEndpoint: 'https://api.lever.co/v0/postings/bitwarden?mode=json', enabled: true, priority: 2 },
    { name: 'LastPass', slug: 'lastpass', source: JobSource.GREENHOUSE, careersUrl: 'https://lastpass.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/lastpass/jobs', enabled: true, priority: 2 },
    { name: 'Dashlane', slug: 'dashlane', source: JobSource.GREENHOUSE, careersUrl: 'https://dashlane.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/dashlane/jobs', enabled: true, priority: 2 },
    { name: 'Todoist', slug: 'todoist', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/todoist', apiEndpoint: 'https://api.lever.co/v0/postings/todoist?mode=json', enabled: true, priority: 2 },
    { name: 'Evernote', slug: 'evernote', source: JobSource.GREENHOUSE, careersUrl: 'https://evernote.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/evernote/jobs', enabled: true, priority: 2 },
    { name: 'Bear', slug: 'bear', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/bear', apiEndpoint: 'https://api.lever.co/v0/postings/bear?mode=json', enabled: true, priority: 2 },
    { name: 'Obsidian', slug: 'obsidian', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/obsidian', apiEndpoint: 'https://api.lever.co/v0/postings/obsidian?mode=json', enabled: true, priority: 2 },
    { name: 'Roam Research', slug: 'roamresearch', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/roamresearch', apiEndpoint: 'https://api.lever.co/v0/postings/roamresearch?mode=json', enabled: true, priority: 2 },
    { name: 'Coda', slug: 'coda', source: JobSource.GREENHOUSE, careersUrl: 'https://coda.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/coda/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // DEVELOPER PLATFORMS & APIs
    // ============================================================================
    { name: 'Postman', slug: 'postman', source: JobSource.GREENHOUSE, careersUrl: 'https://postman.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/postman/jobs', enabled: true, priority: 1 },
    { name: 'Stoplight', slug: 'stoplight', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/stoplight', apiEndpoint: 'https://api.lever.co/v0/postings/stoplight?mode=json', enabled: true, priority: 2 },
    { name: 'Insomnia', slug: 'insomnia', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/insomnia', apiEndpoint: 'https://api.lever.co/v0/postings/insomnia?mode=json', enabled: true, priority: 2 },
    { name: 'RapidAPI', slug: 'rapidapi', source: JobSource.GREENHOUSE, careersUrl: 'https://rapidapi.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/rapidapi/jobs', enabled: true, priority: 2 },
    { name: 'Apigee', slug: 'apigee', source: JobSource.GREENHOUSE, careersUrl: 'https://cloud.google.com/apigee', apiEndpoint: 'https://api.greenhouse.io/v1/boards/google/jobs', enabled: true, priority: 2 },
    { name: 'MuleSoft', slug: 'mulesoft', source: JobSource.WORKDAY, careersUrl: 'https://salesforce.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Apiary', slug: 'apiary', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/apiary', apiEndpoint: 'https://api.lever.co/v0/postings/apiary?mode=json', enabled: true, priority: 2 },
    { name: 'SwaggerHub', slug: 'swaggerhub', source: JobSource.GREENHOUSE, careersUrl: 'https://swagger.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/smartbear/jobs', enabled: true, priority: 2 },
    { name: 'ReadMe', slug: 'readme', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/readme', apiEndpoint: 'https://api.lever.co/v0/postings/readme?mode=json', enabled: true, priority: 2 },
    { name: 'Docusaurus', slug: 'docusaurus', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/meta', apiEndpoint: 'https://api.lever.co/v0/postings/meta?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // ADDITIONAL ENTERPRISE & B2B
    // ============================================================================
    { name: 'UiPath', slug: 'uipath', source: JobSource.GREENHOUSE, careersUrl: 'https://uipath.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/uipath/jobs', enabled: true, priority: 1 },
    { name: 'Automation Anywhere', slug: 'automationanywhere', source: JobSource.GREENHOUSE, careersUrl: 'https://automationanywhere.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/automationanywhere/jobs', enabled: true, priority: 2 },
    { name: 'BluePrism', slug: 'blueprism', source: JobSource.GREENHOUSE, careersUrl: 'https://blueprism.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/blueprism/jobs', enabled: true, priority: 2 },
    { name: 'Power Automate', slug: 'powerautomate', source: JobSource.WORKDAY, careersUrl: 'https://microsoft.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Workato', slug: 'workato', source: JobSource.GREENHOUSE, careersUrl: 'https://workato.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/workato/jobs', enabled: true, priority: 2 },
    { name: 'Tray.io', slug: 'trayio', source: JobSource.GREENHOUSE, careersUrl: 'https://tray.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/tray/jobs', enabled: true, priority: 2 },
    { name: 'Zapier', slug: 'zapier', source: JobSource.GREENHOUSE, careersUrl: 'https://zapier.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/zapier/jobs', enabled: true, priority: 1 },
    { name: 'Make', slug: 'make', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/make', apiEndpoint: 'https://api.lever.co/v0/postings/make?mode=json', enabled: true, priority: 2 },
    { name: 'n8n', slug: 'n8n', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/n8n', apiEndpoint: 'https://api.lever.co/v0/postings/n8n?mode=json', enabled: true, priority: 2 },
    { name: 'Pipedream', slug: 'pipedream', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/pipedream', apiEndpoint: 'https://api.lever.co/v0/postings/pipedream?mode=json', enabled: true, priority: 2 },

    // ============================================================================
    // FINAL COMPANIES TO REACH 1000+
    // ============================================================================
    { name: 'Linear', slug: 'linear', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/linear', apiEndpoint: 'https://api.lever.co/v0/postings/linear?mode=json', enabled: true, priority: 1 },
    { name: 'Railway', slug: 'railway', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/railway', apiEndpoint: 'https://api.lever.co/v0/postings/railway?mode=json', enabled: true, priority: 2 },
    { name: 'Render', slug: 'render', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/render', apiEndpoint: 'https://api.lever.co/v0/postings/render?mode=json', enabled: true, priority: 2 },
    { name: 'Fly.io', slug: 'flyio', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/fly.io', apiEndpoint: 'https://api.lever.co/v0/postings/fly.io?mode=json', enabled: true, priority: 2 },
    { name: 'Resend-API', slug: 'resend-api', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/resend', apiEndpoint: 'https://api.lever.co/v0/postings/resend?mode=json', enabled: true, priority: 2 },
    { name: 'Turso', slug: 'turso', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/turso', apiEndpoint: 'https://api.lever.co/v0/postings/turso?mode=json', enabled: true, priority: 2 },
    { name: 'Neon', slug: 'neon', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/neon', apiEndpoint: 'https://api.lever.co/v0/postings/neon?mode=json', enabled: true, priority: 2 },
    { name: 'Upstash', slug: 'upstash', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/upstash', apiEndpoint: 'https://api.lever.co/v0/postings/upstash?mode=json', enabled: true, priority: 2 },
    { name: 'Inngest-AI', slug: 'inngest-ai', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/inngest', apiEndpoint: 'https://api.lever.co/v0/postings/inngest?mode=json', enabled: true, priority: 2 },
    { name: 'Axiom', slug: 'axiom', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/axiom', apiEndpoint: 'https://api.lever.co/v0/postings/axiom?mode=json', enabled: true, priority: 2 },
    { name: 'Trigger.dev', slug: 'triggerdev', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/trigger', apiEndpoint: 'https://api.lever.co/v0/postings/trigger?mode=json', enabled: true, priority: 2 },
    { name: 'Convex', slug: 'convex', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/convex', apiEndpoint: 'https://api.lever.co/v0/postings/convex?mode=json', enabled: true, priority: 2 },
    { name: 'Tinybird', slug: 'tinybird', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tinybird', apiEndpoint: 'https://api.lever.co/v0/postings/tinybird?mode=json', enabled: true, priority: 2 },
    { name: 'Drizzle', slug: 'drizzle', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/drizzle', apiEndpoint: 'https://api.lever.co/v0/postings/drizzle?mode=json', enabled: true, priority: 2 },
    { name: 'Cal.com', slug: 'calcom', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/calcom', apiEndpoint: 'https://api.lever.co/v0/postings/calcom?mode=json', enabled: true, priority: 2 },
    { name: 'Dub', slug: 'dub', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/dub', apiEndpoint: 'https://api.lever.co/v0/postings/dub?mode=json', enabled: true, priority: 2 },
    { name: 'Polar', slug: 'polar', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/polar', apiEndpoint: 'https://api.lever.co/v0/postings/polar?mode=json', enabled: true, priority: 2 },
    { name: 'Resend-Mail', slug: 'resend-mail', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/resend', apiEndpoint: 'https://api.lever.co/v0/postings/resend?mode=json', enabled: true, priority: 2 },
    { name: 'Loops', slug: 'loops', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/loops', apiEndpoint: 'https://api.lever.co/v0/postings/loops?mode=json', enabled: true, priority: 2 },
    { name: 'Unkey', slug: 'unkey', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/unkey', apiEndpoint: 'https://api.lever.co/v0/postings/unkey?mode=json', enabled: true, priority: 2 },

    // FINAL PUSH TO 1000+
    { name: 'Tremor Labs', slug: 'tremorlabs', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tremor', apiEndpoint: 'https://api.lever.co/v0/postings/tremor?mode=json', enabled: true, priority: 2 },
    { name: 'ShadCN', slug: 'shadcn', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/shadcn', apiEndpoint: 'https://api.lever.co/v0/postings/shadcn?mode=json', enabled: true, priority: 2 },
    { name: 'Radix UI', slug: 'radixui', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/radix', apiEndpoint: 'https://api.lever.co/v0/postings/radix?mode=json', enabled: true, priority: 2 },
    { name: 'Tailwind Labs', slug: 'tailwind-labs', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/tailwindlabs', apiEndpoint: 'https://api.lever.co/v0/postings/tailwindlabs?mode=json', enabled: true, priority: 1 },
    { name: 'Prisma.io', slug: 'prismaio', source: JobSource.GREENHOUSE, careersUrl: 'https://prisma.io/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/prisma/jobs', enabled: true, priority: 1 },
    { name: 'Planetscale', slug: 'planetscale-db', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/planetscale', apiEndpoint: 'https://api.lever.co/v0/postings/planetscale?mode=json', enabled: true, priority: 1 },
    { name: 'Supabase-AI', slug: 'supabase-ai', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/supabase', apiEndpoint: 'https://api.lever.co/v0/postings/supabase?mode=json', enabled: true, priority: 1 },
    { name: 'Clerk-Auth', slug: 'clerk-auth', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/clerk', apiEndpoint: 'https://api.lever.co/v0/postings/clerk?mode=json', enabled: true, priority: 1 },
    { name: 'Mux Video', slug: 'muxvideo', source: JobSource.LEVER, careersUrl: 'https://jobs.lever.co/mux', apiEndpoint: 'https://api.lever.co/v0/postings/mux?mode=json', enabled: true, priority: 2 },
    { name: 'Cloudinary', slug: 'cloudinary-img', source: JobSource.GREENHOUSE, careersUrl: 'https://cloudinary.com/careers', apiEndpoint: 'https://api.greenhouse.io/v1/boards/cloudinary/jobs', enabled: true, priority: 2 },

    // ============================================================================
    // MAJOR WORKDAY COMPANIES - FORTUNE 500 & ENTERPRISE (170+ entries)
    // ============================================================================

    // BANKING & FINANCIAL SERVICES
    { name: 'USAA', slug: 'usaa', source: JobSource.WORKDAY, careersUrl: 'https://usaa.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Charles Schwab', slug: 'schwab', source: JobSource.WORKDAY, careersUrl: 'https://schwab.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'TD Bank', slug: 'tdbank', source: JobSource.WORKDAY, careersUrl: 'https://td.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'PNC Financial', slug: 'pnc', source: JobSource.WORKDAY, careersUrl: 'https://pnc.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Citizens Bank', slug: 'citizens', source: JobSource.WORKDAY, careersUrl: 'https://citizens.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Fifth Third Bank', slug: 'fifththird', source: JobSource.WORKDAY, careersUrl: 'https://fifththird.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Truist', slug: 'truist', source: JobSource.WORKDAY, careersUrl: 'https://truist.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'KeyBank', slug: 'keybank', source: JobSource.WORKDAY, careersUrl: 'https://key.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Regions Bank', slug: 'regions', source: JobSource.WORKDAY, careersUrl: 'https://regions.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Huntington Bank', slug: 'huntington', source: JobSource.WORKDAY, careersUrl: 'https://huntington.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'M&T Bank', slug: 'mtbank', source: JobSource.WORKDAY, careersUrl: 'https://mtb.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Synchrony Financial', slug: 'synchrony', source: JobSource.WORKDAY, careersUrl: 'https://synchrony.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Ally Financial', slug: 'ally', source: JobSource.WORKDAY, careersUrl: 'https://ally.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Discover Financial', slug: 'discover', source: JobSource.WORKDAY, careersUrl: 'https://discover.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Northern Trust', slug: 'northerntrust', source: JobSource.WORKDAY, careersUrl: 'https://northerntrust.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'State Street', slug: 'statestreet', source: JobSource.WORKDAY, careersUrl: 'https://statestreet.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },

    // HEALTHCARE & PHARMA
    { name: 'UnitedHealth Group', slug: 'unitedhealthgroup', source: JobSource.WORKDAY, careersUrl: 'https://uhg.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'CVS Health', slug: 'cvs', source: JobSource.WORKDAY, careersUrl: 'https://cvs.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Humana', slug: 'humana', source: JobSource.WORKDAY, careersUrl: 'https://humana.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Anthem', slug: 'anthem', source: JobSource.WORKDAY, careersUrl: 'https://anthem.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Cigna', slug: 'cigna', source: JobSource.WORKDAY, careersUrl: 'https://cigna.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Centene', slug: 'centene', source: JobSource.WORKDAY, careersUrl: 'https://centene.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Molina Healthcare', slug: 'molina', source: JobSource.WORKDAY, careersUrl: 'https://molina.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'DaVita', slug: 'davita', source: JobSource.WORKDAY, careersUrl: 'https://davita.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'HCA Healthcare', slug: 'hca', source: JobSource.WORKDAY, careersUrl: 'https://hca.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Tenet Healthcare', slug: 'tenet', source: JobSource.WORKDAY, careersUrl: 'https://tenet.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Community Health Systems', slug: 'chs', source: JobSource.WORKDAY, careersUrl: 'https://chs.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Pfizer', slug: 'pfizer', source: JobSource.WORKDAY, careersUrl: 'https://pfizer.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Johnson & Johnson', slug: 'jnj', source: JobSource.WORKDAY, careersUrl: 'https://jnj.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'AbbVie', slug: 'abbvie', source: JobSource.WORKDAY, careersUrl: 'https://abbvie.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Merck', slug: 'merck', source: JobSource.WORKDAY, careersUrl: 'https://merck.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Bristol-Myers Squibb', slug: 'bms', source: JobSource.WORKDAY, careersUrl: 'https://bms.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Eli Lilly', slug: 'lilly', source: JobSource.WORKDAY, careersUrl: 'https://lilly.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Amgen', slug: 'amgen', source: JobSource.WORKDAY, careersUrl: 'https://amgen.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Gilead Sciences', slug: 'gilead', source: JobSource.WORKDAY, careersUrl: 'https://gilead.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Biogen', slug: 'biogen', source: JobSource.WORKDAY, careersUrl: 'https://biogen.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Regeneron', slug: 'regeneron', source: JobSource.WORKDAY, careersUrl: 'https://regeneron.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Vertex Pharma', slug: 'vertex', source: JobSource.WORKDAY, careersUrl: 'https://vertex.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Baxter International', slug: 'baxter', source: JobSource.WORKDAY, careersUrl: 'https://baxter.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Boston Scientific', slug: 'bsc', source: JobSource.WORKDAY, careersUrl: 'https://bsc.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Stryker', slug: 'stryker', source: JobSource.WORKDAY, careersUrl: 'https://stryker.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Medtronic', slug: 'medtronic', source: JobSource.WORKDAY, careersUrl: 'https://medtronic.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Abbott Labs', slug: 'abbott', source: JobSource.WORKDAY, careersUrl: 'https://abbott.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },

    // RETAIL & CONSUMER
    { name: 'Costco', slug: 'costco', source: JobSource.WORKDAY, careersUrl: 'https://costco.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Home Depot', slug: 'homedepot', source: JobSource.WORKDAY, careersUrl: 'https://homedepot.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Lowes', slug: 'lowes', source: JobSource.WORKDAY, careersUrl: 'https://lowes.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Best Buy', slug: 'bestbuy', source: JobSource.WORKDAY, careersUrl: 'https://bestbuy.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Macys', slug: 'macys', source: JobSource.WORKDAY, careersUrl: 'https://macys.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Kohls', slug: 'kohls', source: JobSource.WORKDAY, careersUrl: 'https://kohls.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Nordstrom', slug: 'nordstrom', source: JobSource.WORKDAY, careersUrl: 'https://nordstrom.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Gap Inc', slug: 'gap', source: JobSource.WORKDAY, careersUrl: 'https://gap.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'TJX Companies', slug: 'tjx', source: JobSource.WORKDAY, careersUrl: 'https://tjx.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Ross Stores', slug: 'ross', source: JobSource.WORKDAY, careersUrl: 'https://rossstores.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Dollar General', slug: 'dollargeneral', source: JobSource.WORKDAY, careersUrl: 'https://dollargeneral.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Dollar Tree', slug: 'dollartree', source: JobSource.WORKDAY, careersUrl: 'https://dollartree.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'AutoZone', slug: 'autozone', source: JobSource.WORKDAY, careersUrl: 'https://autozone.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'OReilly Auto', slug: 'oreillyauto', source: JobSource.WORKDAY, careersUrl: 'https://oreilly.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Advance Auto Parts', slug: 'advanceauto', source: JobSource.WORKDAY, careersUrl: 'https://advanceauto.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Kroger', slug: 'kroger', source: JobSource.WORKDAY, careersUrl: 'https://kroger.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Albertsons', slug: 'albertsons', source: JobSource.WORKDAY, careersUrl: 'https://albertsons.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Publix', slug: 'publix', source: JobSource.WORKDAY, careersUrl: 'https://publix.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Whole Foods', slug: 'wholefoods', source: JobSource.WORKDAY, careersUrl: 'https://wholefoods.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Trader Joes', slug: 'traderjoes', source: JobSource.WORKDAY, careersUrl: 'https://traderjoes.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Starbucks', slug: 'starbucks', source: JobSource.WORKDAY, careersUrl: 'https://starbucks.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'McDonalds', slug: 'mcdonalds', source: JobSource.WORKDAY, careersUrl: 'https://mcdonalds.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Chipotle', slug: 'chipotle', source: JobSource.WORKDAY, careersUrl: 'https://chipotle.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Yum Brands', slug: 'yum', source: JobSource.WORKDAY, careersUrl: 'https://yum.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Nike', slug: 'nike', source: JobSource.WORKDAY, careersUrl: 'https://nike.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Under Armour', slug: 'underarmour', source: JobSource.WORKDAY, careersUrl: 'https://underarmour.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'VF Corporation', slug: 'vfc', source: JobSource.WORKDAY, careersUrl: 'https://vfc.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Hanesbrands', slug: 'hanes', source: JobSource.WORKDAY, careersUrl: 'https://hanes.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'PVH Corp', slug: 'pvh', source: JobSource.WORKDAY, careersUrl: 'https://pvh.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // TECHNOLOGY & SEMICONDUCTOR
    { name: 'Broadcom', slug: 'broadcom', source: JobSource.WORKDAY, careersUrl: 'https://broadcom.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Micron Technology', slug: 'micron', source: JobSource.WORKDAY, careersUrl: 'https://micron.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Western Digital', slug: 'westerndigital', source: JobSource.WORKDAY, careersUrl: 'https://wdc.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Seagate', slug: 'seagate', source: JobSource.WORKDAY, careersUrl: 'https://seagate.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'NetApp', slug: 'netapp', source: JobSource.WORKDAY, careersUrl: 'https://netapp.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Pure Storage', slug: 'purestorage', source: JobSource.WORKDAY, careersUrl: 'https://purestorage.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Nutanix', slug: 'nutanix', source: JobSource.WORKDAY, careersUrl: 'https://nutanix.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Zscaler', slug: 'zscaler', source: JobSource.WORKDAY, careersUrl: 'https://zscaler.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Fortinet', slug: 'fortinet', source: JobSource.WORKDAY, careersUrl: 'https://fortinet.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Palo Alto Networks', slug: 'paloalto', source: JobSource.WORKDAY, careersUrl: 'https://paloaltonetworks.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'CrowdStrike', slug: 'crowdstrike', source: JobSource.WORKDAY, careersUrl: 'https://crowdstrike.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'SentinelOne', slug: 'sentinelone', source: JobSource.WORKDAY, careersUrl: 'https://sentinelone.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Qualcomm', slug: 'qualcomm', source: JobSource.WORKDAY, careersUrl: 'https://qualcomm.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Texas Instruments', slug: 'ti', source: JobSource.WORKDAY, careersUrl: 'https://ti.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Analog Devices', slug: 'adi', source: JobSource.WORKDAY, careersUrl: 'https://analogdevices.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'ON Semiconductor', slug: 'onsemi', source: JobSource.WORKDAY, careersUrl: 'https://onsemi.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Skyworks', slug: 'skyworks', source: JobSource.WORKDAY, careersUrl: 'https://skyworks.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Qorvo', slug: 'qorvo', source: JobSource.WORKDAY, careersUrl: 'https://qorvo.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Marvell', slug: 'marvell', source: JobSource.WORKDAY, careersUrl: 'https://marvell.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'VMware', slug: 'vmware', source: JobSource.WORKDAY, careersUrl: 'https://vmware.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Citrix', slug: 'citrix', source: JobSource.WORKDAY, careersUrl: 'https://citrix.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'F5 Networks', slug: 'f5', source: JobSource.WORKDAY, careersUrl: 'https://f5.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Juniper Networks', slug: 'juniper', source: JobSource.WORKDAY, careersUrl: 'https://juniper.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Arista Networks', slug: 'arista', source: JobSource.WORKDAY, careersUrl: 'https://arista.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // ENERGY & UTILITIES
    { name: 'ExxonMobil', slug: 'exxonmobil', source: JobSource.WORKDAY, careersUrl: 'https://exxonmobil.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Chevron', slug: 'chevron', source: JobSource.WORKDAY, careersUrl: 'https://chevron.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'ConocoPhillips', slug: 'conocophillips', source: JobSource.WORKDAY, careersUrl: 'https://conocophillips.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Phillips 66', slug: 'phillips66', source: JobSource.WORKDAY, careersUrl: 'https://phillips66.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Marathon Petroleum', slug: 'marathon', source: JobSource.WORKDAY, careersUrl: 'https://marathon.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Valero Energy', slug: 'valero', source: JobSource.WORKDAY, careersUrl: 'https://valero.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Schlumberger', slug: 'slb', source: JobSource.WORKDAY, careersUrl: 'https://slb.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Halliburton', slug: 'halliburton', source: JobSource.WORKDAY, careersUrl: 'https://halliburton.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Baker Hughes', slug: 'bakerhughes', source: JobSource.WORKDAY, careersUrl: 'https://bakerhughes.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Duke Energy', slug: 'dukeenergy', source: JobSource.WORKDAY, careersUrl: 'https://dukeenergy.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Southern Company', slug: 'southerncompany', source: JobSource.WORKDAY, careersUrl: 'https://southerncompany.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Dominion Energy', slug: 'dominionenergy', source: JobSource.WORKDAY, careersUrl: 'https://dominion.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Exelon', slug: 'exelon', source: JobSource.WORKDAY, careersUrl: 'https://exelon.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Xcel Energy', slug: 'xcelenergy', source: JobSource.WORKDAY, careersUrl: 'https://xcelenergy.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Entergy', slug: 'entergy', source: JobSource.WORKDAY, careersUrl: 'https://entergy.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'AES Corporation', slug: 'aes', source: JobSource.WORKDAY, careersUrl: 'https://aes.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'FirstEnergy', slug: 'firstenergy', source: JobSource.WORKDAY, careersUrl: 'https://firstenergy.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'NextEra Energy', slug: 'nextera', source: JobSource.WORKDAY, careersUrl: 'https://nextera.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },

    // TRANSPORTATION & LOGISTICS
    { name: 'FedEx', slug: 'fedex', source: JobSource.WORKDAY, careersUrl: 'https://fedex.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'UPS', slug: 'ups', source: JobSource.WORKDAY, careersUrl: 'https://ups.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'XPO Logistics', slug: 'xpo', source: JobSource.WORKDAY, careersUrl: 'https://xpo.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'JB Hunt', slug: 'jbhunt', source: JobSource.WORKDAY, careersUrl: 'https://jbhunt.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Ryder', slug: 'ryder', source: JobSource.WORKDAY, careersUrl: 'https://ryder.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Old Dominion', slug: 'odfl', source: JobSource.WORKDAY, careersUrl: 'https://odfl.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Landstar', slug: 'landstar', source: JobSource.WORKDAY, careersUrl: 'https://landstar.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Werner Enterprises', slug: 'werner', source: JobSource.WORKDAY, careersUrl: 'https://werner.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'CH Robinson', slug: 'chrobinson', source: JobSource.WORKDAY, careersUrl: 'https://chrobinson.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Expeditors', slug: 'expeditors', source: JobSource.WORKDAY, careersUrl: 'https://expeditors.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Delta Airlines', slug: 'delta', source: JobSource.WORKDAY, careersUrl: 'https://delta.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'United Airlines', slug: 'united', source: JobSource.WORKDAY, careersUrl: 'https://united.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'American Airlines', slug: 'aa', source: JobSource.WORKDAY, careersUrl: 'https://aa.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Southwest Airlines', slug: 'southwest', source: JobSource.WORKDAY, careersUrl: 'https://southwest.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'JetBlue', slug: 'jetblue', source: JobSource.WORKDAY, careersUrl: 'https://jetblue.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Alaska Airlines', slug: 'alaskaair', source: JobSource.WORKDAY, careersUrl: 'https://alaskaair.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // MANUFACTURING & INDUSTRIAL
    { name: '3M', slug: '3m', source: JobSource.WORKDAY, careersUrl: 'https://3m.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Honeywell', slug: 'honeywell', source: JobSource.WORKDAY, careersUrl: 'https://honeywell.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Emerson Electric', slug: 'emerson', source: JobSource.WORKDAY, careersUrl: 'https://emerson.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Parker Hannifin', slug: 'parker', source: JobSource.WORKDAY, careersUrl: 'https://parker.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Eaton Corporation', slug: 'eaton', source: JobSource.WORKDAY, careersUrl: 'https://eaton.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Illinois Tool Works', slug: 'itw', source: JobSource.WORKDAY, careersUrl: 'https://itw.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Rockwell Automation', slug: 'rockwell', source: JobSource.WORKDAY, careersUrl: 'https://rockwell.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Dover Corporation', slug: 'dovercorp', source: JobSource.WORKDAY, careersUrl: 'https://dover.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Caterpillar', slug: 'caterpillar', source: JobSource.WORKDAY, careersUrl: 'https://cat.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Deere & Company', slug: 'johndeere', source: JobSource.WORKDAY, careersUrl: 'https://johndeere.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'PACCAR', slug: 'paccar', source: JobSource.WORKDAY, careersUrl: 'https://paccar.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Cummins', slug: 'cummins', source: JobSource.WORKDAY, careersUrl: 'https://cummins.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'General Electric', slug: 'ge', source: JobSource.WORKDAY, careersUrl: 'https://ge.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Carrier Global', slug: 'carrier', source: JobSource.WORKDAY, careersUrl: 'https://carrier.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Otis Worldwide', slug: 'otis', source: JobSource.WORKDAY, careersUrl: 'https://otis.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Trane Technologies', slug: 'trane', source: JobSource.WORKDAY, careersUrl: 'https://trane.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Johnson Controls', slug: 'johnsoncontrols', source: JobSource.WORKDAY, careersUrl: 'https://jci.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Danaher', slug: 'danaher', source: JobSource.WORKDAY, careersUrl: 'https://danaher.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Thermo Fisher', slug: 'thermofisher', source: JobSource.WORKDAY, careersUrl: 'https://thermofisher.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Agilent', slug: 'agilent', source: JobSource.WORKDAY, careersUrl: 'https://agilent.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'PerkinElmer', slug: 'perkinelmer', source: JobSource.WORKDAY, careersUrl: 'https://perkinelmer.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Waters Corporation', slug: 'waters', source: JobSource.WORKDAY, careersUrl: 'https://waters.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Corning', slug: 'corning', source: JobSource.WORKDAY, careersUrl: 'https://corning.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'PPG Industries', slug: 'ppg', source: JobSource.WORKDAY, careersUrl: 'https://ppg.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Sherwin-Williams', slug: 'sherwin', source: JobSource.WORKDAY, careersUrl: 'https://sherwin.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Dow Inc', slug: 'dow', source: JobSource.WORKDAY, careersUrl: 'https://dow.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'DuPont', slug: 'dupont', source: JobSource.WORKDAY, careersUrl: 'https://dupont.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Eastman Chemical', slug: 'eastman', source: JobSource.WORKDAY, careersUrl: 'https://eastman.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'LyondellBasell', slug: 'lyondellbasell', source: JobSource.WORKDAY, careersUrl: 'https://lyondellbasell.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // TELECOM
    { name: 'AT&T', slug: 'att', source: JobSource.WORKDAY, careersUrl: 'https://att.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Verizon', slug: 'verizon', source: JobSource.WORKDAY, careersUrl: 'https://verizon.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'T-Mobile', slug: 'tmobile', source: JobSource.WORKDAY, careersUrl: 'https://tmobile.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Comcast', slug: 'comcast', source: JobSource.WORKDAY, careersUrl: 'https://comcast.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Charter Communications', slug: 'charter', source: JobSource.WORKDAY, careersUrl: 'https://charter.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Cox Communications', slug: 'cox', source: JobSource.WORKDAY, careersUrl: 'https://cox.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Dish Network', slug: 'dish', source: JobSource.WORKDAY, careersUrl: 'https://dish.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // CONSULTING & PROFESSIONAL SERVICES
    { name: 'Accenture', slug: 'accenture', source: JobSource.WORKDAY, careersUrl: 'https://accenture.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Deloitte', slug: 'deloitte', source: JobSource.WORKDAY, careersUrl: 'https://deloitte.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'PwC', slug: 'pwc', source: JobSource.WORKDAY, careersUrl: 'https://pwc.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Ernst & Young', slug: 'ey', source: JobSource.WORKDAY, careersUrl: 'https://eyglobal.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'KPMG', slug: 'kpmg', source: JobSource.WORKDAY, careersUrl: 'https://kpmg.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'McKinsey', slug: 'mckinsey', source: JobSource.WORKDAY, careersUrl: 'https://mckinsey.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Boston Consulting Group', slug: 'bcg', source: JobSource.WORKDAY, careersUrl: 'https://bcg.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Bain & Company', slug: 'bain', source: JobSource.WORKDAY, careersUrl: 'https://bain.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Booz Allen Hamilton', slug: 'boozallen', source: JobSource.WORKDAY, careersUrl: 'https://boozallen.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Capgemini', slug: 'capgemini', source: JobSource.WORKDAY, careersUrl: 'https://capgemini.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Cognizant', slug: 'cognizant', source: JobSource.WORKDAY, careersUrl: 'https://cognizant.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Infosys', slug: 'infosys', source: JobSource.WORKDAY, careersUrl: 'https://infosys.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Wipro', slug: 'wipro', source: JobSource.WORKDAY, careersUrl: 'https://wipro.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'TCS', slug: 'tcs', source: JobSource.WORKDAY, careersUrl: 'https://tcs.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'HCL Technologies', slug: 'hcl', source: JobSource.WORKDAY, careersUrl: 'https://hcl.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Tech Mahindra', slug: 'techmahindra', source: JobSource.WORKDAY, careersUrl: 'https://techmahindra.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // MEDIA & ENTERTAINMENT
    { name: 'Disney', slug: 'disney', source: JobSource.WORKDAY, careersUrl: 'https://disney.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Warner Bros Discovery', slug: 'warnerbros', source: JobSource.WORKDAY, careersUrl: 'https://wbd.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'NBCUniversal', slug: 'nbcuniversal', source: JobSource.WORKDAY, careersUrl: 'https://nbcuniversal.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Paramount', slug: 'paramount', source: JobSource.WORKDAY, careersUrl: 'https://paramount.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Sony Pictures', slug: 'sonypictures', source: JobSource.WORKDAY, careersUrl: 'https://sony.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Lionsgate', slug: 'lionsgate', source: JobSource.WORKDAY, careersUrl: 'https://lionsgate.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'ViacomCBS', slug: 'viacomcbs', source: JobSource.WORKDAY, careersUrl: 'https://viacomcbs.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Fox Corporation', slug: 'fox', source: JobSource.WORKDAY, careersUrl: 'https://fox.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'AMC Networks', slug: 'amcnetworks', source: JobSource.WORKDAY, careersUrl: 'https://amcnetworks.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Live Nation', slug: 'livenation', source: JobSource.WORKDAY, careersUrl: 'https://livenation.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'iHeartMedia', slug: 'iheartmedia', source: JobSource.WORKDAY, careersUrl: 'https://iheartmedia.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Sirius XM', slug: 'siriusxm', source: JobSource.WORKDAY, careersUrl: 'https://siriusxm.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // CONSUMER GOODS
    { name: 'Procter & Gamble', slug: 'pg', source: JobSource.WORKDAY, careersUrl: 'https://pg.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Unilever', slug: 'unilever', source: JobSource.WORKDAY, careersUrl: 'https://unilever.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Colgate-Palmolive', slug: 'colgate', source: JobSource.WORKDAY, careersUrl: 'https://colgate.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Kimberly-Clark', slug: 'kimberlyclark', source: JobSource.WORKDAY, careersUrl: 'https://kimberlyclark.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Clorox', slug: 'clorox', source: JobSource.WORKDAY, careersUrl: 'https://clorox.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Church & Dwight', slug: 'churchdwight', source: JobSource.WORKDAY, careersUrl: 'https://churchdwight.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Estee Lauder', slug: 'esteelauder', source: JobSource.WORKDAY, careersUrl: 'https://elcompanies.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'LOreal USA', slug: 'lorealusa', source: JobSource.WORKDAY, careersUrl: 'https://loreal.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Revlon', slug: 'revlon', source: JobSource.WORKDAY, careersUrl: 'https://revlon.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Coty', slug: 'coty', source: JobSource.WORKDAY, careersUrl: 'https://coty.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Mattel', slug: 'mattel', source: JobSource.WORKDAY, careersUrl: 'https://mattel.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Hasbro', slug: 'hasbro', source: JobSource.WORKDAY, careersUrl: 'https://hasbro.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // FOOD & BEVERAGE
    { name: 'PepsiCo', slug: 'pepsico', source: JobSource.WORKDAY, careersUrl: 'https://pepsico.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Coca-Cola', slug: 'cocacola', source: JobSource.WORKDAY, careersUrl: 'https://coke.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Nestle USA', slug: 'nestleusa', source: JobSource.WORKDAY, careersUrl: 'https://nestle.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Kraft Heinz', slug: 'kraftheinz', source: JobSource.WORKDAY, careersUrl: 'https://kraftheinz.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'General Mills', slug: 'generalmills', source: JobSource.WORKDAY, careersUrl: 'https://generalmills.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Kelloggs', slug: 'kelloggs', source: JobSource.WORKDAY, careersUrl: 'https://kelloggs.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Mondelez', slug: 'mondelez', source: JobSource.WORKDAY, careersUrl: 'https://mondelez.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Mars Inc', slug: 'mars', source: JobSource.WORKDAY, careersUrl: 'https://mars.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Conagra Brands', slug: 'conagra', source: JobSource.WORKDAY, careersUrl: 'https://conagra.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Hormel Foods', slug: 'hormel', source: JobSource.WORKDAY, careersUrl: 'https://hormel.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Tyson Foods', slug: 'tyson', source: JobSource.WORKDAY, careersUrl: 'https://tyson.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'JBS USA', slug: 'jbs', source: JobSource.WORKDAY, careersUrl: 'https://jbs.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Smithfield Foods', slug: 'smithfield', source: JobSource.WORKDAY, careersUrl: 'https://smithfield.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Pilgrim Pride', slug: 'pilgrimpride', source: JobSource.WORKDAY, careersUrl: 'https://pilgrims.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Archer Daniels Midland', slug: 'adm', source: JobSource.WORKDAY, careersUrl: 'https://adm.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Cargill', slug: 'cargill', source: JobSource.WORKDAY, careersUrl: 'https://cargill.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Bunge', slug: 'bunge', source: JobSource.WORKDAY, careersUrl: 'https://bunge.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // HOSPITALITY & TRAVEL
    { name: 'Marriott', slug: 'marriott', source: JobSource.WORKDAY, careersUrl: 'https://marriott.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Hilton', slug: 'hilton', source: JobSource.WORKDAY, careersUrl: 'https://hilton.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Hyatt Hotels', slug: 'hyatt', source: JobSource.WORKDAY, careersUrl: 'https://hyatt.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'IHG Hotels', slug: 'ihg', source: JobSource.WORKDAY, careersUrl: 'https://ihg.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Wyndham Hotels', slug: 'wyndham', source: JobSource.WORKDAY, careersUrl: 'https://wyndham.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Choice Hotels', slug: 'choicehotels', source: JobSource.WORKDAY, careersUrl: 'https://choicehotels.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'MGM Resorts', slug: 'mgmresorts', source: JobSource.WORKDAY, careersUrl: 'https://mgmresorts.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Caesars Entertainment', slug: 'caesars', source: JobSource.WORKDAY, careersUrl: 'https://caesars.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Las Vegas Sands', slug: 'lvs', source: JobSource.WORKDAY, careersUrl: 'https://sands.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Carnival Cruise', slug: 'carnival', source: JobSource.WORKDAY, careersUrl: 'https://carnival.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Royal Caribbean', slug: 'royalcaribbean', source: JobSource.WORKDAY, careersUrl: 'https://rclgroup.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Norwegian Cruise', slug: 'norwegian', source: JobSource.WORKDAY, careersUrl: 'https://ncl.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Booking Holdings', slug: 'bookingholdings', source: JobSource.WORKDAY, careersUrl: 'https://booking.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Expedia Group', slug: 'expedia', source: JobSource.WORKDAY, careersUrl: 'https://expedia.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Tripadvisor', slug: 'tripadvisor', source: JobSource.WORKDAY, careersUrl: 'https://tripadvisor.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // REAL ESTATE
    { name: 'CBRE', slug: 'cbre', source: JobSource.WORKDAY, careersUrl: 'https://cbre.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'JLL', slug: 'jll', source: JobSource.WORKDAY, careersUrl: 'https://jll.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Cushman & Wakefield', slug: 'cushwake', source: JobSource.WORKDAY, careersUrl: 'https://cushwake.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Colliers', slug: 'colliers', source: JobSource.WORKDAY, careersUrl: 'https://colliers.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Newmark', slug: 'newmark', source: JobSource.WORKDAY, careersUrl: 'https://newmark.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Prologis', slug: 'prologis', source: JobSource.WORKDAY, careersUrl: 'https://prologis.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Simon Property', slug: 'simon', source: JobSource.WORKDAY, careersUrl: 'https://simon.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Equity Residential', slug: 'eqr', source: JobSource.WORKDAY, careersUrl: 'https://eqr.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'AvalonBay', slug: 'avalonbay', source: JobSource.WORKDAY, careersUrl: 'https://avalonbay.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Zillow', slug: 'zillow', source: JobSource.WORKDAY, careersUrl: 'https://zillow.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Redfin', slug: 'redfin', source: JobSource.WORKDAY, careersUrl: 'https://redfin.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Realogy', slug: 'realogy', source: JobSource.WORKDAY, careersUrl: 'https://realogy.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // INSURANCE
    { name: 'State Farm', slug: 'statefarm', source: JobSource.WORKDAY, careersUrl: 'https://statefarm.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Allstate', slug: 'allstate', source: JobSource.WORKDAY, careersUrl: 'https://allstate.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Progressive', slug: 'progressive', source: JobSource.WORKDAY, careersUrl: 'https://progressive.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Nationwide', slug: 'nationwide', source: JobSource.WORKDAY, careersUrl: 'https://nationwide.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Liberty Mutual', slug: 'libertymutual', source: JobSource.WORKDAY, careersUrl: 'https://libertymutual.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Travelers', slug: 'travelers', source: JobSource.WORKDAY, careersUrl: 'https://travelers.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Hartford', slug: 'hartford', source: JobSource.WORKDAY, careersUrl: 'https://thehartford.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Chubb', slug: 'chubb', source: JobSource.WORKDAY, careersUrl: 'https://chubb.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'AIG', slug: 'aig', source: JobSource.WORKDAY, careersUrl: 'https://aig.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'MetLife', slug: 'metlife', source: JobSource.WORKDAY, careersUrl: 'https://metlife.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Prudential', slug: 'prudential', source: JobSource.WORKDAY, careersUrl: 'https://prudential.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Principal Financial', slug: 'principal', source: JobSource.WORKDAY, careersUrl: 'https://principal.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Lincoln Financial', slug: 'lincolnfinancial', source: JobSource.WORKDAY, careersUrl: 'https://lfg.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Aflac', slug: 'aflac', source: JobSource.WORKDAY, careersUrl: 'https://aflac.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Unum', slug: 'unum', source: JobSource.WORKDAY, careersUrl: 'https://unum.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // AEROSPACE & DEFENSE
    { name: 'Boeing', slug: 'boeing', source: JobSource.WORKDAY, careersUrl: 'https://boeing.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Lockheed Martin', slug: 'lockheedmartin', source: JobSource.WORKDAY, careersUrl: 'https://lmco.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Raytheon', slug: 'raytheon', source: JobSource.WORKDAY, careersUrl: 'https://rtx.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Northrop Grumman', slug: 'northropgrumman', source: JobSource.WORKDAY, careersUrl: 'https://northropgrumman.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'General Dynamics', slug: 'generaldynamics', source: JobSource.WORKDAY, careersUrl: 'https://gd.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'L3Harris', slug: 'l3harris', source: JobSource.WORKDAY, careersUrl: 'https://l3harris.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'BAE Systems', slug: 'baesystems', source: JobSource.WORKDAY, careersUrl: 'https://baesystems.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Leidos', slug: 'leidos', source: JobSource.WORKDAY, careersUrl: 'https://leidos.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'SAIC', slug: 'saic', source: JobSource.WORKDAY, careersUrl: 'https://saic.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Textron', slug: 'textron', source: JobSource.WORKDAY, careersUrl: 'https://textron.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Spirit AeroSystems', slug: 'spiritaero', source: JobSource.WORKDAY, careersUrl: 'https://spiritaero.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'TransDigm', slug: 'transdigm', source: JobSource.WORKDAY, careersUrl: 'https://transdigm.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Howmet Aerospace', slug: 'howmet', source: JobSource.WORKDAY, careersUrl: 'https://howmet.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },

    // AUTOMOTIVE
    { name: 'General Motors', slug: 'gm', source: JobSource.WORKDAY, careersUrl: 'https://gm.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Ford Motor', slug: 'ford', source: JobSource.WORKDAY, careersUrl: 'https://ford.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Stellantis', slug: 'stellantis', source: JobSource.WORKDAY, careersUrl: 'https://stellantis.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Tesla', slug: 'tesla', source: JobSource.WORKDAY, careersUrl: 'https://tesla.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Rivian', slug: 'rivian', source: JobSource.WORKDAY, careersUrl: 'https://rivian.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 1 },
    { name: 'Lucid Motors', slug: 'lucid', source: JobSource.WORKDAY, careersUrl: 'https://lucid.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Aptiv', slug: 'aptiv', source: JobSource.WORKDAY, careersUrl: 'https://aptiv.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'BorgWarner', slug: 'borgwarner', source: JobSource.WORKDAY, careersUrl: 'https://borgwarner.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Lear Corporation', slug: 'lear', source: JobSource.WORKDAY, careersUrl: 'https://lear.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Magna International', slug: 'magna', source: JobSource.WORKDAY, careersUrl: 'https://magna.wd3.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Dana Inc', slug: 'dana', source: JobSource.WORKDAY, careersUrl: 'https://dana.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Goodyear', slug: 'goodyear', source: JobSource.WORKDAY, careersUrl: 'https://goodyear.wd5.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
    { name: 'Bridgestone Americas', slug: 'bridgestone', source: JobSource.WORKDAY, careersUrl: 'https://bridgestone.wd1.myworkdayjobs.com/External', apiEndpoint: null, enabled: true, priority: 2 },
];


async function main() {
    console.log('🌱 Starting database seed...\n');

    for (const company of companies) {
        const existing = await prisma.company.findUnique({
            where: { slug: company.slug },
        });

        if (existing) {
            console.log(`  ⏭️  Skipping ${company.name} (already exists)`);
            continue;
        }

        await prisma.company.create({
            data: company,
        });
        console.log(`  ✅ Created ${company.name} (${company.source})`);
    }

    console.log('\n🎉 Seed completed successfully!');

    const count = await prisma.company.count();
    console.log(`📊 Total companies in database: ${count}`);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
