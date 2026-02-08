import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    password: { type: String, select: false }, // Hidden by default for security
    name: { type: String, trim: true },
    role: { type: String, enum: ['free', 'paid', 'admin'], default: 'free' },
    dailyActivity: {
        date: { type: String }, // YYYY-MM-DD
        runs: { type: Number, default: 0 },
        submissions: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    // Need to explicitly select password since it's hidden by default
    const user = await mongoose.model('User').findById(this._id).select('+password');
    if (!user || !user.password) return false;
    return bcrypt.compare(candidatePassword, user.password);
};

// Method to get public profile (without sensitive data)
userSchema.methods.toPublicJSON = function () {
    return {
        userId: this.userId,
        email: this.email,
        name: this.name,
        role: this.role,
        dailyActivity: this.dailyActivity,
        createdAt: this.createdAt
    };
};

export default mongoose.model('User', userSchema);
