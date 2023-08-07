import express from 'express';
import { countSacraments, createSacrament, deleteSacrament, getAllSacraments, getSacrament, updateSacrament } from '../controllers/sacramentController.js';

// Sacrament Router
const sacramentRouter = express.Router();

// Sacrament routes
sacramentRouter.post('/new-sacrament', createSacrament);
sacramentRouter.put('/:id', updateSacrament);
sacramentRouter.get('/:id', getSacrament);
sacramentRouter.delete('/:id', deleteSacrament);
sacramentRouter.get('/', getAllSacraments);
sacramentRouter.get('/count/all-sacraments', countSacraments);


// Export sacrament router
export default sacramentRouter;
