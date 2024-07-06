import express from "express";
import {
  createContribution,
  getAllContributions,
  getAllMemberContribution,
} from "../../controllers/contribution/index.js";

// Contribution Router
const contributionRouter = express.Router();

// Contribution Routes
contributionRouter.post("/new-contribution", createContribution);
contributionRouter.get("/", getAllContributions);
contributionRouter.get("/:userId", getAllMemberContribution);

// Export Contribution Router
export default contributionRouter;
