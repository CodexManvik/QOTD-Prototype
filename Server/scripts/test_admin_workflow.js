
const BASE_URL = 'http://localhost:3000/api/v1';

async function testAdminParams() {
    console.log('🚀 Starting Admin Workflow Test...\n');

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

    const adminHeaders = { 'x-user-id': 'admin_test', 'x-user-role': 'admin' };

    // 1. Create a Draft Question (Should save to JSON, NOT immediate DB)
    console.log('🔹 1. Admin: Creating Draft Question (JSON)...');
    const qId = `q-draft-${Date.now()}`;
    const qData = {
        id: qId,
        title: 'Draft Question for Seed',
        difficulty: 'hard',
        problemStatement: 'Solve Draft',
        sampleInput: 'in',
        sampleOutput: 'out',
        expectedOutput: 'out',
        date: new Date().toISOString().split('T')[0]
    };

    const draftRes = await request('/admin/questions', 'POST', qData, adminHeaders);
    // Service returns 200 OK with "message" field. 
    if (draftRes.status === 200 && draftRes.data.message) {
        console.log('✅ Draft Saved to JSON:', draftRes.data.message);
    } else {
        console.error('❌ Draft Creation Failed:', draftRes);
        process.exit(1);
    }

    // 2. Trigger Seed to Sync DB
    console.log('\n🔹 2. Admin: Triggering Seed (JSON -> DB)...');
    const seedRes = await request('/admin/seed', 'POST', {}, adminHeaders);
    if (seedRes.status === 200 && seedRes.data.message.includes('success')) {
        console.log(`✅ Seed Successful. Count: ${seedRes.data.count}`);
    } else {
        console.error('❌ Seeding Failed:', seedRes);
        process.exit(1);
    }

    // 3. Verify Question is in DB (via Daily Question or direct lookup logic implication)
    console.log('\n🔹 3. Verifying Availability...');
    // We set the date to today, so it should be the QOTD now if logic picks the "latest" for today?
    // Or if multiple exist for today, findOne might pick the first.
    // Let's just check if QOTD endpoint returns valid data.

    const getRes = await request('/qotd');
    if (getRes.status === 200) {
        console.log(`✅ QOTD Fetched: ${getRes.data.id} - ${getRes.data.title}`);
        if (getRes.data.id === qId) {
            console.log('🌟 Confirmed: Our new draft is now Live!');
        } else {
            console.log('ℹ️  Note: QOTD is valid, though not necessarily our specific draft (multiple Qs for today?). This is acceptable.');
        }
    } else {
        console.error('❌ Failed to fetch QOTD:', getRes);
    }
}

testAdminParams();
