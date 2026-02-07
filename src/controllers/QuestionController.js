import QuestionService from '../services/QuestionService.js';

class QuestionController {
    async getDailyQuestion(req, res, next) {
        try {
            const question = await QuestionService.getDailyQuestion();
            res.status(200).json(question);
        } catch (error) {
            next(error);
        }
    }

    async getQuestionById(req, res, next) {
        try {
            const { id } = req.params;
            const question = await QuestionService.getQuestionById(id);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }
            res.status(200).json(question);
        } catch (error) {
            next(error);
        }
    }

    async createQuestion(req, res, next) {
        try {
            // Note: Service now returns an object with message, not a DB doc
            const result = await QuestionService.createQuestion(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async listQuestions(req, res, next) {
        try {
            const drafts = await QuestionService.getDraftQuestions();
            res.status(200).json(drafts);
        } catch (error) {
            next(error);
        }
    }

    async seedQuestions(req, res, next) {
        try {
            const result = await QuestionService.seedQuestions();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getSolution(req, res, next) {
        try {
            const { id } = req.params;
            const userRole = req.user ? req.user.role : 'free'; // Default to free if no user
            const solution = await QuestionService.getSolution(id, userRole);
            res.status(200).json(solution);
        } catch (error) {
            if (error.message.includes('Access Denied')) {
                return res.status(403).json({ error: 'Forbidden', message: error.message });
            }
            if (error.message === 'Question not found') {
                return res.status(404).json({ error: 'Not Found', message: error.message });
            }
            next(error);
        }
    }
}

export default new QuestionController();
