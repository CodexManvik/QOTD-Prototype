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
}

export default new QuestionController();
