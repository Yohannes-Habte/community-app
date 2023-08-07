import express from 'express';
import {
  countComments,
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from '../controllers/commentController.js';

// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post('/new-comment', createComment);
commentRouter.put('/:id', updateComment);
commentRouter.get('/:id', getComment);
commentRouter.delete('/:id', deleteComment);
commentRouter.get('/', getAllComments);
commentRouter.get('/count/all-comments', countComments);

// Export comment router
export default commentRouter;
