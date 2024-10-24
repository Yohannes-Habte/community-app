import axios from "axios";
import {
  eventPostStart,
  eventPostSuccess,
  eventPostFailure,
  fetchEventStart,
  fetchEventSuccess,
  fetchEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
  fetchAllEventsStart,
  fetchAllEventsSuccess,
  fetchAllEventsFailure,
  clearErrors,
} from "../../reducers/event/eventReducer";
import { API } from "../../../utile/security/secreteKey";

//==============================================================================
// Post an Event
//==============================================================================
export const postEvent = (eventData) => async (dispatch) => {
  dispatch(eventPostStart());
  try {
    const response = await axios.post(`${API}/events`, eventData);
    dispatch(eventPostSuccess(response.data));
  } catch (error) {
    dispatch(eventPostFailure(error.message));
  }
};

//==============================================================================
// Fetch a Single Event
//==============================================================================
export const fetchEvent = (id) => async (dispatch) => {
  dispatch(fetchEventStart());
  try {
    const response = await axios.get(`${API}/event/${id}`);
    dispatch(fetchEventSuccess(response.data));
  } catch (error) {
    dispatch(fetchEventFailure(error.message));
  }
};

//==============================================================================
// Delete a Single Event
//==============================================================================
export const deleteEvent = (id) => async (dispatch) => {
  dispatch(deleteEventStart());
  try {
    await axios.delete(`${API}/event/${id}`);
    dispatch(deleteEventSuccess(id));
  } catch (error) {
    dispatch(deleteEventFailure(error.message));
  }
};

//==============================================================================
// Fetch All Events
//==============================================================================
export const fetchAllEvents = () => async (dispatch) => {
  dispatch(fetchAllEventsStart());
  try {
    const response = await axios.get(`${API}/events/admin`, {
      withCredentials: true,
    });
    dispatch(fetchAllEventsSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchAllEventsFailure(error.message));
  }
};

//==============================================================================
// Fetch All Events
//==============================================================================
export const fetchEntireEvents = () => async (dispatch) => {
  dispatch(fetchAllEventsStart());
  try {
    const response = await axios.get(`${API}/events/priest`, {
      withCredentials: true,
    });

    dispatch(fetchAllEventsSuccess(response.data.result));
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message;
    dispatch(fetchAllEventsFailure(errorMessage));
  }
};

//==============================================================================
// Clear Errors
//==============================================================================
export const clearAllEventErrors = () => (dispatch) => {
  dispatch(clearErrors());
};
