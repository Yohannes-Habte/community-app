import axios from "axios";
import Cookies from "js-cookie";
import {
  changeUserPasswordFailure,
  changeUserPasswordRequest,
  changeUserPasswordSuccess,
  clearAllErrors,
  fetchParishionersCountFailure,
  fetchParishionersCountRequest,
  fetchParishionersCountSuccess,
  fetchParishionersFailure,
  fetchParishionersRequest,
  fetchParishionersSuccess,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  updateUserProfileFailure,
  updateUserProfileRequest,
  updateUserProfileSuccess,
} from "../../reducers/user/memberReducer";
import { API } from "../../../utile/security/secreteKey";
import { handleError } from "../../../utile/errorMessage/ErrorMessage";

//==============================================================================
// Action to register a new user
//==============================================================================
export const createAUser = (userData) => async (dispatch) => {
  try {
    // Start registration
    dispatch(registerUserRequest());

    const res = await axios.post(`${API}/auth/register`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": Cookies.get("csrfToken"),
      },
    });

    dispatch(registerUserSuccess(res.data.user));

    // Set secure token in cookies
    Cookies.set("token", res.data.token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
  } catch (error) {
    const { message } = handleError(error);
    dispatch(registerUserFailure(message));
  }
};

//==============================================================================
// Action to login a user
//==============================================================================
export const loginUser = (credentials) => async (dispatch) => {
  try {
    // Start login
    dispatch(loginUserRequest());

    const res = await axios.post(`${API}/auth/login`, credentials, {
      withCredentials: true,
    });

    dispatch(loginUserSuccess(res.data.user));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(loginUserFailure(message));
  }
};

//==============================================================================
// Action to update user profile
//==============================================================================
export const updateUserProfile = (updatedData) => async (dispatch) => {
  try {
    // Start updating user profile
    dispatch(updateUserProfileRequest());

    const res = await axios.put(`${API}/auth/update`, updatedData, {
      withCredentials: true,
    });

    dispatch(updateUserProfileSuccess(res.data.result));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(updateUserProfileFailure(message));
  }
};

//==============================================================================
// Action to change user password
//==============================================================================
export const changeUserPassword =
  (userId, passwordData) => async (dispatch) => {
    try {
      // Start password change
      dispatch(changeUserPasswordRequest());

      await axios.put(
        `${API}/members/${userId}/change-password`,
        passwordData,
        {
          withCredentials: true,
        }
      );

      dispatch(changeUserPasswordSuccess());
    } catch (error) {
      const { message } = handleError(error);
      dispatch(changeUserPasswordFailure(message));
    }
  };

//==============================================================================
// Action to logout a user
//==============================================================================
export const logoutUser = () => async (dispatch) => {
  try {
    // Start logout
    dispatch(logoutUserRequest());

    await axios.post(
      `${API}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(logoutUserSuccess());
  } catch (error) {
    const { message } = handleError(error);
    dispatch(logoutUserFailure(message));
  }
};

//==============================================================================
// Action to fetch parishioners list
//==============================================================================
export const fetchParishioners = () => async (dispatch) => {
  try {
    // Start fetching parishioners
    dispatch(fetchParishionersRequest());

    const res = await axios.get(`${API}/members/admin`, {
      withCredentials: true,
    });

    dispatch(fetchParishionersSuccess(res.data.users));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(fetchParishionersFailure(message));
  }
};

//==============================================================================
// Action to fetch parishioners list for finance manager
//==============================================================================
export const fetchAllParishionersForFinancialManager =
  () => async (dispatch) => {
    try {
      // Start fetching parishioners
      dispatch(fetchParishionersRequest());

      const res = await axios.get(`${API}/members/finance`, {
        withCredentials: true,
      });

      dispatch(fetchParishionersSuccess(res.data.users));
    } catch (error) {
      const { message } = handleError(error);
      dispatch(fetchParishionersFailure(message));
    }
  };

//==============================================================================
// Action to fetch parishioners count
//==============================================================================
export const fetchParishionersCount = () => async (dispatch) => {
  try {
    // Start fetching count
    dispatch(fetchParishionersCountRequest());

    const res = await axios.get(`${API}/members/count`, {
      withCredentials: true,
    });

    dispatch(fetchParishionersCountSuccess(res.data.count));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(fetchParishionersCountFailure(message));
  }
};

// Action to clear all errors in the state
export const clearAllMemberErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

//==============================================================================
// Fetch a Single User
//==============================================================================

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch(fetchUserRequest());
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No user found");
    }
    const res = await axios.get(`${API}/members/user`, {
      withCredentials: true,
    });

    dispatch(fetchUserSuccess(res.data.result));
  } catch (error) {
    const { message } = handleError(error);
    dispatch(fetchUserFailure(message));
  }
};
