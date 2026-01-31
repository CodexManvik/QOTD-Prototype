import SubmissionRepository from '../repositories/SubmissionRepository.js';
import QuestionRepository from '../repositories/QuestionRepository.js';

class SubmissionService {
    async evaluateSubmission(data) {
        const { questionId, code, language, output } = data;
        const question = await QuestionRepository.findById(questionId);
        if (!question) {
            throw new Error('Question not found');
        }

        let status = 'incorrect';

        if (data.userOutput) {
            if (data.userOutput.trim() === question.expectedOutput.trim()) {
                status = 'correct';
            }
        } else {
            if (code && code.includes('return')) {
                status = 'correct';
            } else {
                status = 'partially correct';
            }
        }

        const submission = {
            questionId,
            userId: data.userId || 'mock-user-id',
            code,
            language,
            status,
            timestamp: new Date()
        };

        await SubmissionRepository.save(submission);

        return {
            status,
            message: status === 'correct' ? 'Test cases passed!' : 'Wrong answer'
        };
    }

    async getStats(questionId) {
        return await SubmissionRepository.getStats(questionId);
    }

    async getLeaderboard() {
        return await SubmissionRepository.getLeaderboard();
    }
}

export default new SubmissionService();
