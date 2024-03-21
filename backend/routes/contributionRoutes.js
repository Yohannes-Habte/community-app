import express from 'express';
import { createContribution } from '../controllers/constributionController.js';

// Contribution Router
const contributionRouter = express.Router();

// Contribution Routes
contributionRouter.post('/new-contribution', createContribution);

// Export Contribution Router
export default contributionRouter;
