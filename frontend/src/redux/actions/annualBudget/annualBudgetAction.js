import axios from "axios";
import {
  addAnnualBudgetFailure,
  addAnnualBudgetStart,
  addAnnualBudgetSuccess,
  deleteAnnualBudgetFailure,
  deleteAnnualBudgetStart,
  deleteAnnualBudgetSuccess,
  fetchAllAnnualBudgetsFailure,
  fetchAllAnnualBudgetsStart,
  fetchAllAnnualBudgetsSuccess,
  fetchSingleAnnualBudgetFailure,
  fetchSingleAnnualBudgetStart,
  fetchSingleAnnualBudgetSuccess,
  updateAnnualBudgetFailure,
  updateAnnualBudgetStart,
  updateAnnualBudgetSuccess,
} from "../../reducers/annualBudget/annualBudgetReducer";
import { API } from "../../../utile/security/secreteKey";

/** Add a new annual budget */
export const addAnnualBudget = (budgetData) => async (dispatch) => {
  dispatch(addAnnualBudgetStart());
  try {
    const response = await axios.post(`${API}/budgets/new`, budgetData, {
      withCredentials: true,
    });
    dispatch(addAnnualBudgetSuccess(response.data.message));
  } catch (error) {
    // Check if it's an Axios error
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Backend response:", error.response);
        // Handle different HTTP status codes
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again later.";

        if (error.response.status === 400) {
          // Bad Request (typically validation errors)
          dispatch(
            addAnnualBudgetFailure(
              "Invalid input data. Please check your entries and try again."
            )
          );
        } else if (error.response.status === 401) {
          // Unauthorized (e.g., login session expired)
          dispatch(addAnnualBudgetFailure("Unauthorized access!"));
        } else if (error.response.status === 500) {
          // Server error
          dispatch(
            addAnnualBudgetFailure("Server error. Please try again later.")
          );
        } else {
          // Default error message for other status codes
          dispatch(addAnnualBudgetFailure(errorMessage));
        }
      } else {
        // If no response, it might be a network issue
        dispatch(
          addAnnualBudgetFailure(
            "Network error. Please check your internet connection."
          )
        );
      }
    } else {
      // If it's not an Axios error, handle it as a generic error
      dispatch(
        addAnnualBudgetFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};

/** Fetch a single annual budget */
export const fetchSingleAnnualBudget = (id) => async (dispatch) => {
  dispatch(fetchSingleAnnualBudgetStart());
  try {
    const response = await axios.get(`${API}/budgets/${id}`, {
      withCredentials: true,
    });
    dispatch(fetchSingleAnnualBudgetSuccess(response.data.result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          "Could not fetch the budget. Please try again later.";

        if (error.response.status === 404) {
          dispatch(
            fetchSingleAnnualBudgetFailure(
              "Budget not found. Please try again."
            )
          );
        } else if (error.response.status === 500) {
          dispatch(
            fetchSingleAnnualBudgetFailure(
              "Server error. Please try again later."
            )
          );
        } else {
          dispatch(fetchSingleAnnualBudgetFailure(errorMessage));
        }
      } else {
        dispatch(
          fetchSingleAnnualBudgetFailure(
            "Network error. Please check your internet connection."
          )
        );
      }
    } else {
      dispatch(
        fetchSingleAnnualBudgetFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};

/** Update an annual budget */
export const updateAnnualBudget = (id, budgetData) => async (dispatch) => {
  dispatch(updateAnnualBudgetStart());
  try {
    const response = await axios.put(`${API}/budgets/${id}`, budgetData, {
      withCredentials: true,
    });
    dispatch(updateAnnualBudgetSuccess(response.data.message));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to update the budget. Please try again later.";

        if (error.response.status === 400) {
          dispatch(
            updateAnnualBudgetFailure(
              "Invalid data. Please check your entries and try again."
            )
          );
        } else if (error.response.status === 401) {
          dispatch(updateAnnualBudgetFailure("Unauthorized access!"));
        } else if (error.response.status === 404) {
          dispatch(
            updateAnnualBudgetFailure("Budget not found. Please try again.")
          );
        } else if (error.response.status === 500) {
          dispatch(
            updateAnnualBudgetFailure("Server error. Please try again later.")
          );
        } else {
          dispatch(updateAnnualBudgetFailure(errorMessage));
        }
      } else {
        dispatch(
          updateAnnualBudgetFailure(
            "Network error. Please check your internet connection."
          )
        );
      }
    } else {
      dispatch(
        updateAnnualBudgetFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};

/** Fetch all annual budgets */
export const fetchAllAnnualBudgets = () => async (dispatch) => {
  dispatch(fetchAllAnnualBudgetsStart());
  try {
    const response = await axios.get(`${API}/budgets`, {
      withCredentials: true,
    });
    dispatch(fetchAllAnnualBudgetsSuccess(response.data.result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          "Could not fetch budgets. Please try again later.";
        dispatch(fetchAllAnnualBudgetsFailure(errorMessage));
      } else {
        dispatch(
          fetchAllAnnualBudgetsFailure(
            "Network error. Please check your internet connection."
          )
        );
      }
    } else {
      dispatch(
        fetchAllAnnualBudgetsFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};

/** Delete an annual budget */
export const deleteAnnualBudget = (id) => async (dispatch) => {
  dispatch(deleteAnnualBudgetStart());
  try {
    const response = await axios.delete(`${API}/budgets/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteAnnualBudgetSuccess(response.data.message));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to delete the budget. Please try again later.";

        if (error.response.status === 404) {
          dispatch(deleteAnnualBudgetFailure("Budget not found."));
        } else if (error.response.status === 500) {
          dispatch(
            deleteAnnualBudgetFailure("Server error. Please try again later.")
          );
        } else {
          dispatch(deleteAnnualBudgetFailure(errorMessage));
        }
      } else {
        dispatch(
          deleteAnnualBudgetFailure(
            "Network error. Please check your internet connection."
          )
        );
      }
    } else {
      dispatch(
        deleteAnnualBudgetFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};
