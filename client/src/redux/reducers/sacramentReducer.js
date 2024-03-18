import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sacramentRequest: null,
  sacraments: [],
  error: null,
  loading: false,
};

const sacramentReducer = createSlice({
  name: 'sacrament',
  initialState,
  reducers: {
    // Create sacrament request
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

    // Fetch all sacraments
    sacramentsFetchStart: (state) => {
      state.loading = true;
    },
    sacramentsFetchSuccess: (state, action) => {
      state.sacraments = action.payload;
      state.loading = false;
    },
    sacramentsFetchFailure: (state, action) => {
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

  sacramentsFetchStart,
  sacramentsFetchSuccess,
  sacramentsFetchFailure,
} = sacramentReducer.actions;

export default sacramentReducer.reducer;
