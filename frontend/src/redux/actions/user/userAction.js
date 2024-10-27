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

//==============================================================================
// Action to register a new user
//==============================================================================
export const registerUser = (userData) => async (dispatch) => {
  try {
    // Start registration
    dispatch(registerUserRequest());

    const res = await axios.post(`${API}/auth/register`, userData);

    dispatch(registerUserSuccess(res.data.user));
  } catch (error) {
    dispatch(
      registerUserFailure(error.response?.data?.message || error.message)
    );
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
    dispatch(loginUserFailure(error.response?.data?.message || error.message));
  }
};

//==============================================================================
// Action to update user profile
//==============================================================================
export const updateUserProfile = (userId, updatedData) => async (dispatch) => {
  try {
    // Start updating user profile
    dispatch(updateUserProfileRequest());

    const res = await axios.put(`${API}/members/${userId}`, updatedData, {
      withCredentials: true,
    });

    dispatch(updateUserProfileSuccess(res.data.user));
  } catch (error) {
    dispatch(
      updateUserProfileFailure(error.response?.data?.message || error.message)
    );
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
      dispatch(
        changeUserPasswordFailure(
          error.response?.data?.message || error.message
        )
      );
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
    dispatch(logoutUserFailure(error.response?.data?.message || error.message));
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
    dispatch(
      fetchParishionersFailure(error.response?.data?.message || error.message)
    );
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
      dispatch(
        fetchParishionersFailure(error.response?.data?.message || error.message)
      );
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
    dispatch(
      fetchParishionersCountFailure(
        error.response?.data?.message || error.message
      )
    );
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
    dispatch(fetchUserFailure(error.message));
  }
};
