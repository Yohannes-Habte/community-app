import { createSlice } from "@reduxjs/toolkit";

// Initial state for the comment management
const initialState = {
  currentComment: null,
  comments: [],
  count: 0,
  error: null,
  loading: false,
};

// Helper functions for state transitions
const requestStart = (state) => {
  state.loading = true;
  state.error = null;
};

const requestSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

// Define the slice
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // Handle creating a comment
    createCommentRequest: requestStart,
    createCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
      state.error = null;
    },
    createCommentFailure: setError,

    // Handle deleting a comment
    deleteCommentRequest: requestStart,
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    deleteCommentFailure: setError,

    // Handle fetching a single comment
    fetchCommentRequest: requestStart,
    fetchCommentSuccess: (state, action) =>
      requestSuccess(state, action, "currentComment"),
    fetchCommentFailure: setError,

    // Handle fetching all comments
    fetchCommentsRequest: requestStart,
    fetchCommentsSuccess: (state, action) =>
      requestSuccess(state, action, "comments"),
    fetchCommentsFailure: setError,

    // Handle counting comments
    countCommentsRequest: requestStart,
    countCommentsSuccess: (state, action) =>
      requestSuccess(state, action, "count"),
    countCommentsFailure: setError,

    // Clear error state
    clearCommentErrors: (state) => {
      state.error = null;
    },

    // Clear loading state
    clearCommentLoading: (state) => {
      state.loading = false;
    },
  },
});

// Export actions
export const {
  createCommentRequest,
  createCommentSuccess,
  createCommentFailure,

  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,

  fetchCommentRequest,
  fetchCommentSuccess,
  fetchCommentFailure,

  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,

  countCommentsRequest,
  countCommentsSuccess,
  countCommentsFailure,

  clearCommentErrors,
  clearCommentLoading,
} = commentSlice.actions;

// Export the reducer
export default commentSlice.reducer;
