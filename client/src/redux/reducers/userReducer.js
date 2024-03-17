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
  deleteAddressLoading: false,
  
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

    // User Addresses
    userAddressStart: (state) => {
      state.addressLoading = true;
    },
    userAddressSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.addressLoading = false;
    },
    userAddressFailure: (state, action) => {
      state.error = action.payload;
      state.addressLoading = false;
    },

    // Delete User Addresses
    userAddressDeleteStart: (state) => {
      state.deleteAddressLoading = true;
    },
    userAddressDeleteSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.deleteAddressLoading = false;
    },
    userAddressDeleteFailure: (state, action) => {
      state.error = action.payload;
      state.deleteAddressLoading = false;
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

  userAddressStart,
  userAddressSuccess,
  userAddressFailure,

  userAddressDeleteStart,
  userAddressDeleteSuccess,
  userAddressDeleteFailure,
} = userReducer.actions;

// export userSlice
export default userReducer.reducer;
