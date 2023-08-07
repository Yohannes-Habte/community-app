import express from 'express';
import {
  countPrayerService,
  createPrayerService,
  deletePrayerService,
  getAllPrayerService,
  getPrayerService,
  updatePrayerService,
} from '../controllers/prayerServiceController.js';

// Prayer Service Router
const prayerServiceRouter = express.Router();

// Prayer service routes
prayerServiceRouter.post('/new-prayer-service', createPrayerService);
prayerServiceRouter.put('/:id', updatePrayerService);
prayerServiceRouter.get('/:id', getPrayerService);
prayerServiceRouter.delete('/:id', deletePrayerService);
prayerServiceRouter.get('/', getAllPrayerService);
prayerServiceRouter.get('/count/all/prayers', countPrayerService);

// Export prayer service router
export default prayerServiceRouter;
