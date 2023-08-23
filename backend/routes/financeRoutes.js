import express from 'express';
import {
  countFinancialReports,
  createExpense,
  deleteAllFinance,
  deleteFinance,
  getAllFinance,
  getFinance,
  totalIncome,
  updateFinance,
} from '../controllers/financeController.js';

// Finance Router
const financeRouter = express.Router();

// Finance routes
financeRouter.post('/new-expense', createExpense);
financeRouter.put('/:id', updateFinance);
financeRouter.get('/:id', getFinance);
financeRouter.delete('/:id', deleteFinance);
financeRouter.get('/', getAllFinance);
financeRouter.get('/total/surplus-or-deficit', totalIncome);
financeRouter.get('/count/finanical-reports', countFinancialReports);
financeRouter.delete('/', deleteAllFinance);

// Export finance router
export default financeRouter;
