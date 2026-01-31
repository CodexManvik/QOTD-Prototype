import QuestionRepository from '../repositories/QuestionRepository.js';

class QuestionService {
    async getDailyQuestion() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const today = `${day}-${month}-${year}`;

        let question = await QuestionRepository.findByDate(today);

        if (!question) {
            const all = await QuestionRepository.findAll();
            if (all.length > 0) {
                question = all[0]; // fallback
            }
        }

        if (!question) {
            throw new Error('No questions available');
        }

        const { expectedOutput, ...publicData } = question;
        return publicData;
    }
}

export default new QuestionService();
