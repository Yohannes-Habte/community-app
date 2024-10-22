import express from "express";
import {
  createEvent,
  getAllEvents,
  getLastEvent,
} from "../../controllers/event/index.js";
import validateEvent from "../../validators/event/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";

// Event Router
const eventRouter = express.Router();

// Event Routes
eventRouter.post(
  "/new-event",
  isAuthenticated,
  isAdmin,
  validateEvent(),
  checkValidation,
  createEvent
);
eventRouter.get("/", isAuthenticated, isAdmin, getAllEvents);

eventRouter.get("/last-event", getLastEvent);

// Export Event Router
export default eventRouter;
