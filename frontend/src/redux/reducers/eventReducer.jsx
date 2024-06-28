import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEvent: null,
  error: null,
  loading: false,
};

const eventReducer = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // Post an event
    eventPostStart: (state) => {
      state.loading = true;
    },
    eventPostSuccess: (state, action) => {
      state.currentEvent = action.payload;
      state.loading = false;
    },
    eventPostFailure: (state, action) => {
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
  eventPostStart,
  eventPostSuccess,
  eventPostFailure,

  clearErrors,
} = eventReducer.actions;

export default eventReducer.reducer;
