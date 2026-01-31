import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import SubmissionController from '../controllers/SubmissionController.js';

const router = express.Router();

// Question Routes
router.get('/qotd', QuestionController.getDailyQuestion);

// Submission Routes
router.post('/submissions', SubmissionController.submitAnswer);
router.get('/stats/:questionId', SubmissionController.getStats);
router.get('/leaderboard', SubmissionController.getLeaderboard);

export default router;
