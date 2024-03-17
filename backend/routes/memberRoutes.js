import express from 'express';
import {
  deleteUserAddress,
  updateUserAddress,
} from '../controllers/memberController.js';

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.put('/:id/update-address', updateUserAddress);
memberRouter.delete('/:userId/address/:addressId', deleteUserAddress);

// Export user router
export default memberRouter;
