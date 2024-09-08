import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import Cookies from "js-cookie";
import {
  fetchSingleUserStart,
  fetchSingleUserSuccess,
  fetchSingleUserFailure,
  clearErrors,
} from "../../reducers/userReducer";
import {
  requestFailure,
  requestStart,
  requestSuccess,
} from "../../reducers/user/memberReducer";

//==============================================================================
// Action to handle logging in a user
//==============================================================================
export const loginUser = (credentials) => async (dispatch) => {
  try {
    // Start the login request, set loading to true and clear previous errors
    dispatch(requestStart("login"));

    // Make the API call using axios
    const response = await axios.post("/api/login", credentials);

    // On success, update the state with the current user data
    dispatch(requestSuccess("login", "currentUser", response.data));
  } catch (error) {
    // On failure, update the error state with the error message
    dispatch(
      requestFailure("login", error.response?.data?.message || error.message)
    );
  }
};

//==============================================================================
// Action to handle user registration
//==============================================================================
export const registerUser = (registrationData) => async (dispatch) => {
  try {
    // Start the registration request
    dispatch(requestStart("register"));

    // Make the API call using axios
    const response = await axios.post("/api/register", registrationData);

    // On success, store the registered user data in the state
    dispatch(requestSuccess("register", "currentUser", response.data));
  } catch (error) {
    // On failure, store the error message in the state
    dispatch(
      requestFailure("register", error.response?.data?.message || error.message)
    );
  }
};

//==============================================================================
// Action to handle updating user details
//==============================================================================
export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    // Start the update request
    dispatch(requestStart("update"));

    // Make the API call using axios
    const response = await axios.put(`/api/users/${userId}`, userData);

    // On success, update the current user state
    dispatch(requestSuccess("update", "currentUser", response.data));
  } catch (error) {
    // On failure, store the error message
    dispatch(
      requestFailure("update", error.response?.data?.message || error.message)
    );
  }
};

//==============================================================================
// Action to handle logging out a user
//==============================================================================
export const logoutUser = () => async (dispatch) => {
  try {
    // Start the logout request
    dispatch(requestStart("logout"));

    // Make the API call using axios
    await axios.post("/api/logout");

    // On success, clear the current user from the state
    dispatch(requestSuccess("logout", "currentUser", null));
  } catch (error) {
    // On failure, store the error message
    dispatch(
      requestFailure("logout", error.response?.data?.message || error.message)
    );
  }
};

//==============================================================================
// Action to fetch parishioners list
//==============================================================================
export const fetchParishioners = () => async (dispatch) => {
  try {
    // Start fetching parishioners
    dispatch(requestStart("members"));

    const res = await axios.get(`${API}/members/all`, {
      withCredentials: true,
    });

    dispatch(requestSuccess("members", "parishioners", res.data.users));
  } catch (error) {
    dispatch(
      requestFailure("members", error.response?.data?.message || error.message)
    );
  }
};

//==============================================================================
// Action to get the count of parishioners
//==============================================================================
export const fetchParishionersCount = () => async (dispatch) => {
  try {
    // Start fetching the count
    dispatch(requestStart("count"));

    // Make the API call using axios
    const response = await axios.get("/api/parishioners/count");

    // On success, update the count in the state
    dispatch(requestSuccess("count", "count", response.data));
  } catch (error) {
    // On failure, store the error message
    dispatch(
      requestFailure("count", error.response?.data?.message || error.message)
    );
  }
};

//==============================================================================
// Action to change a user's password
//==============================================================================

export const changeUserPassword =
  (userId, passwordData) => async (dispatch) => {
    try {
      // Start changing the password
      dispatch(requestStart("changePassword"));

      // Make the API call using axios
      const response = await axios.post(
        `/api/users/${userId}/change-password`,
        passwordData
      );

      // On success, no need to update state with specific data
      dispatch(requestSuccess(response.data));
    } catch (error) {
      // On failure, store the error message
      dispatch(
        requestFailure(
          "changePassword",
          error.response?.data?.message || error.message
        )
      );
    }
  };

// Action to clear all errors in the state
export const clearAllErrors = () => (dispatch) => {
  dispatch(clearErrors());
};

//==============================================================================
// Fetch a Single User
//==============================================================================

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchSingleUserStart());

  try {
    // console.log('All cookies:', Cookies.get());
    const token = Cookies.get("token");

    if (!token) {
      // console.warn("No token found in cookies, redirecting to login.");
      throw new Error("No user found");
    }

    const res = await axios.get(`${API}/members/user`, {
      withCredentials: true,
    });
    // console.log("user data = ", res);
    dispatch(fetchSingleUserSuccess(res.data.result));
  } catch (error) {
    // console.error("Fetch User Error:", error);
    dispatch(fetchSingleUserFailure(error.message));
  }
};
