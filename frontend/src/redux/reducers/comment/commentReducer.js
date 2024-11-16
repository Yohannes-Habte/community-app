import { createSlice } from "@reduxjs/toolkit";

// Initial state for the comment reducer
const initialState = {
  currentComment: null, 
  comments: [], 
  count: 0, 
  error: null, 
  loading: false, 
};

// Comment slice definition
const commentReducer = createSlice({
  name: "comment",
  initialState,
  reducers: {
    /** Create a new comment */
    createCommentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload); 
      state.error = null;
    },
    createCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /** Delete an existing comment by ID */
    deleteCommentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      ); // Remove the comment with the given ID
      state.error = null;
    },
    deleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /** Fetch a single comment by ID */
    fetchCommentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommentSuccess: (state, action) => {
      state.loading = false;
      state.currentComment = action.payload; 
      state.error = null;
    },
    fetchCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /** Fetch all comments */
    fetchCommentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload; 
      state.error = null;
    },
    fetchCommentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /** Count all comments */
    countCommentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    countCommentsSuccess: (state, action) => {
      state.loading = false;
      state.count = action.payload; 
      state.error = null;
    },
    countCommentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /** Clear errors from the state */
    clearCommentErrors: (state) => {
      state.error = null;
    },
  },
});

// Exporting all actions for usage in the application
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
} = commentReducer.actions;

// Exporting the reducer for integration with the store
export default commentReducer.reducer;
