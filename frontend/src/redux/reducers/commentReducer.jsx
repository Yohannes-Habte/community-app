import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: null,
  comments: [],
  error: null,
  loading: false,
};

// Destructure user reducer methods
const userReducer = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // Create comment
    commentPostStart: (state) => {
      state.loading = true;
    },
    commentPostSuccess: (state, action) => {
      state.comment = action.payload;
      state.loading = false;
    },
    commentPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete comment
    commentDeleteStart: (state) => {
      state.loading = true;
    },
    commentDeleteSuccess: (state, action) => {
      state.comment = action.payload;
      state.loading = false;
    },
    commentDeleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Get all comments
    commentsGetStart: (state) => {
      state.loading = true;
    },
    commentsGetSuccess: (state, action) => {
      state.comment = action.payload;
      state.loading = false;
    },
    commentsGetFailure: (state, action) => {
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
  commentPostStart,
  commentPostSuccess,
  commentPostFailure,

  commentDeleteStart,
  commentDeleteSuccess,
  commentDeleteFailure,

  commentsGetStart,
  commentsGetSuccess,
  commentsGetFailure,

  clearErrors,
} = userReducer.actions;

// export userSlice
export default userReducer.reducer;
