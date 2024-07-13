import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  comment: null,
  comments: [],
  error: null,
  loading: false,
};

// Helper functions for reducing redundancy
const requestStart = (state) => {
  state.loading = true;
  state.error = null; // Clear any previous error on a new request start
};

const requestSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const requestFailure = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

// Comment slice
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // Post comment
    commentPostStart: requestStart,
    commentPostSuccess: (state, action) =>
      requestSuccess(state, action, "comment"),
    commentPostFailure: requestFailure,

    // Fetch single comment
    fetchCommentStart: requestStart,
    fetchCommentSuccess: (state, action) =>
      requestSuccess(state, action, "comment"),
    fetchCommentFailure: requestFailure,

    // Delete comment
    commentDeleteStart: requestStart,
    commentDeleteSuccess: (state, action) =>
      requestSuccess(state, action, "comment"),
    commentDeleteFailure: requestFailure,

    // Get all comments
    commentsGetStart: requestStart,
    commentsGetSuccess: (state, action) =>
      requestSuccess(state, action, "comments"),
    commentsGetFailure: requestFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  commentPostStart,
  commentPostSuccess,
  commentPostFailure,

  fetchCommentStart,
  fetchCommentSuccess,
  fetchCommentFailure,

  commentDeleteStart,
  commentDeleteSuccess,
  commentDeleteFailure,

  commentsGetStart,
  commentsGetSuccess,
  commentsGetFailure,

  clearErrors,
} = commentSlice.actions;

// Export reducer
export default commentSlice.reducer;
