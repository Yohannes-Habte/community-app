import express from "express";
import {
  createContribution,
  deleteContribution,
  getAllContributions,
  getAllMemberContribution,
} from "../../controllers/contribution/index.js";
import validateContribution from "../../validators/contribution/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import {
  isAuthenticated,
  isFinanceManager,
} from "../../middlewares/auth/auth.js";

// Contribution Router
const contributionRouter = express.Router();

// Contribution Routes
contributionRouter.post(
  "/new",
  isAuthenticated,
  isFinanceManager,
  validateContribution(),
  checkValidation,
  createContribution
);

contributionRouter.get(
  "/",
  isAuthenticated,
  isFinanceManager,
  getAllContributions
);

contributionRouter.get(
  "/user/contribution",
  isAuthenticated,
  getAllMemberContribution
);

contributionRouter.delete(
  "/:id",
  isAuthenticated,
  isFinanceManager,
  deleteContribution
);

// Export Contribution Router
export default contributionRouter;
