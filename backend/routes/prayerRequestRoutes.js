import express from 'express';
import { createPrayerRequest } from '../controllers/prayerRequestController.js';

// Prayer Service Router
const prayerRequestRouter = express.Router();

// Prayer service routes
prayerRequestRouter.post('/:userId/new-prayer-request', createPrayerRequest);

// Export prayer service router
export default prayerRequestRouter;
