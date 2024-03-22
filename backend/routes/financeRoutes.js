import express from 'express';
import {
  createFinanceReport,
  financialReports,
  getFinance,
  totalIncome,
} from '../controllers/financeController.js';

// Finance Router
const financeRouter = express.Router();

// Finance routes
financeRouter.post('/new-report', createFinanceReport);
financeRouter.get('/financial-reports', financialReports);
financeRouter.get('/financial-reports/:id', getFinance);
financeRouter.get('/total/surplus-or-deficit', totalIncome);

// Export finance router
export default financeRouter;
