import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  registerLoading: false,
  loginLoading: false,
  updateLoading: false,
  logoutLoading: false,
  changePasswordLoading: false,
  addressLoading: false,
  deleteLoading: false,
};

// Destructure user reducer methods
const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sign Up User
    userRegisterStart: (state) => {
      state.registerLoading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.registerLoading = false;
    },
    userRegisterFailure: (state, action) => {
      state.error = action.payload;
      state.registerLoading = false;
    },

    // User Login
    userLoginStart: (state) => {
      state.loginLoading = true;
    },
    userLoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loginLoading = false;
      state.error = null;
    },
    userLoginFailure: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
      state.loginLoading = false;
    },

    // Update user profile
    userUpdateStart: (state) => {
      state.updateLoading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.updateLoading = false;
      state.error = null;
    },
    userUpdateFailure: (state, action) => {
      state.error = action.payload;
      state.updateLoading = false;
    },

    // Logout user
    userLogoutStart: (state) => {
      state.logoutLoading = true;
    },
    userLogoutSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.logoutLoading = false;
      state.error = null;
    },
    userLogoutFailure: (state, action) => {
      state.error = action.payload;
      state.logoutLoading = false;
    },

    userChangePasswordStart: (state) => {
      state.changePasswordLoading = true;
    },
    userChangePasswordSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.changePasswordLoading = false;
    },
    userChangePasswordFailure: (state, action) => {
      state.error = action.payload;
      state.changePasswordLoading = false;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Destructure user reducer methods
export const {
  userRegisterStart,
  userRegisterSuccess,
  userRegisterFailure,

  userLoginStart,
  userLoginSuccess,
  userLoginFailure,

  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,

  userLogoutStart,
  userLogoutSuccess,
  userLogoutFailure,

  userChangePasswordStart,
  userChangePasswordSuccess,
  userChangePasswordFailure,
} = userReducer.actions;

// export userSlice
export default userReducer.reducer;
