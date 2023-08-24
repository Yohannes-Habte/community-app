import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  userCount,
} from '../controllers/memberController.js';

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.post('/register', registerUser);
memberRouter.post('/login', loginUser);
memberRouter.put('/:id', updateUser);
memberRouter.get('/:id', getUser);
memberRouter.delete('/:id', deleteUser);
memberRouter.get('/', getAllUsers);
memberRouter.get('/count/members', userCount);

// Export user router
export default memberRouter;
