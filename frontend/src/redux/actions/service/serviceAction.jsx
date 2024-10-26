import axios from "axios";
import {
  clearServiceErrors,
  deleteServiceFailure,
  deleteServiceStart,
  deleteServiceSuccess,
  fetchAllServicesFailure,
  fetchAllServicesStart,
  fetchAllServicesSuccess,
  fetchServiceFailure,
  fetchServiceStart,
  fetchServiceSuccess,
  postServiceRequestFailure,
  postServiceRequestStart,
  postServiceRequestSuccess,
  servicesCountFailure,
  servicesCountStart,
  servicesCountSuccess,
} from "../../reducers/service/serviceReducer";
import { API } from "../../../utile/security/secreteKey";

//==============================================================================
// Post Service Request
//==============================================================================
export const postServiceRequest = (requestData) => async (dispatch) => {
  dispatch(postServiceRequestStart());
  try {
    const response = await axios.post(`${API}/services`, requestData);
    dispatch(postServiceRequestSuccess(response.data));
  } catch (error) {
    dispatch(postServiceRequestFailure(error.message));
  }
};

//==============================================================================
// Fetch a Single Service
//==============================================================================
export const fetchService = (id) => async (dispatch) => {
  dispatch(fetchServiceStart());
  try {
    const response = await axios.get(`${API}/service/${id}`);
    dispatch(fetchServiceSuccess(response.data));
  } catch (error) {
    dispatch(fetchServiceFailure(error.message));
  }
};

//==============================================================================
// Delete a Single Service
//==============================================================================
export const deleteService = (id) => async (dispatch) => {
  dispatch(deleteServiceStart());
  try {
    await axios.delete(`${API}/service/${id}`);
    dispatch(deleteServiceSuccess(id));
  } catch (error) {
    dispatch(deleteServiceFailure(error.message));
  }
};

//==============================================================================
// Fetch All Services - Priest
//==============================================================================
export const fetchAllServices = () => async (dispatch) => {
  dispatch(fetchAllServicesStart());
  try {
    const response = await axios.get(`${API}/services/priest`, {
      withCredentials: true,
    });
    dispatch(fetchAllServicesSuccess(response.data.result));
  } catch (error) {
    let errorMessage = "An unexpected error occurred. Please try again later.";

    if (error.response) {
      // Server responded with a status outside the 2xx range
      errorMessage =
        error.response.data?.message ||
        `Error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // Request was made, but no response received
      errorMessage =
        "Unable to connect to the server. Please check your network connection.";
    } else {
      // Something else triggered an error
      errorMessage = error.message || errorMessage;
    }

    dispatch(fetchAllServicesFailure(errorMessage));
  }
};

//==============================================================================
// Fetch All Services - Priest
//==============================================================================
export const allServices = () => async (dispatch) => {
  dispatch(fetchAllServicesStart());
  try {
    const response = await axios.get(`${API}/services/admin`, {
      withCredentials: true,
    });
    dispatch(fetchAllServicesSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchAllServicesFailure(error.message));
  }
};

//==============================================================================
// Count All Services
//==============================================================================
export const countServices = () => async (dispatch) => {
  dispatch(servicesCountStart());
  try {
    const response = await axios.get(`${API}/services/count`);
    dispatch(servicesCountSuccess(response.data));
  } catch (error) {
    dispatch(servicesCountFailure(error.message));
  }
};

//==============================================================================
// Clear Errors
//==============================================================================
export const clearAllErrors = () => (dispatch) => {
  dispatch(clearServiceErrors());
};
