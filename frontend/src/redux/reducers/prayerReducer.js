import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prayerRequest: null,
  prayers: [],
  count: null,
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

    // Fetch all prayer requests
    prayersFetchStart: (state) => {
      state.loading = true;
    },
    prayersFetchSuccess: (state, action) => {
      state.prayers = action.payload;
      state.loading = false;
    },
    prayersFetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // count all prayers
    prayersCountStart: (state) => {
      state.loading = true;
    },
    prayersCountSuccess: (state, action) => {
      state.count = action.payload;
      state.loading = false;
    },
    prayersCountFailure: (state, action) => {
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

  prayersFetchStart,
  prayersFetchSuccess,
  prayersFetchFailure,

  prayersCountStart,
  prayersCountSuccess,
  prayersCountFailure,
} = prayerReducer.actions;

export default prayerReducer.reducer;
