import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    questionId: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    status: { type: String, enum: ['correct', 'incorrect', 'partially correct'], required: true },
    score: { type: Number, default: 0 },
    userId: { type: String, default: 'anonymous' },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);
