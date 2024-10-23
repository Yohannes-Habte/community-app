import express from "express";
import {
  createFinanceReport,
  deleteFinanceReport,
  getAllFinancialReports,
  getFinance,
  totalIncome,
  updateFinanceReport,
} from "../../controllers/finance/index.js";
import validateFinance from "../../validators/finance/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import {
  isAdmin,
  isAuthenticated,
  isFinanceManager,
} from "../../middlewares/auth/auth.js";

// Finance Router
const financeRouter = express.Router();

// Finance routes
financeRouter.post(
  "/new",
  isAuthenticated,
  isFinanceManager,
  validateFinance(),
  checkValidation,
  createFinanceReport
);

financeRouter.get(
  "/parish/admin",
  isAuthenticated,
  isAdmin,
  getAllFinancialReports
);

financeRouter.get(
  "/finance/manager",
  isAuthenticated,
  isFinanceManager,
  getAllFinancialReports
);

financeRouter.get(
  "/finances/:id",
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

financeRouter.put(
  "/finances/:id",
  isAuthenticated,
  isFinanceManager,
  updateFinanceReport
);

financeRouter.delete(
  "/finances/:id",
  isAuthenticated,
  isFinanceManager,
  deleteFinanceReport
);

// Export finance router
export default financeRouter;
