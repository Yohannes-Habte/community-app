import express from 'express';
import { createSacrament, getAllSacraments, getSingleSacrament } from '../controllers/sacramentController.js';

// Sacrament Router
const sacramentRouter = express.Router();

// Sacrament routes
sacramentRouter.post('/:userId/new-sacrament', createSacrament);
sacramentRouter.get('/:id', getSingleSacrament);
sacramentRouter.get('/', getAllSacraments);

// Export sacrament router
export default sacramentRouter;
