import axios from "axios";
import {
  deleteDelegatedPriestFailure,
  deleteDelegatedPriestStart,
  deleteDelegatedPriestSuccess,
  fetchAllDelegatedPriestsFailure,
  fetchAllDelegatedPriestsStart,
  fetchAllDelegatedPriestsSuccess,
  fetchDelegatedPriestFailure,
  fetchDelegatedPriestStart,
  fetchDelegatedPriestSuccess,
  postDelegatePriestFailure,
  postDelegatePriestStart,
  postDelegatePriestSuccess,
  updateDelegatedPriestFailure,
  updateDelegatedPriestStart,
  updateDelegatedPriestSuccess,
  clearErrors
} from "../../reducers/delegation/delegationReducer";
import { API } from "../../../utile/security/secreteKey";




//==============================================================================
// Post Delegate Priest
//==============================================================================
export const postDelegatePriest = (priestData) => async (dispatch) => {
  dispatch(postDelegatePriestStart());
  try {
    const response = await axios.post(`${API}/priests/delegate`, priestData);
    dispatch(postDelegatePriestSuccess(response.data));
  } catch (error) {
    dispatch(postDelegatePriestFailure(error.message));
  }
};

//==============================================================================
// Fetch Delegated Priest
//==============================================================================
export const fetchDelegatedPriest = (priestId) => async (dispatch) => {
  dispatch(fetchDelegatedPriestStart());
  try {
    const response = await axios.get(`${API}/priests/delegate/${priestId}`);
    dispatch(fetchDelegatedPriestSuccess(response.data));
  } catch (error) {
    dispatch(fetchDelegatedPriestFailure(error.message));
  }
};

//==============================================================================
// Update Delegated Priest
//==============================================================================
export const updateDelegatedPriest =
  (priestId, updatedData) => async (dispatch) => {
    dispatch(updateDelegatedPriestStart());
    try {
      const response = await axios.put(
        `${API}/priests/delegate/${priestId}`,
        updatedData
      );
      dispatch(updateDelegatedPriestSuccess(response.data));
    } catch (error) {
      dispatch(updateDelegatedPriestFailure(error.message));
    }
  };

//==============================================================================
// Delete Delegated Priest
//==============================================================================
export const deleteDelegatedPriest = (priestId) => async (dispatch) => {
  dispatch(deleteDelegatedPriestStart());
  try {
    const response = await axios.delete(`${API}/priests/delegate/${priestId}`);
    dispatch(deleteDelegatedPriestSuccess(response.data));
  } catch (error) {
    dispatch(deleteDelegatedPriestFailure(error.message));
  }
};

//==============================================================================
// Fetch All Delegated Priests
//==============================================================================
export const fetchAllDelegatedPriests = () => async (dispatch) => {
  dispatch(fetchAllDelegatedPriestsStart());
  try {
    const response = await axios.get(`${API}/delegations/priests`, {
      withCredentials: true,
    });
    dispatch(fetchAllDelegatedPriestsSuccess(response.data.priests));
  } catch (error) {
    dispatch(fetchAllDelegatedPriestsFailure(error.response.data.message));
  }
};

//==============================================================================
// Fetch All Delegated Priests
//==============================================================================
export const fetchDelegatedPriests = () => async (dispatch) => {
  dispatch(fetchAllDelegatedPriestsStart());
  try {
    const response = await axios.get(`${API}/delegations/all/priests`, {
      withCredentials: true,
    });
    dispatch(fetchAllDelegatedPriestsSuccess(response.data.priests));
  } catch (error) {
    dispatch(fetchAllDelegatedPriestsFailure(error.response.data.message));
  }
};

//==============================================================================
// Clear Errors
//==============================================================================
export const clearErrorsAction = () => (dispatch) => {
  dispatch(clearErrors());
};
