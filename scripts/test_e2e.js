
const BASE_URL = 'http://localhost:3000/api/v1';

async function test() {
    console.log('🚀 Starting E2E Backend Test...\n');

    // Helper fetch
    const request = async (url, method = 'GET', body = null, headers = {}) => {
        try {
            const res = await fetch(`${BASE_URL}${url}`, {
                method,
                headers: { 'Content-Type': 'application/json', ...headers },
                body: body ? JSON.stringify(body) : null
            });
            const data = await res.json();
            return { status: res.status, data };
        } catch (e) {
            console.error(`❌ Request failed: ${method} ${url}`, e.message);
            return { status: 500, error: e.message };
        }
    };

    // 1. Create Question (Admin)
    console.log('🔹 1. Admin: Creating Daily Question...');
    const adminHeaders = { 'x-user-id': 'admin_test', 'x-user-role': 'admin' };
    const qData = {
        id: `q-${Date.now()}`,
        title: 'E2E Test Question',
        difficulty: 'beginner',
        problemStatement: 'Return 42',
        sampleInput: 'none',
        sampleOutput: '42',
        expectedOutput: '42',
        date: new Date().toISOString().split('T')[0]
    };

    const createRes = await request('/admin/questions', 'POST', qData, adminHeaders);
    if (createRes.status === 201) {
        console.log('✅ Question Created:', createRes.data.id);
    } else {
        console.error('❌ Failed to create question:', createRes);
        process.exit(1);
    }

    // Get Question ID
    const getRes = await request('/qotd');
    const qId = getRes.data.id;
    console.log(`ℹ️  QOTD ID: ${qId}`);

    // 2. Free User Limits
    console.log('\n🔹 2. Free User: Testing Limits...');
    const freeHeaders = { 'x-user-id': `free_${Date.now()}`, 'x-user-role': 'free' };
    const runBody = { questionId: qId, code: 'return 42', language: 'python' };

    // Run 1
    const r1 = await request('/run', 'POST', runBody, freeHeaders);
    console.log(`   Run 1: ${r1.status === 200 ? '✅ OK' : '❌ Fail'}`);

    // Run 2
    const r2 = await request('/run', 'POST', runBody, freeHeaders);
    console.log(`   Run 2: ${r2.status === 200 ? '✅ OK' : '❌ Fail'}`);

    // Run 3 (Should Fail)
    const r3 = await request('/run', 'POST', runBody, freeHeaders);
    if (r3.status === 429) {
        console.log('✅ Run 3 Correctly Blocked (Rate Limit)');
    } else {
        console.error('❌ Run 3 Should have failed but got:', r3.status);
    }

    // 3. Paid User Flow
    console.log('\n🔹 3. Paid User: Submission & Solution...');
    const paidHeaders = { 'x-user-id': `paid_${Date.now()}`, 'x-user-role': 'paid' };

    // View Solution
    const solRes = await request(`/solution/${qId}`, 'GET', null, paidHeaders);
    if (solRes.status === 200) {
        console.log('✅ Solution Access: GRANTED');
    } else {
        console.error('❌ Solution Access Failed:', solRes.status);
    }

    // Submit Answer
    const submitBody = {
        questionId: qId,
        code: 'def solve(): return 42', // "correct" logic needs to match expectedOutput in Mock? 
        // Wait, my SubmissionService mock checks: if (code.includes(expected) || code.includes('correct'))
        // expected is '42'. 'return 42' contains '42'.
        language: 'python'
    };
    const subRes = await request('/submissions', 'POST', submitBody, paidHeaders);
    if (subRes.status === 201 && subRes.data.status === 'correct') {
        console.log('✅ Submission: CORRECT & Saved');
    } else {
        console.error('❌ Submission Failed or Incorrect:', subRes);
    }

    // 4. Leaderboard
    console.log('\n🔹 4. Leaderboard Check...');
    const lbRes = await request('/leaderboard?difficulty=beginner');
    const userFound = lbRes.data.find(u => u._id === paidHeaders['x-user-id']);

    if (userFound) {
        console.log('✅ User found on Leaderboard:', userFound);
    } else {
        console.error('❌ User NOT found on Leaderboard. Data:', JSON.stringify(lbRes.data, null, 2));
        // It might be because we need to wait for write? (Tests run fast)
        // Or maybe my aggregation matching logic is strict.
        // It matches 'question.difficulty'. My created question has 'beginner'. 
        // Query param ?difficulty=beginner.
        // Regex ^beginner$. Should match.
        // User role 'paid'. Should match.
    }
}

test();
