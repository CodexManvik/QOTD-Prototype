import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    problemStatement: { type: String, required: true },
    sampleInput: { type: String, required: true },
    sampleOutput: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    solution: { type: String, select: false }, // Hidden by default
    hints: [{ type: String }]
});

export default mongoose.model('Question', questionSchema);
