import SubmissionRepository from '../repositories/SubmissionRepository.js';
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

        // 2. Mock Execution Logic with Test Cases
        // If question has no testCases (legacy), fallback to old behavior
        const testCases = question.testCases && question.testCases.length > 0
            ? question.testCases
            : [{ input: question.sampleInput || '', expected: question.expectedOutput || '', hidden: false, id: 1 }];

        const testResults = [];
        let totalScore = 0;
        let allPassed = true;

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        for (const [index, testCase] of testCases.entries()) {
            const caseId = index + 1;
            let status = 'failed';
            let output = '';

            // MOCK LOGIC: 
            // If code contains the expected string OR "return <expected>"
            if (code.includes(testCase.expected) || code.includes('correct')) {
                status = 'passed';
                output = testCase.expected;
            } else {
                status = 'failed';
                allPassed = false;
                output = `Error: Output mismatch.\nExpected: ${testCase.expected}\nReceived: <Random/bad output>`;
            }

            testResults.push({
                id: caseId,
                status,
                input: testCase.hidden ? 'Hidden' : testCase.input,
                expected: testCase.hidden ? 'Hidden' : testCase.expected,
                got: output,
                hidden: testCase.hidden
            });
        }

        // Calculate final status and score
        const overallStatus = allPassed ? 'correct' : 'incorrect';
        const score = allPassed ? 10 : 0; // Simple scoring: All or Nothing
        const message = allPassed ? 'All Test Cases Passed!' : 'Some Test Cases Failed';

        const result = {
            status: overallStatus,
            message,
            score,
            executionTime: '20ms',
            memoryUsage: '12MB',
            testResults // Return detailed results for frontend
        };

        if (isDryRun) {
            return result;
        }

        // 3. Save Submission (if not dry run)
        // Use Repository instead of direct Model
        const submission = await SubmissionRepository.create({
            userId,
            questionId,
            code,
            language,
            status: overallStatus,
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
        // Use Repository
        const total = await SubmissionRepository.count({ questionId });
        const correct = await SubmissionRepository.count({ questionId, status: 'correct' });

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

        // REFACTOR: Move pipeline to Repository or use Repository.aggregate
        // But for now, we can pass pipeline to repo.aggregate()

        const pipeline = [
            { $match: { userId, status: 'correct' } },
            {
                $group: {
                    _id: null,
                    totalScore: { $sum: '$score' },
                    solvedCount: { $sum: 1 }
                }
            }
        ];

        const stats = await SubmissionRepository.aggregate(pipeline);
        const user = await User.findOne({ userId });
        const data = stats[0] || { totalScore: 0, solvedCount: 0 };

        return {
            username: userId,
            role: user ? user.role : 'free',
            totalScore: data.totalScore,
            problemsSolved: data.solvedCount,
            currentStreak: user ? (user.dailyActivity?.submissions > 0 ? 1 : 0) : 0, // Simple mock streak
            maxStreak: 5 // Mock value for "Paid" feature demo
        };
    }

    async getLeaderboard(difficulty) {
        // Simple In-Memory Cache Key
        const cacheKey = `leaderboard_${difficulty || 'all'}`;

        if (!this.cache) this.cache = new Map();

        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < 60000)) { // 1 min TTL
            return cached.data;
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // REFACTOR: Same pipeline logic, but via Repository.aggregate
        const pipeline = [
            {
                $match: {
                    timestamp: { $gte: startOfDay, $lte: endOfDay },
                    status: 'correct'
                }
            },
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
                    'question.difficulty': { $regex: new RegExp(`^${difficulty}$`, 'i') }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $match: {
                    'user.role': { $ne: 'free' } // Free users CANNOT appear on leaderboard
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalScore: { $sum: '$score' },
                    latestSubmission: { $max: '$timestamp' },
                    username: { $first: '$userId' }
                }
            },
            { $sort: { totalScore: -1, latestSubmission: 1 } },
            { $limit: 10 }
        ];

        const result = await SubmissionRepository.aggregate(pipeline);

        // Map result to simpler format
        const formatted = result.map((s, i) => ({
            rank: i + 1,
            username: s.username,
            score: s.totalScore, // from group
            time: new Date(s.latestSubmission).toLocaleTimeString(),
            difficulty: difficulty || 'Mixed'
        }));

        this.cache.set(cacheKey, { timestamp: Date.now(), data: formatted });

        return formatted;
    }
}

// Simple in-memory cache
const leaderboardCache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 1 minute

export default new SubmissionService();

