import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  addressLoading: false,
  successMessage: null,
};

// Destructure user reducer methods
const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // User Login
    userLoginStart: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    userLoginFailure: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
      state.loading = false;
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
    userUpdateFilure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Destructure user reducer methods
export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFilure,
} = userReducer.actions;

// export userSlice
export default userReducer.reducer;
