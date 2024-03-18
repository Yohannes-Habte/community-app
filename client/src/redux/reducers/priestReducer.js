import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  delegatedPrist: null,
  error: null,
  loading: false,
};

const priestReducer = createSlice({
  name: 'priest',
  initialState,
  reducers: {
    // Delegated priest
    priestDeligateStart: (state) => {
      state.loading = true;
    },
    priestDeligateSuccess: (state, action) => {
      state.delegatedPrist = action.payload;
      state.loading = false;
      state.error = null;
    },

    priestDeligateFailure: (state, action) => {
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
  priestDeligateStart,
  priestDeligateSuccess,
  priestDeligateFailure,
} = priestReducer.actions;

export default priestReducer.reducer;
