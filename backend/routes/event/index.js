import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getLastEvent,
  updateEvent,
} from "../../controllers/event/index.js";
import validateEvent from "../../validators/event/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import {
  isAdmin,
  isAuthenticated,
  isPriest,
} from "../../middlewares/auth/auth.js";

// Event Router
const eventRouter = express.Router();

// Event Routes
eventRouter.post(
  "/new",
  isAuthenticated,
  isAdmin,
  validateEvent(),
  checkValidation,
  createEvent
);

eventRouter.get("/", isAuthenticated, isAdmin, getAllEvents);

eventRouter.get("/priest", isAuthenticated, isPriest, getAllEvents);

eventRouter.get("/admin", isAuthenticated, isAdmin, getAllEvents);

eventRouter.get("/last-event", getLastEvent);

eventRouter.get("/:id", isAuthenticated, isAdmin, getEvent);

eventRouter.put("/:id", isAuthenticated, isAdmin, updateEvent);

eventRouter.delete("/:id", isAuthenticated, isAdmin, deleteEvent);

// Export Event Router
export default eventRouter;
