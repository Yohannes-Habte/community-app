import express from "express";
import {
  createFinanceReport,
  deleteFinanceReport,
  getAllFinancialReports,
  getFinance,
  totalIncome,
} from "../../controllers/finance/index.js";
import validateFinance from "../../validators/finance/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import {
  isAuthenticated,
  isFinanceManager,
} from "../../middlewares/auth/auth.js";

// Finance Router
const financeRouter = express.Router();

// Finance routes
financeRouter.post(
  "/new-report",
  validateFinance(),
  checkValidation,
  isAuthenticated,
  isFinanceManager,
  createFinanceReport
);

financeRouter.get(
  "/financial-reports",
  isAuthenticated,
  isFinanceManager,
  getAllFinancialReports
);

financeRouter.get(
  "/financial-reports/:id",
  isAuthenticated,
  isFinanceManager,
  getFinance
);

financeRouter.get(
  "/total/income",
  isAuthenticated,
  isFinanceManager,
  totalIncome
);

financeRouter.delete(
  "/delete-report/:id",
  isAuthenticated,
  isFinanceManager,
  deleteFinanceReport
);

// Export finance router
export default financeRouter;
