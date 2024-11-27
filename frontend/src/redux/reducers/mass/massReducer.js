import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMass: null,
  masses: [],
  error: null,
  loading: false,
};

// Helper functions for reducing redundancy
const requestStart = (state) => {
  state.loading = true;
  state.error = null; // Reset error state
};

const requestSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const requestFailure = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const massReducer = createSlice({
  name: "mass",
  initialState,
  reducers: {
    // Post a mass
    massPostStart: requestStart,
    massPostSuccess: (state, action) =>
      requestSuccess(state, action, "currentMass"),
    massPostFailure: requestFailure,

    // Fetch a single mass
    fetchMassStart: requestStart,
    fetchMassSuccess: (state, action) =>
      requestSuccess(state, action, "currentMass"),
    fetchMassFailure: requestFailure,

    // Update a mass
    updateMassStart: requestStart,
    updateMassSuccess: (state, action) =>
      requestSuccess(state, action, "currentMass"),
    updateMassFailure: requestFailure,

    // Delete a single mass
    deleteMassStart: requestStart,
    deleteMassSuccess: (state, action) =>
      requestSuccess(state, action, "currentMass"),
    deleteMassFailure: requestFailure,

    // Delete masses for a single year
    deleteMassesForYearStart: requestStart,
    deleteMassesForYearSuccess: (state, action) =>
      requestSuccess(state, action, "masses"), 
    deleteMassesForYearFailure: requestFailure,

    // Fetch all masses
    fetchAllMassesStart: requestStart,
    fetchAllMassesSuccess: (state, action) =>
      requestSuccess(state, action, "masses"),
    fetchAllMassesFailure: requestFailure,

    // Clear errors
    clearMassErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  massPostStart,
  massPostSuccess,
  massPostFailure,

  fetchMassStart,
  fetchMassSuccess,
  fetchMassFailure,

  updateMassStart,
  updateMassSuccess,
  updateMassFailure,

  deleteMassStart,
  deleteMassSuccess,
  deleteMassFailure,

  deleteMassesForYearStart,  
  deleteMassesForYearSuccess,
  deleteMassesForYearFailure,

  fetchAllMassesStart,
  fetchAllMassesSuccess,
  fetchAllMassesFailure,

  clearMassErrors,
} = massReducer.actions;

export default massReducer.reducer;
