import express from "express";
import {
  createAnnualBudget,
  getAnnualBudgets,
} from "../../controllers/annualBudget/index.js";

const annualBudgetRouter = express.Router();

annualBudgetRouter.post("/new", createAnnualBudget);
annualBudgetRouter.get("/", getAnnualBudgets);
annualBudgetRouter.get("/:id");
annualBudgetRouter.put("/:id");
annualBudgetRouter.delete("/:id");

export default annualBudgetRouter;
