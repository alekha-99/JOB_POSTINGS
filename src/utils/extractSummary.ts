/**
 * Extract Summary Utility
 * 
 * Extracts the first 50 words from a job description for quick scanning.
 * Handles HTML removal, whitespace normalization, and edge cases.
 */

/**
 * Remove HTML tags and entities from a string
 */
function stripHtml(html: string): string {
    if (!html) return '';

    return html
        // Remove script and style content completely
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        // Remove HTML tags
        .replace(/<[^>]+>/g, ' ')
        // Decode common HTML entities
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&apos;/gi, "'")
        .replace(/&#x27;/gi, "'")
        .replace(/&#x2F;/gi, '/')
        .replace(/&bull;/gi, '')
        .replace(/&middot;/gi, '')
        // Remove remaining numeric HTML entities
        .replace(/&#\d+;/g, ' ')
        .replace(/&[a-z]+;/gi, ' ');
}

/**
 * Normalize whitespace in a string
 */
function normalizeWhitespace(text: string): string {
    return text
        // Replace bullet points and common list markers
        .replace(/[•●○▪▫◦]/g, ' ')
        .replace(/^\s*[-–—]\s*/gm, ' ')
        // Replace newlines and tabs with spaces
        .replace(/[\r\n\t]+/g, ' ')
        // Collapse multiple spaces to single space
        .replace(/\s+/g, ' ')
        // Trim leading/trailing whitespace
        .trim();
}

/**
 * Extract the first N words from a job description
 * 
 * @param fullDescription - The complete job description (may contain HTML)
 * @param wordCount - Number of words to extract (default: 50)
 * @returns First N words as a clean string, with "..." if truncated
 * 
 * @example
 * extractFirstNWords("<p>This is a <strong>test</strong> description.</p>", 3)
 * // Returns: "This is a..."
 * 
 * @example
 * extractFirstNWords("Short text", 50)
 * // Returns: "Short text" (no "..." since under word limit)
 */
export function extractFirstNWords(fullDescription: string, wordCount: number = 50): string {
    // Handle empty/null input
    if (!fullDescription || typeof fullDescription !== 'string') {
        return '';
    }

    // Step 1: Remove HTML tags
    const noHtml = stripHtml(fullDescription);

    // Step 2: Normalize whitespace
    const cleanText = normalizeWhitespace(noHtml);

    // Handle empty result after cleaning
    if (!cleanText) {
        return '';
    }

    // Step 3: Split into words
    const words = cleanText.split(' ').filter(word => word.length > 0);

    // Step 4: Check if we need to truncate
    if (words.length <= wordCount) {
        // Return full text without "..." if under word limit
        return words.join(' ');
    }

    // Step 5: Take first N words and add "..."
    const truncatedWords = words.slice(0, wordCount);
    return truncatedWords.join(' ') + '...';
}

/**
 * Extract the first 50 words from a job description
 * Convenience function with default word count
 */
export function extractFirst50Words(fullDescription: string): string {
    return extractFirstNWords(fullDescription, 50);
}

/**
 * Extract the first 25 words (for even shorter summaries)
 */
export function extractFirst25Words(fullDescription: string): string {
    return extractFirstNWords(fullDescription, 25);
}

export default extractFirst50Words;
