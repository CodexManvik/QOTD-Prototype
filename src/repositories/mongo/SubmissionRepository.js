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

    async getLeaderboard(difficulty) {
        const pipeline = [
            { $match: { status: 'correct' } },
            // Join with Question to filter by difficulty (if needed)
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questionId',
                    foreignField: 'id',
                    as: 'question'
                }
            },
            { $unwind: '$question' },
            ...(difficulty ? [{ $match: { 'question.difficulty': difficulty } }] : []),

            // Join with User to filter out 'free' users
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId', // Use the 'userId' string from submission
                    foreignField: 'userId', // Match against 'userId' string in users (not _id)
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            { $match: { 'userDetails.role': { $ne: 'free' } } }, // Filter out free users

            { $sort: { score: -1, timestamp: 1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 0,
                    rank: { $literal: 0 }, // Placeholder, we'll map index later
                    username: '$userId',
                    score: '$score',
                    timestamp: '$timestamp',
                    difficulty: '$question.difficulty'
                }
            }
        ];

        const topSolvers = await Submission.aggregate(pipeline);

        return topSolvers.map((s, i) => ({
            rank: i + 1,
            username: s.username,
            score: s.score,
            time: s.timestamp.toISOString().split('T')[1].split('.')[0],
            difficulty: s.difficulty
        }));
    }
}

export default new MongoSubmissionRepository();
