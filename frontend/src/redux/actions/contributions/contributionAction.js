import axios from "axios";

import { API } from "../../../utiles/securitiy/secreteKey"; // Import API key or endpoint
import {
  postContributionStart,
  postContributionSuccess,
  postContributionFailure,
  fetchContributionStart,
  fetchContributionSuccess,
  fetchContributionFailure,
  updateContributionStart,
  updateContributionSuccess,
  updateContributionFailure,
  deleteContributionStart,
  deleteContributionSuccess,
  deleteContributionFailure,
  fetchAllContributionsStart,
  fetchAllContributionsSuccess,
  fetchAllContributionsFailure,
  clearErrors,
} from "../../reducers/contribution/contributionReducer";

//==============================================================================
// Fetch All Contributions
//==============================================================================
export const fetchAllContributions = () => async (dispatch) => {
  dispatch(fetchAllContributionsStart());
  try {
    const response = await axios.get(`${API}/contributions`, {
      withCredentials: true,
    });
    dispatch(fetchAllContributionsSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchAllContributionsFailure(error.message));
  }
};

//==============================================================================
// Post New Contribution
//==============================================================================
export const postContribution = (contributionData) => async (dispatch) => {
  dispatch(postContributionStart());
  try {
    const response = await axios.post(
      `${API}/contributions`,
      contributionData,
      {
        withCredentials: true, // If needed for authentication
      }
    );
    dispatch(postContributionSuccess(response.data.result));
  } catch (error) {
    dispatch(postContributionFailure(error.message));
  }
};

//==============================================================================
// Fetch Single Contribution by ID
//==============================================================================
export const fetchContribution = (id) => async (dispatch) => {
  dispatch(fetchContributionStart());
  try {
    const response = await axios.get(`${API}/contributions/${id}`);
    dispatch(fetchContributionSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchContributionFailure(error.message));
  }
};

//==============================================================================
// Update Contribution by ID
//==============================================================================
export const updateContribution = (id, updatedData) => async (dispatch) => {
  dispatch(updateContributionStart());
  try {
    const response = await axios.put(
      `${API}/contributions/${id}`,
      updatedData,
      {
        withCredentials: true, // If needed for authentication
      }
    );
    dispatch(updateContributionSuccess(response.data.result));
  } catch (error) {
    dispatch(updateContributionFailure(error.message));
  }
};

//==============================================================================
// Delete Contribution by ID
//==============================================================================
export const deleteContribution = (id) => async (dispatch) => {
  dispatch(deleteContributionStart());
  try {
    await axios.delete(`${API}/contributions/${id}`, {
      withCredentials: true, // If needed for authentication
    });
    dispatch(deleteContributionSuccess(id));
  } catch (error) {
    dispatch(deleteContributionFailure(error.message));
  }
};

//==============================================================================
// Clear Errors
//==============================================================================
export const clearContributionErrors = () => (dispatch) => {
  dispatch(clearErrors());
};
