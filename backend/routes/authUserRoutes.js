import express from 'express';
import {
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/authController.js';

// Auth User Router
const authUserRouter = express.Router();

// User Routes
authUserRouter.post('/register', registerUser);
authUserRouter.post('/login', loginUser);
authUserRouter.put('/update/:userId', updateUser);

// Export Auth User Router
export default authUserRouter;
