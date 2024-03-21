import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  delegatedPrist: null,
  error: null,
  loading: false,

  delegations: [],
  delegationLoading: false,
  delegationError: null
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

     // Get All Delegated priests
     allDelegatedPriestsStart: (state) => {
      state.delegationLoading = true;
    },

    allDelegatedPriestsSuccess: (state, action) => {
      state.delegations = action.payload;
      state.delegationLoading = false;
    },

    allDelegatedPriestsFailure: (state, action) => {
      state.delegationError = action.payload;
      state.delegationLoading = false;
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

  allDelegatedPriestsStart,
  allDelegatedPriestsSuccess,
  allDelegatedPriestsFailure
} = priestReducer.actions;

export default priestReducer.reducer;
