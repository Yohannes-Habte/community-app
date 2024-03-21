import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contribution: null,
  error: null,
  loading: false,
};

const contributionReducer = createSlice({
  name: 'contributions',
  initialState,
  reducers: {
    // Post a contribution
    constributionStart: (state) => {
      state.loading = true;
    },
    constributionSuccess: (state, action) => {
      state.contribution = action.payload;
      state.loading = false;
    },
    constributionFailure: (state, action) => {
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
  constributionStart,
  constributionSuccess,
  constributionFailure,

  clearErrors,
} = contributionReducer.actions;

export default contributionReducer.reducer;
