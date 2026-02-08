import QuestionRepository from '../repositories/QuestionRepository.js';
import jsonUserStore from '../repositories/JsonUserStore.js';
import fs from 'fs/promises';
import path from 'path';

const SUBMISSIONS_PATH = path.resolve('data/submissions.json');

// In-memory leaderboard cache
const leaderboardCache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 1 minute

/**
 * Read submissions from JSON file
 */
async function readSubmissions() {
    try {
        const data = await fs.readFile(SUBMISSIONS_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error('Error reading submissions.json:', error);
        return [];
    }
}

/**
 * Write submissions to JSON file
 */
async function writeSubmissions(submissions) {
    try {
        await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing submissions.json:', error);
        throw error;
    }
}

class SubmissionService {
    /**
     * Evaluate a submission or run code.
     * @param {Object} data - { userId, questionId, code, language }
     * @param {boolean} isDryRun - If true, do not save validation result (just 'Run')
     */
    async evaluateSubmission(data, isDryRun) {
        const { userId, questionId, code, language } = data;

        // 1. Fetch Question to compare output
        const question = await QuestionRepository.findById(questionId);
        if (!question) {
            throw new Error('Question not found');
        }

        // 2. Mock Execution Logic
        let status = 'incorrect';
        let output = '';
        let score = 0;

        const expected = question.expectedOutput || '';

        // Simulating processing delay
        await new Promise(resolve => setTimeout(resolve, 300));

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

        // 3. Save Submission to JSON file
        const submissions = await readSubmissions();
        const submission = {
            _id: String(submissions.length + 1),
            userId,
            questionId,
            code,
            language,
            status,
            score,
            timestamp: new Date().toISOString()
        };
        submissions.push(submission);
        await writeSubmissions(submissions);

        // 4. Return result with DB id
        return {
            ...result,
            submissionId: submission._id
        };
    }

    async getStats(questionId) {
        const submissions = await readSubmissions();
        const questionSubmissions = submissions.filter(s => s.questionId === questionId);
        const total = questionSubmissions.length;
        const correct = questionSubmissions.filter(s => s.status === 'correct').length;

        return {
            questionId,
            totalSubmissions: total,
            correctSubmissions: correct,
            passRate: total === 0 ? 0 : ((correct / total) * 100).toFixed(2) + '%'
        };
    }

    async getUserStats(userId) {
        const submissions = await readSubmissions();
        const userSubmissions = submissions.filter(s => s.userId === userId && s.status === 'correct');
        const user = await jsonUserStore.findOne({ userId });

        const totalScore = userSubmissions.reduce((sum, s) => sum + (s.score || 0), 0);
        const solvedCount = userSubmissions.length;

        return {
            username: userId,
            role: user ? user.role : 'free',
            totalScore,
            problemsSolved: solvedCount,
            currentStreak: user?.dailyActivity?.submissions > 0 ? 1 : 0,
            maxStreak: 5 // Mock value
        };
    }

    async getLeaderboard(difficulty) {
        const cacheKey = `leaderboard_${difficulty || 'all'}`;

        // Check cache
        const cached = leaderboardCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
            return cached.data;
        }

        // Get today's submissions
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const submissions = await readSubmissions();
        const todaySubmissions = submissions.filter(s => {
            const ts = new Date(s.timestamp);
            return ts >= startOfDay && ts <= endOfDay && s.status === 'correct';
        });

        // Get all questions to filter by difficulty
        const allQuestions = await QuestionRepository.findAll();
        const questionMap = new Map(allQuestions.map(q => [q.id, q]));

        // Filter by difficulty if specified
        let filteredSubmissions = todaySubmissions;
        if (difficulty) {
            filteredSubmissions = todaySubmissions.filter(s => {
                const q = questionMap.get(s.questionId);
                return q && q.difficulty.toLowerCase() === difficulty.toLowerCase();
            });
        }

        // Group by user and sum scores
        const userScores = new Map();
        for (const s of filteredSubmissions) {
            const user = await jsonUserStore.findOne({ userId: s.userId });
            // Free users cannot appear on leaderboard
            if (user && user.role === 'free') continue;

            if (!userScores.has(s.userId)) {
                userScores.set(s.userId, { totalScore: 0, latestSubmission: s.timestamp, username: s.userId });
            }
            const entry = userScores.get(s.userId);
            entry.totalScore += s.score || 0;
            if (new Date(s.timestamp) > new Date(entry.latestSubmission)) {
                entry.latestSubmission = s.timestamp;
            }
        }

        // Sort and limit
        const result = Array.from(userScores.values())
            .sort((a, b) => b.totalScore - a.totalScore || new Date(a.latestSubmission) - new Date(b.latestSubmission))
            .slice(0, 10)
            .map(entry => ({
                _id: entry.username,
                username: entry.username,
                totalScore: entry.totalScore,
                latestSubmission: entry.latestSubmission
            }));

        // Cache result
        leaderboardCache.set(cacheKey, { timestamp: Date.now(), data: result });

        return result;
    }
}

export default new SubmissionService();
