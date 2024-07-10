import express from "express";
import {
  createFinanceReport,
  deleteFinanceReport,
  financialReports,
  getFinance,
  totalIncome,
} from "../../controllers/finance/index.js";
import validateFinance from "../../validators/finance/index.js";
import checkValidation from "../../validators/validationResult/index.js";

// Finance Router
const financeRouter = express.Router();

// Finance routes
financeRouter.post(
  "/new-report",
  validateFinance(),
  checkValidation,
  createFinanceReport
);
financeRouter.get("/financial-reports", financialReports);
financeRouter.get("/financial-reports/:id", getFinance);
financeRouter.get("/total/surplus-or-deficit", totalIncome);
financeRouter.delete("/delete-report/:id", deleteFinanceReport);

// Export finance router
export default financeRouter;
