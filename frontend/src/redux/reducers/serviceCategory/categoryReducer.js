import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  categories: [],
  count: null,
  loading: false,
  error: null,
};

// Utility functions to handle common state transitions
const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Handle adding/updating a category
    categoryStart: setLoading,
    categorySuccess: (state, action) => {
      state.category = action.payload;
      state.loading = false;
    },
    categoryFailure: setError,

    // Handle deleting a category
    deleteCategoryStart: setLoading,
    deleteCategorySuccess: (state) => {
      state.category = null;
      state.loading = false;
    },
    deleteCategoryFailure: setError,

    // Handle fetching all categories
    fetchAllCategoriesStart: setLoading,
    fetchAllCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchAllCategoriesFailure: setError,

    // Handle counting categories
    countCategoriesStart: setLoading,
    countCategoriesSuccess: (state, action) => {
      state.count = action.payload;
      state.loading = false;
    },
    countCategoriesFailure: setError,

    // Clear any errors in the state
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions for use in components
export const {
  categoryStart,
  categorySuccess,
  categoryFailure,

  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,

  fetchAllCategoriesStart,
  fetchAllCategoriesSuccess,
  fetchAllCategoriesFailure,

  countCategoriesStart,
  countCategoriesSuccess,
  countCategoriesFailure,

  clearErrors,
} = categorySlice.actions;

// Export the reducer to be used in the store
export default categorySlice.reducer;
