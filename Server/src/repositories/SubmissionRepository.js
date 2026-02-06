import JsonRepo from './json/SubmissionRepository.js';
import MongoRepo from './mongo/SubmissionRepository.js';
import dotenv from 'dotenv';
dotenv.config();

const dbType = process.env.DB_TYPE || 'json';

export default dbType === 'mongodb' ? MongoRepo : JsonRepo;
