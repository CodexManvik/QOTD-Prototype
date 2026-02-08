import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import SubmissionController from '../controllers/SubmissionController.js';
import AuthController from '../controllers/AuthController.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Auth Routes (public)
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/me', AuthController.getCurrentUser);
router.patch('/auth/role', requireAuth, AuthController.updateRole);

// Question Routes
router.get('/qotd', QuestionController.getDailyQuestion);
router.get('/admin/questions', requireAuth, requireRole('admin'), QuestionController.listQuestions);
router.post('/admin/questions', requireAuth, requireRole('admin'), QuestionController.createQuestion);
router.post('/admin/seed', QuestionController.seedQuestions);
router.get('/solution/:id', QuestionController.getSolution);

// Submission Routes
router.post('/run', SubmissionController.runCode);
router.post('/submissions', SubmissionController.submitAnswer);
router.get('/stats/me', requireAuth, SubmissionController.getUserStats);
router.get('/stats/:questionId', SubmissionController.getStats);
router.get('/leaderboard', SubmissionController.getLeaderboard);

export default router;
