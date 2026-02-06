const submissions = new Map();

class SubmissionRepository {
    async save(submission) {
        if (!submissions.has(submission.questionId)) {
            submissions.set(submission.questionId, []);
        }
        submissions.get(submission.questionId).push(submission);
        return submission;
    }

    async getStats(questionId) {
        const attempts = submissions.get(questionId) || [];
        const totalAttempts = attempts.length;
        const successCount = attempts.filter(s => s.status === 'correct').length;

        return {
            questionId,
            totalAttempts,
            successCount,
            successRate: totalAttempts > 0 ? ((successCount / totalAttempts) * 100).toFixed(2) + '%' : '0%'
        };
    }

    async getLeaderboard() {
        return [
            { rank: 1, username: "algo_master", score: 1500 },
            { rank: 2, username: "code_ninja", score: 1450 },
            { rank: 3, username: "bug_hunter", score: 1300 },
            { rank: 4, username: "sys_arch", score: 1250 },
            { rank: 5, username: "dev_ops", score: 1100 }
        ];
    }
}

export default new SubmissionRepository();
