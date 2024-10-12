import axios from "axios";
import {
  postFinancialReportStart,
  postFinancialReportSuccess,
  postFinancialReportFailure,
  fetchFinancialReportStart,
  fetchFinancialReportSuccess,
  fetchFinancialReportFailure,
  updateFinancialReportStart,
  updateFinancialReportSuccess,
  updateFinancialReportFailure,
  deleteFinancialReportStart,
  deleteFinancialReportSuccess,
  deleteFinancialReportFailure,
  fetchAllFinancialReportsStart,
  fetchAllFinancialReportsSuccess,
  fetchAllFinancialReportsFailure,
  clearFinanceErrors,
} from "../../reducers/finance/financeReducer";

import { API } from "../../../utiles/securitiy/secreteKey";

//==============================================================================
// Post a Financial Report
//==============================================================================
export const postFinancialReport = (reportData) => async (dispatch) => {
  dispatch(postFinancialReportStart());
  try {
    const response = await axios.post(`${API}`, reportData, {
      withCredentials: true,
    });
    dispatch(postFinancialReportSuccess(response.data));
  } catch (error) {
    dispatch(postFinancialReportFailure(error.message));
  }
};

//==============================================================================
// Fetch a Single Financial Report
//==============================================================================
export const fetchFinancialReport = (reportId) => async (dispatch) => {
  dispatch(fetchFinancialReportStart());
  try {
    const response = await axios.get(`${API}/reports/${reportId}`, {
      withCredentials: true,
    });
    dispatch(fetchFinancialReportSuccess(response.data));
  } catch (error) {
    dispatch(fetchFinancialReportFailure(error.message));
  }
};

//==============================================================================
// Update a Financial Report
//==============================================================================
export const updateFinancialReport =
  (reportId, updatedData) => async (dispatch) => {
    dispatch(updateFinancialReportStart());
    try {
      const response = await axios.put(
        `${API}/reports/${reportId}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      dispatch(updateFinancialReportSuccess(response.data));
    } catch (error) {
      dispatch(updateFinancialReportFailure(error.message));
    }
  };

//==============================================================================
// Delete a Financial Report
//==============================================================================
export const deleteFinancialReport = (reportId) => async (dispatch) => {
  dispatch(deleteFinancialReportStart());
  try {
    const response = await axios.get(`${API}/reports/${reportId}`, {
      withCredentials: true,
    });
    dispatch(deleteFinancialReportSuccess(response.data));
  } catch (error) {
    dispatch(deleteFinancialReportFailure(error.message));
  }
};

//==============================================================================
// Fetch All Financial Reports for parish finance manager
//==============================================================================
export const fetchAllFinancialReports =
  () => async (dispatch) => {
    dispatch(fetchAllFinancialReportsStart());
    try {
      const response = await axios.get(`${API}/reports/finance/manager`, {
        withCredentials: true,
      });
      dispatch(fetchAllFinancialReportsSuccess(response.data.result));
    } catch (error) {
      dispatch(fetchAllFinancialReportsFailure(error.message));
    }
  };

//==============================================================================
// Fetch All Financial Reports for admin
//==============================================================================
export const fetchAllFinancialReportsForAdmin = () => async (dispatch) => {
  dispatch(fetchAllFinancialReportsStart());
  try {
    const response = await axios.get(`${API}/reports/parish/admin`, {
      withCredentials: true,
    });
    dispatch(fetchAllFinancialReportsSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchAllFinancialReportsFailure(error.message));
  }
};

//==============================================================================
// Clear Financial Report Errors
//==============================================================================
export const clearFinancialReportErrors = () => (dispatch) => {
  dispatch(clearFinanceErrors());
};
