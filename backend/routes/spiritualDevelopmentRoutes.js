import express from 'express';

// Spiritual Development Router
const spiritualDevelopmentRouter = express.Router();

// Spiritual development routes
spiritualDevelopmentRouter.post('/new-spiritual-development');
spiritualDevelopmentRouter.put('/:id');
spiritualDevelopmentRouter.delete('/:id');
spiritualDevelopmentRouter.get('/');

// Export spiritual development router
export default spiritualDevelopmentRouter;
