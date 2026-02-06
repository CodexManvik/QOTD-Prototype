import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import SubmissionController from '../controllers/SubmissionController.js';

const router = express.Router();

// Question Routes
router.get('/qotd', QuestionController.getDailyQuestion);
router.get('/admin/questions', QuestionController.listQuestions); // New: View Drafts
router.post('/admin/questions', QuestionController.createQuestion);
router.post('/admin/seed', QuestionController.seedQuestions);
router.get('/solution/:id', QuestionController.getSolution);

// Submission Routes
router.post('/run', SubmissionController.runCode);
router.post('/submissions', SubmissionController.submitAnswer);
router.get('/stats/me', SubmissionController.getUserStats);
router.get('/stats/:questionId', SubmissionController.getStats);
router.get('/leaderboard', SubmissionController.getLeaderboard);

export default router;
