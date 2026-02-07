import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.resolve('data/questions.json');

class QuestionRepository {
    async _readData() {
        try {
            const data = await fs.readFile(DATA_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading questions.json:', error);
            throw new Error('Database connection failed');
        }
    }

    async findByDate(dateStr) {
        const questions = await this._readData();
        return questions.find(q => q.date === dateStr);
    }

    async findById(id) {
        const questions = await this._readData();
        return questions.find(q => q.id === id);
    }

    async findAll() {
        return await this._readData();
    }
}

export default new QuestionRepository();
