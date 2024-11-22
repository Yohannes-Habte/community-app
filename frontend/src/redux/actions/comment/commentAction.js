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
    dispatch(createCommentSuccess(response.data.comment));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again later.";

        if (error.response.status === 400) {
          dispatch(
            createCommentFailure(
              "Invalid input data. Please check and try again."
            )
          );
        } else if (error.response.status === 401) {
          dispatch(createCommentFailure("Unauthorized access! Please log in."));
        } else if (error.response.status === 500) {
          dispatch(
            createCommentFailure("Server error. Please try again later.")
          );
        } else {
          dispatch(createCommentFailure(errorMessage));
        }
      } else {
        dispatch(
          createCommentFailure("Network error. Please check your connection.")
        );
      }
    } else {
      dispatch(
        createCommentFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};
/** Delete a comment */
export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(deleteCommentRequest());
  try {
    await axios.delete(`${API}/comments/${commentId}`, {
      withCredentials: true,
    });
    dispatch(deleteCommentSuccess(commentId));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Backend response:", error.response);
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again later.";

        if (error.response.status === 401) {
          dispatch(deleteCommentFailure("Unauthorized access! Please log in."));
        } else if (error.response.status === 404) {
          dispatch(
            deleteCommentFailure(
              "Comment not found. It might have already been deleted."
            )
          );
        } else if (error.response.status === 500) {
          dispatch(
            deleteCommentFailure("Server error. Please try again later.")
          );
        } else {
          dispatch(deleteCommentFailure(errorMessage));
        }
      } else {
        dispatch(
          deleteCommentFailure("Network error. Please check your connection.")
        );
      }
    } else {
      dispatch(
        deleteCommentFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};

/** Fetch a single comment by ID */
export const fetchComment = (commentId) => async (dispatch) => {
  dispatch(fetchCommentRequest());
  try {
    const response = await axios.get(`${API}/comments/${commentId}`, {
      withCredentials: true,
    });
    dispatch(fetchCommentSuccess(response.data.comment));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Backend response:", error.response);
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again later.";

        if (error.response.status === 404) {
          dispatch(fetchCommentFailure("Comment not found."));
        } else if (error.response.status === 401) {
          dispatch(fetchCommentFailure("Unauthorized access! Please log in."));
        } else if (error.response.status === 500) {
          dispatch(
            fetchCommentFailure("Server error. Please try again later.")
          );
        } else {
          dispatch(fetchCommentFailure(errorMessage));
        }
      } else {
        dispatch(
          fetchCommentFailure("Network error. Please check your connection.")
        );
      }
    } else {
      dispatch(
        fetchCommentFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
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
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage =
            error.response?.data?.message ||
            "Something went wrong. Please try again later.";

          if (error.response.status === 404) {
            dispatch(fetchCommentFailure("Comments not found."));
          } else if (error.response.status === 401) {
            dispatch(
              fetchCommentsFailure("Unauthorized access! Please log in.")
            );
          } else if (error.response.status === 500) {
            dispatch(
              fetchCommentsFailure("Server error. Please try again later.")
            );
          } else {
            dispatch(fetchCommentsFailure(errorMessage));
          }
        } else {
          dispatch(
            fetchCommentsFailure("Network error. Please check your connection.")
          );
        }
      } else {
        dispatch(
          fetchCommentsFailure(
            "An unexpected error occurred. Please try again later."
          )
        );
      }
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
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again later.";

        if (error.response.status === 401) {
          dispatch(countCommentsFailure("Unauthorized access! Please log in."));
        } else if (error.response.status === 500) {
          dispatch(
            countCommentsFailure("Server error. Please try again later.")
          );
        } else {
          dispatch(countCommentsFailure(errorMessage));
        }
      } else {
        dispatch(
          countCommentsFailure("Network error. Please check your connection.")
        );
      }
    } else {
      dispatch(
        countCommentsFailure(
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};

//==============================================================================
// Clear Errors
//==============================================================================
export const clearContributionErrors = () => (dispatch) => {
  dispatch(clearCommentErrors());
};
