import SubmissionService from '../services/SubmissionService.js';
import { submissionSchema } from '../validators/submission.validator.js';

class SubmissionController {
    async submitAnswer(req, res, next) {
        try {
            // Validate input
            const validationResult = submissionSchema.safeParse(req.body);

            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map(e => e.message);
                return res.status(400).json({ error: 'Validation Error', messages: errorMessages });
            }

            const result = await SubmissionService.evaluateSubmission(validationResult.data);
            res.status(201).json(result);
        } catch (error) {
            // If question not found or other service errors
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

    async getLeaderboard(req, res, next) {
        try {
            const leaderboard = await SubmissionService.getLeaderboard();
            res.status(200).json(leaderboard);
        } catch (error) {
            next(error);
        }
    }
}

export default new SubmissionController();
