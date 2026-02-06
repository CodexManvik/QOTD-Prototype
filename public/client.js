document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    updateUserContext();
    loadQuestion();

    // Event Listeners
    document.getElementById('updateContextBtn').addEventListener('click', updateUserContext);
    document.getElementById('runBtn').addEventListener('click', runCode);
    document.getElementById('submitBtn').addEventListener('click', submit);
    document.getElementById('createQBtn').addEventListener('click', createQuestion);
    document.getElementById('seedBtn').addEventListener('click', seedQuestions);
    document.getElementById('viewSolutionBtn').addEventListener('click', viewSolution);
    document.getElementById('loadLbBtn').addEventListener('click', loadLeaderboard);
});

let currentUserId = 'test-user-1';
let currentUserRole = 'free';
let currentQuestionId = '';

function updateUserContext() {
    currentUserId = document.getElementById('userId').value;
    currentUserRole = document.getElementById('userRole').value;
    document.getElementById('currentContextDisplay').innerText = `${currentUserId} (${currentUserRole})`;

    // Toggle Solution Button
    const btn = document.getElementById('viewSolutionBtn');
    const solutionSection = document.getElementById('solutionSection');

    if (currentUserRole === 'paid' || currentUserRole === 'admin') {
        solutionSection.style.display = 'block';
    } else {
        solutionSection.style.display = 'none';
        document.getElementById('solutionDisplay').style.display = 'none';
    }
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'x-user-id': currentUserId,
        'x-user-role': currentUserRole
    };
}

async function loadQuestion() {
    try {
        const loading = document.getElementById('loading');
        const qBox = document.getElementById('question-box');

        loading.style.display = 'block';
        qBox.style.display = 'none';

        const res = await fetch('/api/v1/qotd');
        if (!res.ok) throw new Error('Failed to fetch question');

        const data = await res.json();

        currentQuestionId = data.id;
        loading.style.display = 'none';
        qBox.style.display = 'block';

        document.getElementById('qTitle').innerText = data.title;
        document.getElementById('qDifficulty').innerText = data.difficulty;
        document.getElementById('qDifficulty').className = `badge badge-${data.difficulty}`;
        document.getElementById('qDesc').innerText = data.problemStatement;

        // Populate inputs for convenience
        document.getElementById('qId').value = data.id;

        const hintsList = document.getElementById('qHints');
        hintsList.innerHTML = '';
        if (data.hints && data.hints.length) {
            data.hints.forEach(h => {
                const li = document.createElement('li');
                li.innerText = h;
                hintsList.appendChild(li);
            });
        }
    } catch (err) {
        document.getElementById('loading').innerText = 'Error loading question: ' + err.message;
    }
}

async function runCode() {
    const resDiv = document.getElementById('runResponse');
    resDiv.innerText = 'Running...';
    resDiv.className = '';

    const data = {
        questionId: currentQuestionId,
        code: document.getElementById('code').value,
        language: document.getElementById('language').value
    };

    try {
        const response = await fetch('/api/v1/run', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        const json = await response.json();

        if (response.ok) {
            resDiv.innerText = `> Status: ${json.status}\n> Output: ${json.output}\n> Time: ${json.executionTime}`;
            resDiv.className = json.status === 'correct' ? 'success' : 'error';
        } else {
            resDiv.innerText = `Error: ${json.error}\n${json.message || ''}`;
            resDiv.className = 'error';
        }
    } catch (err) {
        resDiv.innerText = 'Network Error: ' + err.message;
        resDiv.className = 'error';
    }
}

async function submit() {
    const resDiv = document.getElementById('submitResponse');
    resDiv.innerText = 'Submitting...';
    resDiv.className = '';

    const data = {
        questionId: currentQuestionId,
        code: document.getElementById('code').value,
        language: document.getElementById('language').value
    };

    try {
        const response = await fetch('/api/v1/submissions', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        const json = await response.json();

        if (response.ok) {
            resDiv.innerText = `Matched! Result Saved.\nStatus: ${json.status}\nScore: ${json.score}`;
            resDiv.className = 'success';
        } else {
            resDiv.innerText = `Submission Failed: ${json.error}\n${json.message || ''}`;
            resDiv.className = 'error';
        }
    } catch (err) {
        resDiv.innerText = 'Network Error: ' + err.message;
        resDiv.className = 'error';
    }
}

async function viewSolution() {
    const solDiv = document.getElementById('solutionDisplay');
    solDiv.innerText = 'Loading...';

    try {
        const response = await fetch(`/api/v1/solution/${currentQuestionId}`, { headers: getHeaders() });
        if (response.status === 403) {
            solDiv.innerText = '🔒 Access Denied: Upgrade to Paid to view solution.';
            return;
        }
        const data = await response.json();
        solDiv.innerText = data.solution || 'No solution text found.';
        solDiv.style.display = 'block';
    } catch (err) {
        solDiv.innerText = 'Error: ' + err.message;
    }
}

async function loadLeaderboard() {
    const diff = document.getElementById('lbDifficulty').value;
    const tbody = document.querySelector('#lbTable tbody');
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Loading...</td></tr>';

    try {
        const url = diff ? `/api/v1/leaderboard?difficulty=${diff}` : '/api/v1/leaderboard';
        const res = await fetch(url, { headers: getHeaders() });
        const data = await res.json();

        tbody.innerHTML = '';
        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No records found today upon this difficulty.</td></tr>';
            return;
        }

        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${index + 1}</td>
                <td>${row._id || 'User'}</td> <!-- _id is userId based on group -->
                <td>${row.totalScore}</td>
                <td>${new Date(row.latestSubmission).toLocaleTimeString()}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:red;">Error: ${err.message}</td></tr>`;
    }
}

window.createQuestion = async function () {
    const resDiv = document.getElementById('admResponse');
    resDiv.innerText = 'Backing up to JSON Draft...';
    resDiv.style.display = 'block';

    const data = {
        id: document.getElementById('admId').value || `q-${Date.now()}`,
        title: document.getElementById('admTitle').value,
        difficulty: document.getElementById('admDiff').value,
        problemStatement: document.getElementById('admDesc').value,
        sampleInput: document.getElementById('admIn').value,
        sampleOutput: document.getElementById('admOut').value,
        expectedOutput: document.getElementById('admOut').value,
        date: new Date().toISOString().split('T')[0]
    };

    try {
        const res = await fetch('/api/v1/admin/questions', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        const json = await res.json();
        resDiv.innerText = JSON.stringify(json, null, 2);
        if (res.ok) {
            // Success
        }
    } catch (err) {
        resDiv.innerText = 'Error: ' + err.message;
    }
}

window.seedQuestions = async function () {
    if (!confirm('This will Publish ALL questions from the JSON file to the Live Database. Continue?')) return;

    const resDiv = document.getElementById('admResponse');
    resDiv.innerText = 'Publishing...';
    resDiv.style.display = 'block';

    try {
        const res = await fetch('/api/v1/admin/seed', {
            method: 'POST',
            headers: getHeaders()
        });
        const json = await res.json();
        resDiv.innerText = JSON.stringify(json, null, 2);
        if (res.ok) alert('Database Synced Successfully! All questions are live.');
    } catch (err) {
        resDiv.innerText = 'Error: ' + err.message;
    }
}
