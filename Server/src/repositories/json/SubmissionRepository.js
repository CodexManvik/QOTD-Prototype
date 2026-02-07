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

    async aggregate(pipeline) {
        // Check if pipeline is for leaderboard (contains $lookup 'users' or matches Leaderboard pipeline structure)
        const isLeaderboard = pipeline.some(stage => stage.$lookup && stage.$lookup.from === 'users');

        if (isLeaderboard) {
            // Return data formatted as expected by SubmissionService.getLeaderboard aggregation result
            // Service expects: { username, totalScore, latestSubmission }
            return [
                { username: "algo_master", totalScore: 1500, latestSubmission: new Date() },
                { username: "code_ninja", totalScore: 1450, latestSubmission: new Date() },
                { username: "bug_hunter", totalScore: 1300, latestSubmission: new Date() }
            ];
        }

        // Default to User Stats mock (Service expects: { totalScore, solvedCount })
        // Check if it's user stats pipeline (usually matches userId)
        const isUserStats = pipeline.some(stage => stage.$match && stage.$match.userId);
        if (isUserStats) {
            return [{
                totalScore: 450,
                solvedCount: 15
            }];
        }

        return [];
    }
}

export default new SubmissionRepository();
