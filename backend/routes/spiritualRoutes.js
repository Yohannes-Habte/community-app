import express from 'express';
import { createSpiritual } from '../controllers/spiritualController.js';

// Spiritual Development Router
const spiritualRouter = express.Router();

// Spiritual development routes
spiritualRouter.post('/:userId/new', createSpiritual);

// Export spiritual development router
export default spiritualRouter;
