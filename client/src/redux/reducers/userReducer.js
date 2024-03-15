import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  registerLoading: false,
  loginLoading: false,
  updateLoading: false,
  logoutLoading: false,
  deleteLoading: false,
  addressLoading: false,
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
      state.loading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    userUpdateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Logout user
    userLogoutStart: (state) => {
      state.loading = true;
    },
    userLogoutSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    userLogoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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
} = userReducer.actions;

// export userSlice
export default userReducer.reducer;
