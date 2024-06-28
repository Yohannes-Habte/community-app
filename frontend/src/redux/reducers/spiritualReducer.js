import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spiritualRequest: null,
  spirituals: [],
  count: null,
  error: null,
  loading: false,
};

const sacramentReducer = createSlice({
  name: 'spiritual',
  initialState,
  reducers: {
    // Create prayer request
    spiritualRequestStart: (state) => {
      state.loading = true;
    },
    spiritualRequestSuccess: (state, action) => {
      state.spiritualRequest = action.payload;
      state.loading = false;
    },
    spiritualRequestFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Fetch all Spritual Developments
    spiritualsFetchStart: (state) => {
      state.loading = true;
    },
    spiritualsFetchSuccess: (state, action) => {
      state.spirituals = action.payload;
      state.loading = false;
    },
    spiritualsFetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // count all Spiritual development
    spiritualsCountStart: (state) => {
      state.loading = true;
    },
    spiritualsCountSuccess: (state, action) => {
      state.count = action.payload;
      state.loading = false;
    },
    spiritualsCountFailure: (state, action) => {
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
  spiritualRequestStart,
  spiritualRequestSuccess,
  spiritualRequestFailure,

  spiritualsFetchStart,
  spiritualsFetchSuccess,
  spiritualsFetchFailure,

  spiritualsCountStart,
  spiritualsCountSuccess,
  spiritualsCountFailure
  
} = sacramentReducer.actions;

export default sacramentReducer.reducer;
