import express from 'express';
import { createSacrament } from '../controllers/sacramentController.js';

// Sacrament Router
const sacramentRouter = express.Router();

// Sacrament routes
sacramentRouter.post('/:userId/new-sacrament', createSacrament);

// Export sacrament router
export default sacramentRouter;
