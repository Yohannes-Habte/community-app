import express from 'express';
import {
  countSpiritual,
  createSpiritual,
  deleteSpiritual,
  getAllSpiritual,
  getSpiritual,
  updateSpiritual,
} from '../controllers/spiritualDevelopmentController.js';


// Spiritual Development Router
const spiritualDevelopmentRouter = express.Router();

// Spiritual development routes
spiritualDevelopmentRouter.post('/new', createSpiritual);
spiritualDevelopmentRouter.put('/:id', updateSpiritual);
spiritualDevelopmentRouter.get('/:id', getSpiritual);
spiritualDevelopmentRouter.delete('/:id', deleteSpiritual);
spiritualDevelopmentRouter.get('/', getAllSpiritual);
spiritualDevelopmentRouter.get('/count/spiritual-services', countSpiritual);

// Export spiritual development router
export default spiritualDevelopmentRouter;