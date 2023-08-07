import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  userCount,
} from '../controllers/userController.js';

// User Router
const userRouter = express.Router();

// User Route
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/:id', updateUser);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);
userRouter.get('/', getAllUsers);
userRouter.get('/count/members', userCount);

// Export user router
export default userRouter;
