import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  parishioners: [],
  count: null,

  // Loading states
  loading: {
    register: false,
    login: false,
    getUser: false,
    update: false,
    logout: false,
    changePassword: false,
    address: false,
    deleteAddress: false,
    members: false,
    count: false,
  },

  // Error states
  error: {
    register: null,
    login: null,
    getUser: null,
    update: null,
    logout: null,
    changePassword: null,
    address: null,
    deleteAddress: null,
    members: null,
    count: null,
  },
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Sign Up User
    postUserRegisterStart: (state) => {
      state.loading.register = true;
      state.error.register = null;
    },
    postUserRegisterSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.register = false;
    },
    postUserRegisterFailure: (state, action) => {
      state.error.register = action.payload;
      state.loading.register = false;
    },

    // Login User
    postUserLoginStart: (state) => {
      state.loading.login = true;
      state.error.login = null;
    },
    postUserLoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.login = false;
      state.error.login = null;
    },
    postUserLoginFailure: (state, action) => {
      state.error.login = action.payload;
      state.currentUser = null;
      state.loading.login = false;
    },

    // Fetch single User Data
    fetchSingleUserStart: (state) => {
      state.loading.getUser = true;
      state.error.getUser = null;
    },
    fetchSingleUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.getUser = false;
    },
    fetchSingleUserFailure: (state, action) => {
      state.error.getUser = action.payload;
      state.currentUser = null;
      state.loading.getUser = false; // Corrected here
    },

    // Update user profile
    updateUserStart: (state) => {
      state.loading.update = true;
      state.error.update = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.update = false;
    },
    updateUserFailure: (state, action) => {
      state.error.update = action.payload;
      state.loading.update = false;
    },

    // Logout user
    logoutUserStart: (state) => {
      state.loading.logout = true;
      state.error.logout = null;
    },
    logoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading.logout = false;
      state.error.logout = null;
    },
    logoutUserFailure: (state, action) => {
      state.error.logout = action.payload;
      state.loading.logout = false;
    },

    // Delete user profile
    deleteUserStart: (state) => {
      state.loading.update = true;
      state.error.update = null;
    },
    deleteUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.update = false;
    },
    deleteUserFailure: (state, action) => {
      state.error.update = action.payload;
      state.loading.update = false;
    },

    // Change Password
    postUserChangePasswordStart: (state) => {
      state.loading.changePassword = true;
      state.error.changePassword = null;
    },
    postUserChangePasswordSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.changePassword = false;
    },
    postUserChangePasswordFailure: (state, action) => {
      state.error.changePassword = action.payload;
      state.loading.changePassword = false;
    },

    // User Addresses
    postUserAddressStart: (state) => {
      state.loading.address = true;
      state.error.address = null;
    },
    postUserAddressSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.address = false;
    },
    postUserAddressFailure: (state, action) => {
      state.error.address = action.payload;
      state.loading.address = false;
    },

    // Delete User Addresses
    deleteUserAddressStart: (state) => {
      state.loading.deleteAddress = true;
      state.error.deleteAddress = null;
    },
    deleteUserAddressSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading.deleteAddress = false;
    },
    deleteUserAddressFailure: (state, action) => {
      state.error.deleteAddress = action.payload;
      state.loading.deleteAddress = false;
    },

    // Get all members
    fetchAllUsersStart: (state) => {
      state.loading.members = true;
      state.error.members = null;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.parishioners = action.payload;
      state.loading.members = false;
    },
    fetchAllUsersFailure: (state, action) => {
      state.error.members = action.payload;
      state.loading.members = false;
    },

    // Count all users
    countUsersStart: (state) => {
      state.loading.count = true;
      state.error.count = null;
    },
    countUsersSuccess: (state, action) => {
      state.count = action.payload;
      state.loading.count = false;
    },
    countUsersFailure: (state, action) => {
      state.error.count = action.payload;
      state.loading.count = false;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = {
        register: null,
        login: null,
        update: null,
        logout: null,
        changePassword: null,
        address: null,
        deleteAddress: null,
        members: null,
        count: null,
      };
    },
  },
});

export const {
  postUserRegisterStart,
  postUserRegisterSuccess,
  postUserRegisterFailure,

  postUserLoginStart,
  postUserLoginSuccess,
  postUserLoginFailure,

  fetchSingleUserStart,
  fetchSingleUserSuccess,
  fetchSingleUserFailure,

  updateUserStart,
  updateUserSuccess,
  updateUserFailure,

  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,

  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,

  postUserChangePasswordStart,
  postUserChangePasswordSuccess,
  postUserChangePasswordFailure,

  postUserAddressStart,
  postUserAddressSuccess,
  postUserAddressFailure,

  deleteUserAddressStart,
  deleteUserAddressSuccess,
  deleteUserAddressFailure,

  fetchAllUsersStart,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,

  countUsersStart,
  countUsersSuccess,
  countUsersFailure,

  clearErrors,
} = userReducer.actions;

export default userReducer.reducer;
