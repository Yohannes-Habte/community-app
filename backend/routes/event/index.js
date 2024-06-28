import express from 'express';
import { createEvent } from '../../controllers/event/index.js';

// Event Router
const eventRouter = express.Router();

// Event Routes
eventRouter.post('/new-event', createEvent);

// Export Event Router
export default eventRouter;