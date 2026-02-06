import SubmissionService from '../services/SubmissionService.js';
import { submissionSchema } from '../validators/submission.validator.js';

import UserService from '../services/UserService.js';

class SubmissionController {
    async runCode(req, res, next) {
        try {
            if (!req.user) return res.status(401).json({ error: 'User required' });

            await UserService.checkAndIncrementLimit(req.user, 'run');

            const validationResult = submissionSchema.safeParse(req.body);
            if (!validationResult.success) {
                return res.status(400).json({ error: 'Validation Error', messages: validationResult.error.errors.map(e => e.message) });
            }

            const data = { ...validationResult.data, userId: req.user.userId };
            const result = await SubmissionService.evaluateSubmission(data, true);
            res.status(200).json(result);
        } catch (error) {
            if (error.message.includes('limit reached')) {
                return res.status(429).json({ error: 'Rate Limit Exceeded', message: error.message });
            }
            next(error);
        }
    }

    async submitAnswer(req, res, next) {
        try {
            if (!req.user) return res.status(401).json({ error: 'User required' });

            await UserService.checkAndIncrementLimit(req.user, 'submit');

            // Validate input
            const validationResult = submissionSchema.safeParse(req.body);

            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map(e => e.message);
                return res.status(400).json({ error: 'Validation Error', messages: errorMessages });
            }

            const data = { ...validationResult.data, userId: req.user.userId };
            const result = await SubmissionService.evaluateSubmission(data, false);
            res.status(201).json(result);
        } catch (error) {
            if (error.message.includes('limit reached')) {
                return res.status(429).json({ error: 'Rate Limit Exceeded', message: error.message });
            }
            if (error.message === 'Question not found') {
                return res.status(404).json({ error: 'Not Found', message: error.message });
            }
            next(error);
        }
    }

    async getStats(req, res, next) {
        try {
            const { questionId } = req.params;
            const stats = await SubmissionService.getStats(questionId);
            res.status(200).json(stats);
        } catch (error) {
            next(error);
        }
    }

    async getUserStats(req, res, next) {
        try {
            const userId = req.user.userId;
            const stats = await SubmissionService.getUserStats(userId);
            res.status(200).json(stats);
        } catch (error) {
            next(error);
        }
    }

    async getLeaderboard(req, res, next) {
        try {
            const { difficulty } = req.query;
            const leaderboard = await SubmissionService.getLeaderboard(difficulty);
            res.status(200).json(leaderboard);
        } catch (error) {
            next(error);
        }
    }
}

export default new SubmissionController();
