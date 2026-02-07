
const BASE_URL = 'http://localhost:3000/api/v1';

async function verifyAllRoutes() {
    console.log('🔍 Starting Comprehensive API Verification...\n');

    const check = async (name, method, endpoint, headers = {}, body = null, expectedStatus = 200) => {
        try {
            const res = await fetch(`${BASE_URL}${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json', ...headers },
                body: body ? JSON.stringify(body) : null
            });

            const statusMatch = res.status === expectedStatus || (expectedStatus === '2xx' && res.status >= 200 && res.status < 300);
            const icon = statusMatch ? '✅' : '❌';
            const logFn = statusMatch ? console.log : console.error;

            logFn(`${icon} [${method}] ${endpoint.padEnd(30)} -> Got ${res.status} (Exp: ${expectedStatus})`);

            if (!statusMatch) {
                console.error(`   Header: ${JSON.stringify(headers)}\n   Body: ${body ? JSON.stringify(body) : 'none'}\n   Response: ${await res.text()}`);
                return false;
            }
            return true;
        } catch (e) {
            console.error(`❌ [${method}] ${endpoint} -> Network Error: ${e.message}`);
            return false;
        }
    };

    let allPassed = true;

    // Headers
    const adminHeaders = { 'x-user-id': 'admin_check', 'x-user-role': 'admin' };
    const paidHeaders = { 'x-user-id': 'paid_check', 'x-user-role': 'paid' };
    const freeHeaders = { 'x-user-id': 'free_check', 'x-user-role': 'free' };

    console.log('--- Public / User Routes ---');
    allPassed &= await check('Get QOTD', 'GET', '/qotd');
    allPassed &= await check('Leaderboard', 'GET', '/leaderboard');

    // Create a dummy question first to ensure ID exists for other tests
    const qId = 'verify-q-1';
    await check('Setup Q (Draft)', 'POST', '/admin/questions', adminHeaders, {
        id: qId, title: 'VerifyQ', difficulty: 'easy', problemStatement: 'test',
        sampleInput: '1', sampleOutput: '1', expectedOutput: '1', date: new Date().toISOString().split('T')[0]
    }, '2xx');

    // MUST SEED to make it live for other tests
    await check('Seed DB', 'POST', '/admin/seed', adminHeaders, {}, 200);

    allPassed &= await check('Get Stats for Q', 'GET', `/stats/${qId}`);
    allPassed &= await check('Run Code', 'POST', '/run', freeHeaders, {
        questionId: qId, code: 'print("hello")', language: 'python'
    }, '2xx');

    console.log('\n--- Paid User Routes ---');
    allPassed &= await check('Get Personal Stats', 'GET', '/stats/me', paidHeaders);
    allPassed &= await check('Get Solution', 'GET', `/solution/${qId}`, paidHeaders);

    console.log('\n--- Admin Routes ---');
    allPassed &= await check('List Drafts', 'GET', '/admin/questions', adminHeaders);
    allPassed &= await check('Create Draft', 'POST', '/admin/questions', adminHeaders, {
        id: `draft-${Date.now()}`, title: 'Draft', difficulty: 'medium', problemStatement: 'x',
        sampleInput: 'x', sampleOutput: 'x', expectedOutput: 'x'
    }, 200);

    // Seed already tested above

    console.log('\n--- Access Control Tests (Negatives) ---');
    allPassed &= await check('Solution as Free', 'GET', `/solution/${qId}`, freeHeaders, null, 403);

    console.log('\n----------------------------------------');
    if (allPassed) {
        console.log('🎉 ALL ROUTES VERIFIED SUCCESSFULLY!');
    } else {
        console.error('⚠️  SOME ROUTES FAILED.');
        process.exit(1);
    }
}

verifyAllRoutes();
