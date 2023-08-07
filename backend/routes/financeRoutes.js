import express from 'express';
import {
  countFinancialReports,
  createFinace,
  deleteFinance,
  getAllFinance,
  getFinance,
  updateFinance,
} from '../controllers/financeController.js';

// Finance Router
const financeRouter = express.Router();

// Finance routes
financeRouter.post('/new-finance', createFinace);
financeRouter.put('/:id', updateFinance);
financeRouter.get('/:id', getFinance);
financeRouter.delete('/:id', deleteFinance);
financeRouter.get('/', getAllFinance);
financeRouter.get('/count/finanical-reports', countFinancialReports);

// Export finance router
export default financeRouter;
