import JsonRepo from './json/QuestionRepository.js';
import MongoRepo from './mongo/QuestionRepository.js';
import dotenv from 'dotenv';
dotenv.config();

const dbType = process.env.DB_TYPE || 'json';

console.log(`Using QuestionRepository: ${dbType}`);

export default dbType === 'mongodb' ? MongoRepo : JsonRepo;
