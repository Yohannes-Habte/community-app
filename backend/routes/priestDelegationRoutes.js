import express from 'express';
import { createPriestDelegation } from '../controllers/priestDelegationController.js';

// Priest Delegation Router
const priestDelegationRouter = express.Router();

// Priest Delegation routes
priestDelegationRouter.post('/:priestId/delegate', createPriestDelegation);

// Export Priest Delegation router
export default priestDelegationRouter;