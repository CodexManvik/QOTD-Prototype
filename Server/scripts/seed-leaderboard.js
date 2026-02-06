import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Submission from '../src/models/Submission.js';

dotenv.config();

const users = [
    "algo_king", "python_guru", "cpp_master", "java_duke",
    "rust_ace", "go_speed", "ruby_gem", "node_ninja",
    "sql_wizard", "haskell_sage"
];

const seedLeaderboard = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('Error: MONGODB_URI not defined in .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding Submissions');

        // Optimization: Create Indexes for Scalability
        // Note: Commented out to avoid disk space safety checks on small Railway volumes for this demo
        // 1. Leaderboard: Sorts by score (desc) and timestamp (asc)
        await Submission.collection.createIndex({ score: -1, timestamp: 1 });

        // 2. Stats: Filters by questionId and status
        await Submission.collection.createIndex({ questionId: 1, status: 1 });

        console.log('Database Indexes (Skipped for Seeding)');

        // Clear existing submissions for Leaderboard cleanliness
        await Submission.deleteMany({});
        console.log('Cleared existing submissions for leaderboard');

        // Create 100 total submissions to hit 97% demo success rate (97 Correct, 3 Incorrect)

        const submissions = [];
        //Top 10 "Cool" Users (Correct) - High Scores
        for (let i = 0; i < users.length; i++) {
            submissions.push({
                questionId: 'qotd-001',
                userId: users[i],
                code: `print("Solution by ${users[i]}")`,
                language: 'python',
                status: 'correct',
                score: 150 - (i * 5), // Descending scores: 150, 145, 140...
                timestamp: new Date(Date.now() - (i * 60000))
            });
        }


        for (let i = 0; i < 87; i++) {
            submissions.push({
                questionId: 'qotd-001',
                userId: `student_${i}`,
                code: 'print("Passed")',
                language: 'python',
                status: 'correct',
                score: 100, // Base score
                timestamp: new Date(Date.now() - 7200000 - (i * 60000))
            });
        }


        for (let i = 0; i < 3; i++) {
            submissions.push({
                questionId: 'qotd-001',
                userId: `newbie_${i}`,
                code: 'print("Error")',
                language: 'python',
                status: 'incorrect',
                timestamp: new Date(Date.now() - 10000000)
            });
        }

        await Submission.insertMany(submissions);
        console.log(`Seeded ${submissions.length} submissions for leaderboard`);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedLeaderboard();
