document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    document.getElementById('submitBtn').addEventListener('click', submit);
});

async function loadQuestion() {
    try {
        const res = await fetch('/api/v1/qotd');
        const data = await res.json();

        document.getElementById('qTitle').innerText = data.title + ' (' + data.difficulty + ')';
        document.getElementById('qDesc').innerText = data.problemStatement;
        document.getElementById('qId').value = data.id;

        const hintsList = document.getElementById('qHints');
        hintsList.innerHTML = '';
        if (data.hints && data.hints.length) {
            data.hints.forEach(h => {
                const li = document.createElement('li');
                li.innerText = h;
                hintsList.appendChild(li);
            });
        } else {
            hintsList.innerHTML = '<li>No hints available</li>';
        }

    } catch (err) {
        document.getElementById('qTitle').innerText = 'Error loading question';
        console.error(err);
    }
}

async function submit() {
    const data = {
        questionId: document.getElementById('qId').value,
        userId: document.getElementById('uId').value,
        code: document.getElementById('code').value,
        language: 'python',
        userOutput: document.getElementById('output').value
    };

    const resDiv = document.getElementById('response');
    resDiv.innerText = 'Submitting...';

    try {
        const res = await fetch('/api/v1/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        resDiv.innerText = JSON.stringify(json, null, 2);
    } catch (err) {
        resDiv.innerText = 'Error: ' + err.message;
    }
}
