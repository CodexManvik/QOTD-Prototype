import Submission from '../../models/Submission.js';

class MongoSubmissionRepository {
    async save(submission) {
        const newSubmission = new Submission(submission);
        return await newSubmission.save();
    }

    async getStats(questionId) {
        const totalAttempts = await Submission.countDocuments({ questionId });
        const successCount = await Submission.countDocuments({ questionId, status: 'correct' });

        return {
            questionId,
            totalAttempts,
            successCount,
            successRate: totalAttempts > 0 ? ((successCount / totalAttempts) * 100).toFixed(2) + '%' : '0%'
        };
    }

    async getLeaderboard() {
        const topSolvers = await Submission.find({ status: 'correct' })
            .sort({ score: -1, timestamp: 1 })
            .limit(10)
            .select('userId status timestamp score -_id');

        return topSolvers.map((s, i) => ({
            rank: i + 1,
            username: s.userId,
            score: s.score,
            time: s.timestamp.toISOString().split('T')[1].split('.')[0]
        }));
    }
}

export default new MongoSubmissionRepository();
