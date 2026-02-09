/**
 * Date Parser Utility
 * 
 * Parses various date formats from job postings and determines
 * if a job was posted within the last N hours (default: 24).
 */

import {
    parseISO,
    parse,
    isValid,
    subHours,
    subDays,
    isAfter,
    startOfDay,
} from 'date-fns';
import config from './config.js';

interface ParsedDate {
    date: Date | null;
    isRecent: boolean;
    confidence: number;
    source: string;
}

// Relative time patterns
const RELATIVE_PATTERNS: Array<{
    pattern: RegExp;
    handler: (match: RegExpMatchArray) => Date | null;
}> = [
        // "just now", "moments ago"
        {
            pattern: /^(just now|moments? ago|now)$/i,
            handler: () => new Date(),
        },
        // "X minutes ago", "X min ago"
        {
            pattern: /^(\d+)\s*(minutes?|mins?)\s*ago$/i,
            handler: (match) => {
                const minutes = parseInt(match[1], 10);
                return new Date(Date.now() - minutes * 60 * 1000);
            },
        },
        // "X hours ago", "X hr ago"
        {
            pattern: /^(\d+)\s*(hours?|hrs?|h)\s*ago$/i,
            handler: (match) => {
                const hours = parseInt(match[1], 10);
                return subHours(new Date(), hours);
            },
        },
        // "X days ago", "Xd ago"
        {
            pattern: /^(\d+)\s*(days?|d)\s*ago$/i,
            handler: (match) => {
                const days = parseInt(match[1], 10);
                return subDays(new Date(), days);
            },
        },
        // "today", "posted today"
        {
            pattern: /^(posted\s+)?today$/i,
            handler: () => startOfDay(new Date()),
        },
        // "yesterday"
        {
            pattern: /^(posted\s+)?yesterday$/i,
            handler: () => subDays(startOfDay(new Date()), 1),
        },
        // "X weeks ago"
        {
            pattern: /^(\d+)\s*weeks?\s*ago$/i,
            handler: (match) => {
                const weeks = parseInt(match[1], 10);
                return subDays(new Date(), weeks * 7);
            },
        },
        // "24h ago", "48h"
        {
            pattern: /^(\d+)h(\s*ago)?$/i,
            handler: (match) => {
                const hours = parseInt(match[1], 10);
                return subHours(new Date(), hours);
            },
        },
        // "1d", "2d"
        {
            pattern: /^(\d+)d$/i,
            handler: (match) => {
                const days = parseInt(match[1], 10);
                return subDays(new Date(), days);
            },
        },
    ];

// Absolute date format patterns
const ABSOLUTE_FORMATS = [
    // ISO 8601
    'yyyy-MM-dd',
    "yyyy-MM-dd'T'HH:mm:ss",
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
    "yyyy-MM-dd'T'HH:mm:ssXXX",
    "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",

    // US formats
    'MM/dd/yyyy',
    'M/d/yyyy',
    'MM-dd-yyyy',

    // Written formats
    'MMMM d, yyyy',      // January 15, 2025
    'MMM d, yyyy',       // Jan 15, 2025
    'MMMM dd, yyyy',     // January 15, 2025
    'MMM dd, yyyy',      // Jan 15, 2025
    'd MMMM yyyy',       // 15 January 2025
    'd MMM yyyy',        // 15 Jan 2025
];

/**
 * Parse a date string from various formats
 * 
 * @param dateString - The date string to parse
 * @returns Parsed date result with confidence
 */
export function parseJobDate(dateString: string): ParsedDate {
    if (!dateString || dateString.trim() === '') {
        return {
            date: null,
            isRecent: false,
            confidence: 0,
            source: 'empty',
        };
    }

    const cleaned = dateString.trim();
    const now = new Date();
    const cutoffHours = config.daysLookback * 24;
    const cutoffDate = subHours(now, cutoffHours);

    // Try relative patterns first
    for (const { pattern, handler } of RELATIVE_PATTERNS) {
        const match = cleaned.match(pattern);
        if (match) {
            const parsedDate = handler(match);
            if (parsedDate && isValid(parsedDate)) {
                return {
                    date: parsedDate,
                    isRecent: isAfter(parsedDate, cutoffDate),
                    confidence: 0.9,
                    source: 'relative',
                };
            }
        }
    }

    // Try Unix timestamp (milliseconds)
    if (/^\d{13}$/.test(cleaned)) {
        const timestamp = parseInt(cleaned, 10);
        const parsedDate = new Date(timestamp);
        if (isValid(parsedDate)) {
            return {
                date: parsedDate,
                isRecent: isAfter(parsedDate, cutoffDate),
                confidence: 1.0,
                source: 'timestamp_ms',
            };
        }
    }

    // Try Unix timestamp (seconds)
    if (/^\d{10}$/.test(cleaned)) {
        const timestamp = parseInt(cleaned, 10) * 1000;
        const parsedDate = new Date(timestamp);
        if (isValid(parsedDate)) {
            return {
                date: parsedDate,
                isRecent: isAfter(parsedDate, cutoffDate),
                confidence: 1.0,
                source: 'timestamp_s',
            };
        }
    }

    // Try ISO 8601 parsing first
    try {
        const isoDate = parseISO(cleaned);
        if (isValid(isoDate)) {
            return {
                date: isoDate,
                isRecent: isAfter(isoDate, cutoffDate),
                confidence: 1.0,
                source: 'iso8601',
            };
        }
    } catch {
        // Continue to other formats
    }

    // Try various absolute formats
    for (const format of ABSOLUTE_FORMATS) {
        try {
            const parsedDate = parse(cleaned, format, new Date());
            if (isValid(parsedDate)) {
                return {
                    date: parsedDate,
                    isRecent: isAfter(parsedDate, cutoffDate),
                    confidence: 0.8,
                    source: `format:${format}`,
                };
            }
        } catch {
            // Continue to next format
        }
    }

    // Could not parse
    return {
        date: null,
        isRecent: false,
        confidence: 0,
        source: 'unknown',
    };
}

/**
 * Check if a date is within the configured lookback period
 * 
 * @param date - Date to check
 * @param hoursBack - Hours to look back (default: from config)
 * @returns True if date is recent
 */
export function isRecentDate(date: Date | null, hoursBack?: number): boolean {
    if (!date || !isValid(date)) {
        return false;
    }

    const cutoffHours = hoursBack ?? config.daysLookback * 24;
    const cutoffDate = subHours(new Date(), cutoffHours);

    return isAfter(date, cutoffDate);
}

/**
 * Quick check if a date string represents a "today" posting
 */
export function isPostedToday(dateString: string): boolean {
    const result = parseJobDate(dateString);
    return result.isRecent;
}

/**
 * Parse a timestamp (milliseconds or seconds) to Date
 */
export function parseTimestamp(timestamp: number): Date {
    // If timestamp is in seconds (10 digits), convert to milliseconds
    if (timestamp < 10000000000) {
        return new Date(timestamp * 1000);
    }
    return new Date(timestamp);
}

export default parseJobDate;
