import mongoose from 'mongoose';

const connectDB = async () => {
    if (process.env.DB_TYPE !== 'mongodb') {
        console.log('Skipping MongoDB connection (DB_TYPE not set to mongodb)');
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
