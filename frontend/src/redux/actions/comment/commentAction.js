import axios from "axios";
import {
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
} from "../../reducers/comment/commentReducer";
import { API } from "../../../utile/security/secreteKey";

/** Create a new comment */
export const createComment = (commentData) => async (dispatch) => {
  dispatch(createCommentRequest());
  try {
    const response = await axios.post(`${API}/comments/new`, commentData, {
      withCredentials: true,
    });
    dispatch(createCommentSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(createCommentFailure(errorMessage));
  }
};

/** Delete an existing comment */
export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(deleteCommentRequest());
  try {
    await axios.delete(`${API}/comments/${commentId}`, {
      withCredentials: true,
    });
    dispatch(deleteCommentSuccess(commentId));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(deleteCommentFailure(errorMessage));
  }
};

/** Fetch a single comment */
export const fetchComment = (commentId) => async (dispatch) => {
  dispatch(fetchCommentRequest());
  try {
    const response = await axios.get(`${API}/comments/${commentId}`, {
      withCredentials: true,
    });
    dispatch(fetchCommentSuccess(response.data.result));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(fetchCommentFailure(errorMessage));
  }
};

/** Fetch all comments */
export const fetchAllComments =
  (searchTerm = "") =>
  async (dispatch) => {
    dispatch(fetchCommentsRequest());
    try {
      const response = await axios.get(`${API}/comments`, {
        withCredentials: true,
        params: { search: searchTerm }, // Pass search term as query parameter
      });
      dispatch(fetchCommentsSuccess(response.data.result));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(fetchCommentsFailure(errorMessage));
    }
  };

/** Count all comments */
export const countComments = () => async (dispatch) => {
  dispatch(countCommentsRequest());
  try {
    const response = await axios.get(`${API}/comments/total/count`, {
      withCredentials: true,
    });
    dispatch(countCommentsSuccess(response.data.result));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(countCommentsFailure(errorMessage));
  }
};

//==============================================================================
// Clear Errors
//==============================================================================
export const clearContributionErrors = () => (dispatch) => {
  dispatch(clearCommentErrors());
};
