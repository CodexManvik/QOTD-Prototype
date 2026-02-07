import Question from '../models/Question.js';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.resolve('data/questions.json');

class QuestionService {
    async getDailyQuestion() {
        // ... (Existing logic unchanged) ...
        const today = new Date().toISOString().split('T')[0];
        let question = await Question.findOne({ date: today });
        if (!question) question = await Question.findOne().sort({ date: -1 });
        if (!question) throw new Error('No questions available in the system.');
        return question;
    }

    async getQuestionById(id) {
        return await Question.findOne({ id });
    }

    async createQuestion(data) {
        // 1. Read existing JSON
        let questions = [];
        try {
            const fileData = await fs.readFile(DATA_PATH, 'utf-8');
            questions = JSON.parse(fileData);
        } catch (error) {
            // If file doesn't exist or is empty, start fresh or handle error
            if (error.code !== 'ENOENT') throw error;
        }

        // 2. Append new question
        if (!data.date) {
            data.date = new Date().toISOString().split('T')[0];
        }

        // Ensure ID uniqueness in JSON?
        // Simple check:
        if (questions.find(q => q.id === data.id)) {
            throw new Error(`Question ID ${data.id} already exists in draft.`);
        }

        questions.push(data);

        // 3. Write back to JSON
        await fs.writeFile(DATA_PATH, JSON.stringify(questions, null, 4), 'utf-8');

        return { message: 'Question added to Draft (JSON). Run Seed to publish.', id: data.id };
    }

    async seedQuestions() {
        // Trigger the seed logic programmatically
        try {
            const fileData = await fs.readFile(DATA_PATH, 'utf-8');
            const questions = JSON.parse(fileData);

            // Transactional-like replace
            await Question.deleteMany({});
            await Question.insertMany(questions);

            return { count: questions.length, message: 'Database successfully synced with JSON drafts.' };
        } catch (error) {
            throw new Error(`Seeding failed: ${error.message}`);
        }
    }

    async getSolution(id, userRole) {
        if (userRole !== 'paid' && userRole !== 'admin') {
            throw new Error('Access Denied: Only paid users can view the solution.');
        }
        const question = await Question.findOne({ id }).select('+solution');
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
