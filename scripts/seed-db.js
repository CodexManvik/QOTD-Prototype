import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import Question from '../src/models/Question.js';

dotenv.config();

const DATA_PATH = path.resolve('data/questions.json');

const seedDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('Error: MONGODB_URI not defined in .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding');

        // Read JSON data
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        const questions = JSON.parse(data);

        // Clear existing questions
        await Question.deleteMany({});
        console.log('Existing questions removed');

        // Insert new questions
        await Question.insertMany(questions);
        console.log(`Seeded ${questions.length} questions successfully`);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
