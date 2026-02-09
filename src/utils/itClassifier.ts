/**
 * IT Job Classifier
 * 
 * Classifies jobs as IT/Tech based on title and description keywords.
 * Uses include/exclude lists with specific rules for edge cases.
 */

// Programming languages that indicate IT jobs
const PROGRAMMING_LANGUAGES = [
    'python', 'java', 'javascript', 'typescript', 'go', 'golang', 'rust',
    'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'perl',
    'haskell', 'clojure', 'elixir', 'erlang', 'r lang', 'matlab',
];

// IT job title keywords (high confidence)
const IT_TITLE_KEYWORDS = [
    // Core Engineering
    'software', 'engineer', 'developer', 'programmer', 'coder',
    'frontend', 'front-end', 'front end',
    'backend', 'back-end', 'back end',
    'full stack', 'full-stack', 'fullstack',

    // DevOps & Infrastructure
    'devops', 'sre', 'site reliability', 'platform engineer', 'infrastructure',
    'cloud engineer', 'aws', 'azure', 'gcp', 'google cloud',
    'kubernetes', 'docker', 'terraform',

    // Data & ML
    'data scientist', 'data engineer', 'ml engineer', 'machine learning',
    'ai engineer', 'artificial intelligence', 'deep learning',
    'data analyst', 'analytics engineer', 'business intelligence',

    // Mobile
    'mobile developer', 'mobile engineer', 'ios developer', 'ios engineer',
    'android developer', 'android engineer', 'react native', 'flutter',

    // QA & Testing
    'qa engineer', 'test engineer', 'quality assurance', 'sdet',
    'automation engineer', 'test automation', 'quality engineer',

    // Security
    'security engineer', 'infosec', 'cybersecurity', 'appsec',
    'security analyst', 'penetration tester', 'security architect',

    // Database
    'database administrator', 'dba', 'database engineer', 'sql developer',
    'data architect', 'database developer',

    // Leadership (Tech)
    'technical lead', 'tech lead', 'engineering manager',
    'cto', 'vp engineering', 'vp of engineering', 'director of engineering',
    'principal engineer', 'staff engineer', 'senior engineer',
    'distinguished engineer', 'fellow engineer',

    // Web
    'web developer', 'web engineer', 'ui engineer', 'ux engineer',
    'ui/ux engineer',

    // Systems
    'systems engineer', 'systems administrator', 'sysadmin', 'system admin',
    'network engineer', 'network administrator',

    // Embedded
    'embedded engineer', 'firmware engineer', 'embedded software',
    'hardware engineer', 'fpga engineer',

    // Other Tech
    'solutions architect', 'technical architect', 'software architect',
    'release engineer', 'build engineer', 'integration engineer',
    'api engineer', 'api developer',
];

// Keywords that EXCLUDE a job from being classified as IT
const EXCLUDE_KEYWORDS = [
    // Sales (unless qualified)
    'sales representative', 'account executive', 'business development',
    'sales manager', 'sales director',

    // Marketing
    'marketing manager', 'marketing director', 'content marketing',
    'social media', 'brand manager', 'product marketing',

    // Non-tech Roles
    'customer success', 'account manager', 'customer support',
    'hr manager', 'human resources', 'recruiter', 'talent acquisition',
    'people operations', 'people partner',
    'finance manager', 'accounting', 'accountant', 'financial analyst',
    'controller', 'bookkeeper',
    'legal counsel', 'attorney', 'paralegal', 'compliance officer',
    'administrative assistant', 'executive assistant', 'office manager',
    'receptionist', 'office coordinator',

    // Operations (non-tech)
    'operations manager', 'warehouse', 'logistics', 'supply chain',
    'procurement', 'facilities',
];

// Keywords that might appear but need context (for future use):
// - 'sales engineer': IT if also has "software" or "technical"
// - 'designer': IT only if "UI", "UX", or "engineer"
// - 'analyst': IT only if "data", "security", or "systems"
// - 'operations': IT only if "IT operations" or "DevOps"

