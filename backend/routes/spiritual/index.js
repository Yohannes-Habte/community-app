import express from "express";
import {
  createSpiritual,
  deleteSpiritual,
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
spiritualRouter.delete("/:userId/:id", deleteSpiritual);
spiritualRouter.get("/size/total", totalNumberOfSpirituals);

// Export spiritual development router
export default spiritualRouter;
