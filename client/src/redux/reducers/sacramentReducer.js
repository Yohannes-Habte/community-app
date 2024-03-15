import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sacramentRequest: null,
  error: null,
  loading: false,
};

const sacramentReducer = createSlice({
  name: 'sacrament',
  initialState,
  reducers: {
    // Create prayer request
    sacramentRequestStart: (state) => {
      state.loading = true;
    },
    sacramentRequestSuccess: (state, action) => {
      state.sacramentRequest = action.payload;
      state.loading = false;
    },
    sacramentRequestFailure: (state, action) => {
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
  sacramentRequestStart,
  sacramentRequestSuccess,
  sacramentRequestFailure,
} = sacramentReducer.actions;

export default sacramentReducer.reducer;
