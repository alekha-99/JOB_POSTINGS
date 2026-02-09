/**
 * USA Location Detector
 * 
 * Determines if a job location is in the United States based on
 * state names, abbreviations, city names, and location keywords.
 */

// Full US state names
const US_STATE_NAMES = [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado',
    'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho',
    'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana',
    'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota',
    'mississippi', 'missouri', 'montana', 'nebraska', 'nevada',
    'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina',
    'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania',
    'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas',
    'utah', 'vermont', 'virginia', 'washington', 'west virginia',
    'wisconsin', 'wyoming', 'district of columbia',
];

// US state abbreviations (matched as whole words)
const US_STATE_ABBREVIATIONS = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
];

// Major US cities (lowercase for matching)
const US_MAJOR_CITIES = [
    'new york', 'new york city', 'nyc', 'los angeles', 'la', 'chicago',
    'houston', 'phoenix', 'philadelphia', 'san antonio', 'san diego',
    'dallas', 'san jose', 'austin', 'jacksonville', 'fort worth',
    'columbus', 'charlotte', 'san francisco', 'sf', 'indianapolis',
    'seattle', 'denver', 'washington', 'washington dc', 'boston',
    'nashville', 'detroit', 'portland', 'las vegas', 'memphis',
    'louisville', 'baltimore', 'milwaukee', 'albuquerque', 'tucson',
    'fresno', 'sacramento', 'kansas city', 'atlanta', 'miami',
    'cleveland', 'minneapolis', 'new orleans', 'tampa', 'pittsburgh',
    'cincinnati', 'orlando', 'st louis', 'st. louis', 'salt lake city',
    'raleigh', 'durham', 'oakland', 'palo alto', 'mountain view',
    'sunnyvale', 'cupertino', 'menlo park', 'redwood city', 'santa clara',
    'san mateo', 'fremont', 'irvine', 'playa vista', 'culver city',
    'santa monica', 'venice', 'brooklyn', 'manhattan', 'queens',
    'jersey city', 'hoboken', 'cambridge', 'somerville', 'bellevue',
    'redmond', 'kirkland', 'boulder', 'arlington', 'alexandria',
    'reston', 'tysons', 'mclean', 'herndon', 'bethesda', 'rockville',
];

// USA indicator keywords
const USA_KEYWORDS = [
    'united states', 'usa', 'u.s.a', 'u.s.', 'us-based',
    'remote - us', 'remote - usa', 'remote (us)', 'remote (usa)',
    'remote, us', 'remote, usa', 'us remote', 'usa remote',
    'nationwide', 'multiple us locations', 'various us locations',
    'us only', 'usa only', 'united states only',
];

// Keywords that indicate NON-USA locations
const EXCLUDE_LOCATIONS = [
    // Europe
    'london', 'berlin', 'paris', 'amsterdam', 'dublin', 'manchester',
    'barcelona', 'madrid', 'lisbon', 'munich', 'zurich', 'stockholm',
    'copenhagen', 'oslo', 'helsinki', 'vienna', 'prague', 'warsaw',
    'rome', 'milan', 'brussels', 'edinburgh', 'glasgow',

    // Canada
    'toronto', 'vancouver', 'montreal', 'ottawa', 'calgary', 'edmonton',
    'winnipeg', 'canada', 'canadian',

    // UK
    'united kingdom', 'uk', 'great britain', 'england', 'scotland', 'wales',

    // APAC
    'sydney', 'melbourne', 'brisbane', 'perth', 'australia', 'australian',
    'tokyo', 'osaka', 'japan', 'japanese',
    'singapore', 'singaporean',
    'hong kong', 'hk',
    'bangalore', 'bengaluru', 'hyderabad', 'pune', 'mumbai', 'chennai',
    'delhi', 'gurgaon', 'gurugram', 'noida', 'india', 'indian',
    'shanghai', 'beijing', 'shenzhen', 'china', 'chinese',
    'seoul', 'korea', 'korean',
    'taipei', 'taiwan', 'taiwanese',

    // LATAM
    'mexico city', 'mexico', 'mexican',
    'buenos aires', 'argentina', 'argentine',
    'são paulo', 'sao paulo', 'rio de janeiro', 'brazil', 'brazilian',
    'bogota', 'colombia', 'colombian',
    'santiago', 'chile', 'chilean',

    // Middle East
    'dubai', 'abu dhabi', 'uae', 'emirates',
    'tel aviv', 'israel', 'israeli',

    // Other
    'remote - emea', 'remote - apac', 'remote - latam',
    'emea', 'apac only', 'apac region',
];

interface LocationResult {
    isUSA: boolean;
    confidence: number;
    matchedIndicators: string[];
    excludedReason?: string;
    state?: string;
    city?: string;
}

/**
 * Detects if a location string indicates a US-based job
 * 
 * @param location - Location string from job posting
 * @returns Detection result with confidence and matched indicators
 */
export function detectUSALocation(location: string): LocationResult {
    if (!location || location.trim() === '') {
        return {
            isUSA: false,
            confidence: 0,
            matchedIndicators: [],
            excludedReason: 'Empty location',
        };
    }

    const locationLower = location.toLowerCase().trim();
    const matchedIndicators: string[] = [];
    let confidence = 0;
    let state: string | undefined;
    let city: string | undefined;

    // Check for exclusion keywords first
    for (const excludeKeyword of EXCLUDE_LOCATIONS) {
        if (locationLower.includes(excludeKeyword)) {
            return {
                isUSA: false,
                confidence: 0.9,
                matchedIndicators: [],
                excludedReason: `Location contains non-USA indicator: "${excludeKeyword}"`,
            };
        }
    }

    // Check for USA keywords
    for (const usaKeyword of USA_KEYWORDS) {
        if (locationLower.includes(usaKeyword)) {
            matchedIndicators.push(usaKeyword);
            confidence += 0.5;
        }
    }

    // Check for US state names
    for (const stateName of US_STATE_NAMES) {
        if (locationLower.includes(stateName)) {
            matchedIndicators.push(stateName);
            state = stateName;
            confidence += 0.4;
            break; // Only match first state
        }
    }

    // Check for state abbreviations (as whole words)
    const words = location.toUpperCase().split(/[\s,\-\/]+/);
    for (const abbrev of US_STATE_ABBREVIATIONS) {
        if (words.includes(abbrev)) {
            matchedIndicators.push(abbrev);
            if (!state) {
                state = abbrev;
            }
            confidence += 0.4;
            break;
        }
    }

    // Check for major US cities
    for (const cityName of US_MAJOR_CITIES) {
        if (locationLower.includes(cityName)) {
            matchedIndicators.push(cityName);
            city = cityName;
            confidence += 0.3;
            break; // Only match first city
        }
    }

    // Handle "Remote" without location qualifier
    if (locationLower === 'remote' && matchedIndicators.length === 0) {
        // Ambiguous - could be anywhere
        return {
            isUSA: false,
            confidence: 0.3,
            matchedIndicators: ['remote (ambiguous)'],
            excludedReason: 'Remote without USA qualifier',
        };
    }

    // Cap confidence
    confidence = Math.min(confidence, 1.0);

    return {
        isUSA: confidence >= 0.3,
        confidence,
        matchedIndicators,
        state,
        city,
    };
}

/**
 * Quick check if location is likely USA
 */
export function isLikelyUSA(location: string): boolean {
    const result = detectUSALocation(location);
    return result.isUSA;
}

/**
 * Extract state from location string
 */
export function extractState(location: string): string | undefined {
    const result = detectUSALocation(location);
    return result.state;
}

export default detectUSALocation;
