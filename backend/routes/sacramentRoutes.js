import express from 'express';
import { createSacrament, getAllSacraments, getSingleSacrament, totalNumberOfSacraments } from '../controllers/sacramentController.js';

// Sacrament Router
const sacramentRouter = express.Router();

// Sacrament routes
sacramentRouter.post('/:userId/new-sacrament', createSacrament);
sacramentRouter.get('/:id', getSingleSacrament);
sacramentRouter.get('/', getAllSacraments);
sacramentRouter.get('/size/total', totalNumberOfSacraments);

// Export sacrament router
export default sacramentRouter;
