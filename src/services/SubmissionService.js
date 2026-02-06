import Submission from '../models/Submission.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

class SubmissionService {
    /**
     * Evaluate a submission or run code.
     * @param {Object} data - { userId, questionId, code, language }
     * @param {boolean} isDryRun - If true, do not save validation result to DB (just 'Run')
     */
    async evaluateSubmission(data, isDryRun) {
        const { userId, questionId, code, language } = data;

        // 1. Fetch Question to compare output
        const question = await Question.findOne({ id: questionId });
        if (!question) {
            throw new Error('Question not found');
        }

        // 2. Mock Execution Logic
        // In a real system, we'd send `code` + `input` to a sandbox (e.g. Piston/Judge0).
        // Here, we simulate simple PASS/FAIL based on a comment or rudimentary logic.

        let status = 'incorrect';
        let output = '';
        let score = 0;

        // MOCK LOGIC: 
        // If code contains the string "return <expectedOutput>", we consider it correct.
        // Or if it's a dry run, we just return the sample output.

        const expected = question.expectedOutput || '';

        // Simulating processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (code.includes(expected) || code.includes('correct')) {
            status = 'correct';
            output = expected;
            score = 10; // 10 points for correct
        } else {
            status = 'incorrect';
            output = `Error: Output did not match expected value.\nExpected: ${expected}\nReceived: <Random/bad output>`;
        }

        const result = {
            status,
            output,
            executionTime: '20ms',
            memoryUsage: '12MB'
        };

        if (isDryRun) {
            return result;
        }

        // 3. Save Submission (if not dry run)
        // Check if user has already submitted successfully today?
        // Rules: "Maximum 1 submission" is strictly enforced in UserService limits (checkLimit).
        // So here we just save it.

        const submission = await Submission.create({
            userId,
            questionId,
            code,
            language,
            status,
            score,
            timestamp: new Date()
        });

        // 4. Return result with DB id
        return {
            ...result,
            submissionId: submission._id
        };
    }

    async getStats(questionId) {
        const total = await Submission.countDocuments({ questionId });
        const correct = await Submission.countDocuments({ questionId, status: 'correct' });

        return {
            questionId,
            totalSubmissions: total,
            correctSubmissions: correct,
            passRate: total === 0 ? 0 : ((correct / total) * 100).toFixed(2) + '%'
        };
    }

    async getUserStats(userId) {
        // Mock Streak Logic (or simple daily continuity check)
        // For now, we'll aggregate total score and solved count.

        const stats = await Submission.aggregate([
            { $match: { userId, status: 'correct' } },
            {
                $group: {
                    _id: null,
                    totalScore: { $sum: '$score' },
                    solvedCount: { $sum: 1 }
                }
            }
        ]);

        const user = await User.findOne({ userId });
        const data = stats[0] || { totalScore: 0, solvedCount: 0 };

        return {
            username: userId,
            role: user ? user.role : 'free',
            totalScore: data.totalScore,
            problemsSolved: data.solvedCount,
            currentStreak: user ? (user.dailyActivity.submissions > 0 ? 1 : 0) : 0, // Simple mock streak
            maxStreak: 5 // Mock value for "Paid" feature demo
        };
    }

    async getLeaderboard(difficulty) {
        // Simple In-Memory Cache Key
        const cacheKey = `leaderboard_${difficulty || 'all'}`;

        // Helper: Generic in-memory cache (attached to class instance or module scope)
        // For simplicity, attaching to 'this' if checked, else defining here won't work across requests easily if re-imported?
        // Node modules are cached, so module-level var is fine.
        if (!this.cache) this.cache = new Map();

        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < 60000)) { // 1 min TTL
            return cached.data;
        }

        // Daily Leaderboard: based on today's submissions
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // We need to join with User to get role (to filter out Free users if needed)
        // or ensure `getLeaderboard` is only accessible to Paid?
        // Requirement: "Access Rules... Free users: Can see score, Cannot appear on leaderboard"

        // So we must filter out users who are 'free' from the RESULTS, 
        // OR we just don't show Free users in the list.
        // Note: The User model has the role. Submission doesn't have role snapshot.
        // We need to $lookup.

        const pipeline = [
            {
                $match: {
                    timestamp: { $gte: startOfDay, $lte: endOfDay },
                    status: 'correct'
                }
            },
            // Filter by question difficulty via lookup?
            // "Separate leaderboard for each difficulty".
            // Since `Submission` links to `Question`, we need to inspect the Question's difficulty.
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questionId',
                    foreignField: 'id',
                    as: 'question'
                }
            },
            { $unwind: '$question' },
            {
                $match: {
                    'question.difficulty': { $regex: new RegExp(`^${difficulty}$`, 'i') } // Case insensitive match
                }
            },
            // Lookup User to filter out Free users
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId', // Submission.userId (string)
                    foreignField: 'userId', // User.userId (string)
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $match: {
                    'user.role': { $ne: 'free' } // Free users CANNOT appear on leaderboard
                }
            },
            // Group by User to sum scores? OR just list submissions?
            // "Leaderboard data... One entry per user?" Usually yes.
            // If user solved multiple questions of same difficulty today (if possible), sum score.
            // But requirement says "One question... global for the day". 
            // So there is only ONE question per day. 
            // So grouping isn't strictly necessary if only one Q per day.
            // But let's act robustly.
            {
                $group: {
                    _id: '$userId',
                    totalScore: { $sum: '$score' }, // Summing if we have >1 Q
                    latestSubmission: { $max: '$timestamp' },
                    username: { $first: '$userId' } // In a real app we'd have a username field
                }
            },
            { $sort: { totalScore: -1, latestSubmission: 1 } },
            { $limit: 10 }
        ];

        const result = await Submission.aggregate(pipeline);

        // Cache result
        this.cache.set(cacheKey, { timestamp: Date.now(), data: result });

        return result;
    }
}

// Simple in-memory cache
const leaderboardCache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 1 minute

export default new SubmissionService(); // Export instance but we modify class definition below
// Actually, easier to keep class structure clean. I will modify the method inside.

