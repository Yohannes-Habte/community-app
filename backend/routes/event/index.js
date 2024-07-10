import express from "express";
import { createEvent, getAllEvents } from "../../controllers/event/index.js";
import validateEvent from "../../validators/event/index.js";
import checkValidation from "../../validators/validationResult/index.js";

// Event Router
const eventRouter = express.Router();

// Event Routes
eventRouter.post("/new-event", validateEvent(), checkValidation, createEvent);
eventRouter.get("/", getAllEvents);

// Export Event Router
export default eventRouter;
