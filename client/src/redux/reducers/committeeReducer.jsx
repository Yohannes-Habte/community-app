import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCommittee: null,
  error: null,
  loading: false,
};

const committeeReducer = createSlice({
  name: 'committee',
  initialState,
  reducers: {
    // Post a committee members
    committeePostStart: (state) => {
      state.loading = true;
    },
    committeePostSuccess: (state, action) => {
      state.currentCommittee = action.payload;
      state.loading = false;
    },
    committeePostFailure: (state, action) => {
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
  committeePostStart,
  committeePostSuccess,
  committeePostFailure,

  clearErrors,
} = committeeReducer.actions;

export default committeeReducer.reducer;
