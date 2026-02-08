import QuestionRepository from '../repositories/QuestionRepository.js';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.resolve('data/questions.json');

class QuestionService {
    async getDailyQuestion() {
        const today = new Date().toISOString().split('T')[0];

        // Try to find today's question
        let question = await QuestionRepository.findByDate(today);

        // If no question for today, get the most recent one
        if (!question) {
            const allQuestions = await QuestionRepository.findAll();
            if (allQuestions.length === 0) {
                throw new Error('No questions available in the system.');
            }
            // Sort by date descending and get the most recent
            question = allQuestions.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        }

        if (!question) throw new Error('No questions available in the system.');

        // Return question without solution (for regular users)
        const { solution, ...publicQuestion } = question;
        return publicQuestion;
    }

    async createQuestion(data) {
        // 1. Read existing JSON
        let questions = [];
        try {
            const fileData = await fs.readFile(DATA_PATH, 'utf-8');
            questions = JSON.parse(fileData);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        // 2. Append new question
        if (!data.date) {
            data.date = new Date().toISOString().split('T')[0];
        }

        // Ensure ID uniqueness
        if (questions.find(q => q.id === data.id)) {
            throw new Error(`Question ID ${data.id} already exists in draft.`);
        }

        questions.push(data);

        // 3. Write back to JSON
        await fs.writeFile(DATA_PATH, JSON.stringify(questions, null, 4), 'utf-8');

        return { message: 'Question added to Draft (JSON).', id: data.id };
    }

    async seedQuestions() {
        // For in-memory mode, just return the count from JSON
        try {
            const fileData = await fs.readFile(DATA_PATH, 'utf-8');
            const questions = JSON.parse(fileData);
            return { count: questions.length, message: 'Questions loaded from JSON file.' };
        } catch (error) {
            throw new Error(`Loading failed: ${error.message}`);
        }
    }

    async getSolution(id, userRole) {
        if (userRole !== 'paid' && userRole !== 'admin') {
            throw new Error('Access Denied: Only paid users can view the solution.');
        }

        const question = await QuestionRepository.findById(id);
        if (!question) throw new Error('Question not found');

        return { id: question.id, title: question.title, solution: question.solution };
    }

    async getDraftQuestions() {
        try {
            const fileData = await fs.readFile(DATA_PATH, 'utf-8');
            return JSON.parse(fileData);
        } catch (error) {
            return [];
        }
    }
}

export default new QuestionService();
