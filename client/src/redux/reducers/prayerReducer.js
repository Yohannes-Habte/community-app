import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prayerRequest: null,
  error: null,
  loading: false,
};

const prayerReducer = createSlice({
  name: 'prayer',
  initialState,
  reducers: {
    // Create prayer request
    prayerRequestStart: (state) => {
      state.loading = true;
    },
    prayerRequestSuccess: (state, action) => {
      state.prayerRequest = action.payload;
      state.loading = false;
    },
    prayerRequestFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  prayerRequestStart,
  prayerRequestSuccess,
  prayerRequestFailure,
} = prayerReducer.actions;

export default prayerReducer.reducer;
