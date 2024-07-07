import express from "express";
import { createEvent, getAllEvents } from "../../controllers/event/index.js";

// Event Router
const eventRouter = express.Router();

// Event Routes
eventRouter.post("/new-event", createEvent);
eventRouter.get("/", getAllEvents);

// Export Event Router
export default eventRouter;