interface ClassificationResult {
    isIT: boolean;
    confidence: number; // 0-1 scale
    matchedKeywords: string[];
    excludedReason?: string;
    category?: string;
}

/**
 * Classifies a job as IT/Tech based on title and description
 * 
 * @param title - Job title
 * @param description - Job description (optional)
 * @returns Classification result with confidence and matched keywords
 */
export function classifyITJob(title: string, description?: string): ClassificationResult {
    const titleLower = title.toLowerCase();
    const descLower = description?.toLowerCase() || '';
    const combined = `${titleLower} ${descLower}`;

    const matchedKeywords: string[] = [];
    let confidence = 0;
    let category: string | undefined;

    // Check for exclusion keywords first (in title only)
    for (const keyword of EXCLUDE_KEYWORDS) {
        if (titleLower.includes(keyword)) {
            return {
                isIT: false,
                confidence: 0.9,
                matchedKeywords: [],
                excludedReason: `Title contains non-IT keyword: "${keyword}"`,
            };
        }
    }

    // Check for IT title keywords (high weight)
    for (const keyword of IT_TITLE_KEYWORDS) {
        if (titleLower.includes(keyword)) {
            matchedKeywords.push(keyword);
            confidence += 0.4;

            // Assign category based on matched keyword
            if (!category) {
                category = categorizeKeyword(keyword);
            }
        }
    }

    // Check for programming languages (medium weight)
    for (const lang of PROGRAMMING_LANGUAGES) {
        if (combined.includes(lang)) {
            matchedKeywords.push(lang);
            confidence += 0.15;
        }
    }

    // Handle edge cases requiring context
    if (titleLower.includes('sales engineer')) {
        if (titleLower.includes('software') || descLower.includes('software')) {
            matchedKeywords.push('sales engineer (software)');
            confidence += 0.3;
        } else {
            return {
                isIT: false,
                confidence: 0.7,
                matchedKeywords: [],
                excludedReason: 'Sales Engineer without software context',
            };
        }
    }

    if (titleLower.includes('designer')) {
        if (titleLower.includes('ui') || titleLower.includes('ux') || titleLower.includes('engineer')) {
            matchedKeywords.push('designer (UI/UX)');
            confidence += 0.3;
            category = 'Design Engineering';
        }
        // Otherwise, don't add to IT category
    }

    // Cap confidence at 1.0
    confidence = Math.min(confidence, 1.0);

    return {
        isIT: confidence >= 0.3, // Threshold for IT classification
        confidence,
        matchedKeywords,
        category,
    };
}

/**
 * Categorize a keyword into a job category
 */
function categorizeKeyword(keyword: string): string {
    const categories: Record<string, string[]> = {
        'Software Engineering': [
            'software', 'developer', 'programmer', 'coder', 'frontend', 'backend',
            'full stack', 'web developer', 'web engineer',
        ],
        'DevOps & Infrastructure': [
            'devops', 'sre', 'platform', 'infrastructure', 'cloud', 'kubernetes',
            'docker', 'terraform',
        ],
        'Data & Machine Learning': [
            'data scientist', 'data engineer', 'ml engineer', 'machine learning',
            'ai', 'artificial intelligence', 'analytics',
        ],
        'Mobile Development': [
            'mobile', 'ios', 'android', 'react native', 'flutter',
        ],
        'Quality Assurance': [
            'qa', 'test', 'quality', 'sdet', 'automation',
        ],
        'Security': [
            'security', 'infosec', 'cybersecurity', 'appsec',
        ],
        'Database': [
            'database', 'dba', 'sql',
        ],
        'Engineering Leadership': [
            'technical lead', 'tech lead', 'engineering manager', 'cto',
            'principal', 'staff', 'distinguished',
        ],
    };

    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some((k) => keyword.includes(k))) {
            return category;
        }
    }

    return 'Other Engineering';
}

/**
 * Quick check if a job title looks like an IT job (title only, faster)
 */
export function isLikelyITJob(title: string): boolean {
    const result = classifyITJob(title);
    return result.isIT;
}

export default classifyITJob;
