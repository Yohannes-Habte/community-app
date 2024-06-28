import express from "express";
import {
  createSpiritual,
  getAllSpirituals,
  getSingleSpiritual,
  totalNumberOfSpirituals,
} from "../../controllers/spiritual/index.js";

// Spiritual Development Router
const spiritualRouter = express.Router();

// Spiritual development routes
spiritualRouter.post("/:userId/new", createSpiritual);
spiritualRouter.get("/:id", getSingleSpiritual);
spiritualRouter.get("/", getAllSpirituals);
spiritualRouter.get("/size/total", totalNumberOfSpirituals);

// Export spiritual development router
export default spiritualRouter;
