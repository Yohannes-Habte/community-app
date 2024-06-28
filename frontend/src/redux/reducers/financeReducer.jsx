import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentReport: null,
  error: null,
  loading: false,
  financialReports: [],
  reportsError: null,
  reportsLoading: false,
};

const financeReducer = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    // Post a financial report
    financialReportStart: (state) => {
      state.loading = true;
    },
    financialReportSuccess: (state, action) => {
      state.currentReport = action.payload;
      state.loading = false;
    },
    financialReportFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Get all financial reports
    getALLFinancialReportStart: (state) => {
      state.reportsLoading = true;
    },
    getALLFinancialReportSuccess: (state, action) => {
      state.financialReports = action.payload;
      state.reportsLoading = false;
    },
    getALLFinancialReportFailure: (state, action) => {
      state.reportsError = action.payload;
      state.reportsLoading = false;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  financialReportStart,
  financialReportSuccess,
  financialReportFailure,

  getALLFinancialReportStart,
  getALLFinancialReportSuccess,
  getALLFinancialReportFailure,

  clearErrors,
} = financeReducer.actions;

export default financeReducer.reducer;
