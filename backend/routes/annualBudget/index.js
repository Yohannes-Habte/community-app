import express from "express";
import {
  createAnnualBudget,
  deleteAnnualBudget,
  getAnnualBudgets,
  getSingleAnnualBudget,
  updateAnnualBudget,
} from "../../controllers/annualBudget/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";

import checkValidation from "../../validators/validationResult/index.js";
import validateAnnualBudget from "../../validators/annualBudget/index.js";

const annualBudgetRouter = express.Router();

annualBudgetRouter.post(
  "/new",
  isAuthenticated,
  isAdmin,
  validateAnnualBudget(),
  checkValidation,
  createAnnualBudget
);
annualBudgetRouter.get("/", isAuthenticated, isAdmin, getAnnualBudgets);
annualBudgetRouter.get("/:id", isAuthenticated, isAdmin, getSingleAnnualBudget);
annualBudgetRouter.put("/:id", isAuthenticated, isAdmin, updateAnnualBudget);
annualBudgetRouter.delete("/:id", isAuthenticated, isAdmin, deleteAnnualBudget);

export default annualBudgetRouter;
