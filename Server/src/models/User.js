import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    role: { type: String, enum: ['free', 'paid', 'admin'], default: 'free' },
    dailyActivity: {
        date: { type: String }, // DD-MM-YYYY
        runs: { type: Number, default: 0 },
        submissions: { type: Number, default: 0 }
    }
});

export default mongoose.model('User', userSchema);
