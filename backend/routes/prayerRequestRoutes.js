import express from 'express';
import {
  createPrayerRequest,
  getAllPrayers,
  getSinglePrayer,
} from '../controllers/prayerRequestController.js';

// Prayer Service Router
const prayerRequestRouter = express.Router();

// Prayer service routes
prayerRequestRouter.post('/:userId/new-prayer-request', createPrayerRequest);
prayerRequestRouter.get('/:id', getSinglePrayer);
prayerRequestRouter.get('/', getAllPrayers);

// Export prayer service router
export default prayerRequestRouter;
