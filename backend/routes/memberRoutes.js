import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  userCount,
} from '../controllers/memberController.js';

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.get('/:id', getUser);
memberRouter.delete('/:id', deleteUser);
memberRouter.get('/', getAllUsers);
memberRouter.get('/count/members', userCount);

// Export user router
export default memberRouter;
