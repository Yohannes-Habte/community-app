import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  parishioners: [],
  count: null,
  loading: false,
  error: null,
};

// Helper functions
const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};

const setSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const setFailure = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const userReducer = createSlice({
  name: "member",
  initialState,
  reducers: {
    // Register a new user
    registerUserRequest: (state) => setLoading(state),
    registerUserSuccess: (state, action) =>
      setSuccess(state, action, "currentUser"),
    registerUserFailure: (state, action) => setFailure(state, action),

    // Login a user
    loginUserRequest: (state) => setLoading(state),
    loginUserSuccess: (state, action) =>
      setSuccess(state, action, "currentUser"),
    loginUserFailure: (state, action) => setFailure(state, action),

    // Fetch single user
    fetchUserRequest: (state) => setLoading(state),
    fetchUserSuccess: (state, action) =>
      setSuccess(state, action, "currentUser"),
    fetchUserFailure: (state, action) => setFailure(state, action),

    // Update user profile
    updateUserProfileRequest: (state) => setLoading(state),
    updateUserProfileSuccess: (state, action) =>
      setSuccess(state, action, "currentUser"),
    updateUserProfileFailure: (state, action) => setFailure(state, action),

    // Logout a user
    logoutUserRequest: (state) => setLoading(state),
    logoutUserSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
    logoutUserFailure: (state, action) => setFailure(state, action),

    // Fetch parishioners list
    fetchParishionersRequest: (state) => setLoading(state),
    fetchParishionersSuccess: (state, action) =>
      setSuccess(state, action, "parishioners"),
    fetchParishionersFailure: (state, action) => setFailure(state, action),

    // Fetch parishioners count
    fetchParishionersCountRequest: (state) => setLoading(state),
    fetchParishionersCountSuccess: (state, action) =>
      setSuccess(state, action, "count"),
    fetchParishionersCountFailure: (state, action) => setFailure(state, action),

    // Change user password
    changeUserPasswordRequest: (state) => setLoading(state),
    changeUserPasswordSuccess: (state) => {
      state.loading = false;
    },
    changeUserPasswordFailure: (state, action) => setFailure(state, action),

    // Address-related actions
    postUserAddressStart: setLoading,
    postUserAddressSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    postUserAddressFailure: setFailure,

    // Delete user address actions
    deleteUserAddressStart: setLoading,
    deleteUserAddressSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    deleteUserAddressFailure: setFailure,

    // Clear all errors
    clearAllErrors: (state) => {
      state.error = null;
      state.loading = false;
    },

    // Clear specific error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,

  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,

  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,

  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailure,

  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,

  fetchParishionersRequest,
  fetchParishionersSuccess,
  fetchParishionersFailure,

  fetchParishionersCountRequest,
  fetchParishionersCountSuccess,
  fetchParishionersCountFailure,

  changeUserPasswordRequest,
  changeUserPasswordSuccess,
  changeUserPasswordFailure,

  postUserAddressStart,
  postUserAddressSuccess,
  postUserAddressFailure,

  deleteUserAddressStart,
  deleteUserAddressSuccess,
  deleteUserAddressFailure,

  clearAllErrors,
  clearError,
} = userReducer.actions;

export default userReducer.reducer;
