/**
 * Test Extract Summary Utility
 * 
 * Tests the extractFirst50Words function with various inputs.
 */

import { extractFirst50Words, extractFirstNWords, extractFirst25Words } from '../utils/extractSummary.js';

function runTests() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║     🧪 Testing extractFirst50Words Utility               ║
╚═══════════════════════════════════════════════════════════╝
`);

    const testCases = [
        {
            name: 'Normal description (100+ words)',
            input: 'Netflix is seeking a Senior Software Engineer to join our Content Platform team. You will design and build the systems that power content discovery for our 200M+ global members. We are looking for someone with 5+ years of experience in distributed systems, strong skills in Java or Python, and a passion for building scalable microservices. You will work with cross-functional teams including Product, Data Science, and ML Engineering. Our tech stack includes Java, Spring Boot, AWS, Kubernetes, Cassandra, and Kafka. This role requires strong communication skills and experience mentoring junior engineers. Join us to help shape the future of entertainment.',
            expectedWordCount: 50,
            shouldHaveEllipsis: true,
        },
        {
            name: 'Short description (less than 50 words)',
            input: 'Join our team as a Software Engineer. You will build amazing products and work with talented people. We offer competitive salary and benefits. Apply now!',
            shouldHaveEllipsis: false,  // Under 50 words, no ellipsis
        },
        {
            name: 'HTML content',
            input: '<p>Senior <strong>Software Engineer</strong> needed for our <em>growing</em> team.</p><ul><li>5+ years experience</li><li>Python required</li></ul>',
            expectedContains: 'Senior Software Engineer needed',
            shouldHaveNoHtml: true,
        },
        {
            name: 'Empty description',
            input: '',
            expectedOutput: '',
        },
        {
            name: 'Null/undefined description',
            input: null as any,
            expectedOutput: '',
        },
        {
            name: 'Description with HTML entities',
            input: 'We are looking for a great engineer to join our team.&nbsp;You will work on exciting projects &amp; collaborate with teams.',
            expectedContains: 'great engineer to join our team',
            shouldHaveNoEntities: true,
        },
        {
            name: 'Description with bullet points',
            input: '• Requirement 1\n• Requirement 2\n• Requirement 3\nApply now to join our team!',
            expectedContains: 'Requirement 1 Requirement 2',
        },
        {
            name: 'Exactly 50 words',
            input: 'word '.repeat(50).trim(),
            expectedWordCount: 50,
            shouldHaveEllipsis: false,
        },
        {
            name: 'More than 50 words',
            input: 'word '.repeat(60).trim(),
            expectedWordCount: 50,
            shouldHaveEllipsis: true,
        },
    ];

    let passed = 0;
    let failed = 0;

    for (const test of testCases) {
        process.stdout.write(`Testing: ${test.name}... `);

        const result = extractFirst50Words(test.input);
        let testPassed = true;
        let failReason = '';

        // Check word count if specified
        if (test.expectedWordCount !== undefined) {
            const wordCount = result.replace('...', '').split(' ').filter(w => w.length > 0).length;
            if (wordCount !== test.expectedWordCount) {
                testPassed = false;
                failReason = `Expected ${test.expectedWordCount} words, got ${wordCount}`;
            }
        }

        // Check for ellipsis
        if (test.shouldHaveEllipsis !== undefined) {
            const hasEllipsis = result.endsWith('...');
            if (hasEllipsis !== test.shouldHaveEllipsis) {
                testPassed = false;
                failReason = `Expected ellipsis: ${test.shouldHaveEllipsis}, got: ${hasEllipsis}`;
            }
        }

        // Check for expected output
        if (test.expectedOutput !== undefined) {
            if (result !== test.expectedOutput) {
                testPassed = false;
                failReason = `Expected "${test.expectedOutput}", got "${result}"`;
            }
        }

        // Check for expected contains
        if (test.expectedContains !== undefined) {
            if (!result.includes(test.expectedContains)) {
                testPassed = false;
                failReason = `Expected to contain "${test.expectedContains}"`;
            }
        }

        // Check no HTML
        if (test.shouldHaveNoHtml) {
            if (result.includes('<') || result.includes('>')) {
                testPassed = false;
                failReason = 'Contains HTML tags';
            }
        }

        // Check no entities
        if (test.shouldHaveNoEntities) {
            if (result.includes('&nbsp;') || result.includes('&amp;')) {
                testPassed = false;
                failReason = 'Contains HTML entities';
            }
        }

        if (testPassed) {
            console.log('✅ PASS');
            passed++;
        } else {
            console.log(`❌ FAIL: ${failReason}`);
            console.log(`   Input: "${test.input?.slice(0, 80)}..."`);
            console.log(`   Output: "${result.slice(0, 80)}..."`);
            failed++;
        }
    }

    // Test extractFirst25Words
    console.log('\n--- Testing extractFirst25Words ---');
    const testFor25 = extractFirst25Words('word '.repeat(30).trim());
    const wordCount25 = testFor25.replace('...', '').split(' ').filter(w => w.length > 0).length;
    if (wordCount25 === 25 && testFor25.endsWith('...')) {
        console.log('extractFirst25Words: ✅ PASS (25 words + ellipsis)');
        passed++;
    } else {
        console.log(`extractFirst25Words: ❌ FAIL (got ${wordCount25} words)`);
        failed++;
    }

    // Test extractFirstNWords with custom count
    console.log('\n--- Testing extractFirstNWords(text, 10) ---');
    const testForN = extractFirstNWords('word '.repeat(15).trim(), 10);
    const wordCountN = testForN.replace('...', '').split(' ').filter(w => w.length > 0).length;
    if (wordCountN === 10 && testForN.endsWith('...')) {
        console.log('extractFirstNWords(text, 10): ✅ PASS (10 words + ellipsis)');
        passed++;
    } else {
        console.log(`extractFirstNWords(text, 10): ❌ FAIL (got ${wordCountN} words)`);
        failed++;
    }

    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                    📊 TEST SUMMARY                         ║
╠═══════════════════════════════════════════════════════════╣
║   Passed: ${passed.toString().padEnd(3)} | Failed: ${failed.toString().padEnd(3)} | Total: ${(passed + failed).toString().padEnd(3)}              ║
╚═══════════════════════════════════════════════════════════╝
`);

    if (failed === 0) {
        console.log('✅ All tests passed!');
    } else {
        console.log(`⚠️ ${failed} test(s) failed`);
        process.exit(1);
    }
}

runTests();
