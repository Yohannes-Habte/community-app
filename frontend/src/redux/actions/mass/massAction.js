import axios from "axios";
import {
  massPostStart,
  massPostSuccess,
  massPostFailure,
  fetchMassStart,
  fetchMassSuccess,
  fetchMassFailure,
  updateMassStart,
  updateMassSuccess,
  updateMassFailure,
  deleteMassStart,
  deleteMassSuccess,
  deleteMassFailure,
  deleteMassesForYearStart,
  deleteMassesForYearSuccess,
  deleteMassesForYearFailure,
  fetchAllMassesStart,
  fetchAllMassesSuccess,
  fetchAllMassesFailure,
  clearMassErrors,
} from "../../reducers/mass/massReducer";

import { handleError } from "../../../utile/errorMessage/ErrorMessage";
import { API } from "../../../utile/security/secreteKey";
import { toast } from "react-toastify";

//==============================================================================
// Action to post a new mass
//==============================================================================
export const postMass = (massData) => async (dispatch) => {
  try {
    dispatch(massPostStart());

    const res = await axios.post(`${API}/masses/new`, massData, {
      withCredentials: true,
    });
    const feedback = res.data.message;

    dispatch(massPostSuccess(feedback));
    toast.success(feedback);
  } catch (error) {
    const { message } = handleError(error);
    dispatch(massPostFailure(message));
  }
};

//==============================================================================
// Action to fetch a single mass by ID
//==============================================================================
export const fetchMass = (id) => async (dispatch) => {
  try {
    dispatch(fetchMassStart());

    const res = await axios.get(`${API}/masses/${id}`, {
      withCredentials: true,
    });

    dispatch(fetchMassSuccess(res.data.result));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(fetchMassFailure(message));
  }
};

//==============================================================================
// Action to update an existing mass by ID
//==============================================================================
export const updateMass = (id, updatedData) => async (dispatch) => {
  try {
    dispatch(updateMassStart());

    const res = await axios.put(`${API}/masses/${id}`, updatedData, {
      withCredentials: true,
    });

    dispatch(updateMassSuccess(res.data));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(updateMassFailure(message));
  }
};

//==============================================================================
// Action to delete a single mass by ID
//==============================================================================
export const deleteMass = (id) => async (dispatch) => {
  try {
    dispatch(deleteMassStart());

    await axios.delete(`${API}/masses/${id}`, {
      withCredentials: true,
    });

    dispatch(deleteMassSuccess(id));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(deleteMassFailure(message));
  }
};

//==============================================================================
// Action to delete masses for a specific year
//==============================================================================
export const deleteMassesForYear = (year) => async (dispatch) => {
  try {
    dispatch(deleteMassesForYearStart());

    const res = await axios.delete(`${API}/masses/year/${year}`, {
      withCredentials: true,
    });

    dispatch(deleteMassesForYearSuccess(res.data));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(deleteMassesForYearFailure(message));
  }
};

//==============================================================================
// Action to fetch all masses
//==============================================================================
export const fetchAllMasses = () => async (dispatch) => {
  try {
    dispatch(fetchAllMassesStart());

    const res = await axios.get(`${API}/masses`);

    dispatch(fetchAllMassesSuccess(res.data.result));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(fetchAllMassesFailure(message));
  }
};

//==============================================================================
// Action to clear errors
//==============================================================================
export const clearMassErrorsAction = () => (dispatch) => {
  dispatch(clearMassErrors());
};
