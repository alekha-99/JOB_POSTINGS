/**
 * Test Utilities
 * 
 * Tests the IT classifier, location detector, and date parser.
 */

import { classifyITJob, detectUSALocation, parseJobDate } from '../utils/index.js';

console.log(`
╔═══════════════════════════════════════════════════════════╗
║              🧪 Utility Test Suite                        ║
╚═══════════════════════════════════════════════════════════╝
`);

// ============================================================================
// IT Classifier Tests
// ============================================================================
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 IT JOB CLASSIFIER TESTS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const itTestCases = [
    // Should be IT jobs
    { title: 'Senior Software Engineer', expected: true },
    { title: 'Full Stack Developer', expected: true },
    { title: 'DevOps Engineer', expected: true },
    { title: 'Machine Learning Engineer', expected: true },
    { title: 'iOS Developer', expected: true },
    { title: 'Security Engineer', expected: true },
    { title: 'Data Scientist', expected: true },
    { title: 'Frontend Developer (React)', expected: true },
    { title: 'Staff Engineer, Infrastructure', expected: true },
    { title: 'Site Reliability Engineer (SRE)', expected: true },

    // Should NOT be IT jobs
    { title: 'Sales Manager', expected: false },
    { title: 'Marketing Director', expected: false },
    { title: 'HR Business Partner', expected: false },
    { title: 'Financial Analyst', expected: false },
    { title: 'Customer Success Manager', expected: false },
    { title: 'Account Executive', expected: false },
    { title: 'Recruiter', expected: false },
    { title: 'Office Manager', expected: false },
];

let itPassed = 0;
for (const test of itTestCases) {
    const result = classifyITJob(test.title);
    const passed = result.isIT === test.expected;
    const icon = passed ? '✅' : '❌';
    console.log(`${icon} "${test.title}"`);
    console.log(`   Expected: ${test.expected ? 'IT' : 'Not IT'} | Got: ${result.isIT ? 'IT' : 'Not IT'} (confidence: ${(result.confidence * 100).toFixed(0)}%)`);
    if (!passed) {
        console.log(`   ⚠️  Reason: ${result.excludedReason || result.matchedKeywords.join(', ')}`);
    }
    if (passed) itPassed++;
}
console.log(`\n📊 IT Classifier: ${itPassed}/${itTestCases.length} passed\n`);

// ============================================================================
// Location Detector Tests
// ============================================================================
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🌍 LOCATION DETECTOR TESTS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const locationTestCases = [
    // USA locations
    { location: 'San Francisco, CA', expected: true },
    { location: 'New York, NY', expected: true },
    { location: 'Remote - US', expected: true },
    { location: 'Austin, Texas', expected: true },
    { location: 'Seattle, WA, USA', expected: true },
    { location: 'United States', expected: true },
    { location: 'Remote (US)', expected: true },
    { location: 'Boston, Massachusetts', expected: true },
    { location: 'Chicago, IL', expected: true },
    { location: 'Denver, Colorado', expected: true },

    // Non-USA locations
    { location: 'London, UK', expected: false },
    { location: 'Berlin, Germany', expected: false },
    { location: 'Toronto, Canada', expected: false },
    { location: 'Sydney, Australia', expected: false },
    { location: 'Bangalore, India', expected: false },
    { location: 'Singapore', expected: false },
    { location: 'Tokyo, Japan', expected: false },
    { location: 'Remote - EMEA', expected: false },
];

let locPassed = 0;
for (const test of locationTestCases) {
    const result = detectUSALocation(test.location);
    const passed = result.isUSA === test.expected;
    const icon = passed ? '✅' : '❌';
    console.log(`${icon} "${test.location}"`);
    console.log(`   Expected: ${test.expected ? 'USA' : 'Not USA'} | Got: ${result.isUSA ? 'USA' : 'Not USA'} (confidence: ${(result.confidence * 100).toFixed(0)}%)`);
    if (!passed) {
        console.log(`   ⚠️  Reason: ${result.excludedReason || result.matchedIndicators.join(', ')}`);
    }
    if (passed) locPassed++;
}
console.log(`\n📊 Location Detector: ${locPassed}/${locationTestCases.length} passed\n`);

// ============================================================================
// Date Parser Tests
// ============================================================================
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📅 DATE PARSER TESTS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const dateTestCases = [
    // Recent dates (should be true)
    { dateStr: 'just now', expectedRecent: true },
    { dateStr: 'Posted today', expectedRecent: true },
    { dateStr: '1 hour ago', expectedRecent: true },
    { dateStr: '5 hours ago', expectedRecent: true },
    { dateStr: '12h ago', expectedRecent: true },

    // Old dates (should be false)
    { dateStr: '2 days ago', expectedRecent: false },
    { dateStr: '1 week ago', expectedRecent: false },
    { dateStr: '3 weeks ago', expectedRecent: false },
    { dateStr: 'Posted yesterday', expectedRecent: false }, // >24h ago
];

// Also test with a timestamp from now
const nowTimestamp = Date.now();
const fiveHoursAgo = nowTimestamp - (5 * 60 * 60 * 1000);
const twoDaysAgo = nowTimestamp - (48 * 60 * 60 * 1000);

dateTestCases.push({ dateStr: nowTimestamp.toString(), expectedRecent: true });
dateTestCases.push({ dateStr: fiveHoursAgo.toString(), expectedRecent: true });
dateTestCases.push({ dateStr: twoDaysAgo.toString(), expectedRecent: false });

let datePassed = 0;
for (const test of dateTestCases) {
    const result = parseJobDate(test.dateStr);
    const passed = result.isRecent === test.expectedRecent;
    const icon = passed ? '✅' : '❌';
    const shortStr = test.dateStr.length > 20 ? test.dateStr.slice(0, 20) + '...' : test.dateStr;
    console.log(`${icon} "${shortStr}"`);
    console.log(`   Expected: ${test.expectedRecent ? 'Recent' : 'Old'} | Got: ${result.isRecent ? 'Recent' : 'Old'} (source: ${result.source})`);
    if (result.date) {
        console.log(`   Parsed: ${result.date.toISOString()}`);
    }
    if (passed) datePassed++;
}
console.log(`\n📊 Date Parser: ${datePassed}/${dateTestCases.length} passed\n`);

// ============================================================================
// Summary
// ============================================================================
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 OVERALL SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const totalTests = itTestCases.length + locationTestCases.length + dateTestCases.length;
const totalPassed = itPassed + locPassed + datePassed;

console.log(`   IT Classifier:     ${itPassed}/${itTestCases.length}`);
console.log(`   Location Detector: ${locPassed}/${locationTestCases.length}`);
console.log(`   Date Parser:       ${datePassed}/${dateTestCases.length}`);
console.log(`   ─────────────────────`);
console.log(`   Total:             ${totalPassed}/${totalTests}`);

if (totalPassed === totalTests) {
    console.log('\n✅ All tests passed!');
} else {
    console.log(`\n⚠️  ${totalTests - totalPassed} test(s) failed`);
}
