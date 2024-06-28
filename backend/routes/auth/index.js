import express from 'express';
import { loginUser, registerUser, updateUser, userChangePassword, userLogout } from '../../controllers/auth/index.js';

// Auth User Router
const authUserRouter = express.Router();

// User Routes
authUserRouter.post('/register', registerUser);
authUserRouter.post('/login', loginUser);
authUserRouter.put('/update/:userId', updateUser);
authUserRouter.get('/logout', userLogout);
authUserRouter.put('/change-password/:id', userChangePassword);

// Export Auth User Router
export default authUserRouter;
