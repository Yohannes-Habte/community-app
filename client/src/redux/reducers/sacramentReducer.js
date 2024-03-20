import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sacramentRequest: null,
  error: null,
  loading: false,

  sacraments: [],
  sacError: null,
  sacLoading: false,

  count: null,
  counError: null,
  counLoading: false,
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
      state.sacLoading = true;
    },
    sacramentsFetchSuccess: (state, action) => {
      state.sacraments = action.payload;
      state.sacLoading = false;
    },
    sacramentsFetchFailure: (state, action) => {
      state.sacError = action.payload;
      state.sacLoading = false;
    },

    // count all sacraments
    sacramentsCountStart: (state) => {
      state.counLoading = true;
    },
    sacramentsCountSuccess: (state, action) => {
      state.count = action.payload;
      state.counLoading = false;
    },
    sacramentsCountFailure: (state, action) => {
      state.counError = action.payload;
      state.counLoading = false;
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

  sacramentsCountStart,
  sacramentsCountSuccess,
  sacramentsCountFailure,
} = sacramentReducer.actions;

export default sacramentReducer.reducer;
