import axios from "axios";


import {
  postCommitteeStart,
  postCommitteeSuccess,
  postCommitteeFailure,
  fetchSingleCommitteeStart,
  fetchSingleCommitteeSuccess,
  fetchSingleCommitteeFailure,
  updateCommitteeStart,
  updateCommitteeSuccess,
  updateCommitteeFailure,
  fetchCommitteeBatchStart,
  fetchCommitteeBatchSuccess,
  fetchCommitteeBatchFailure,
  fetchAllCommitteesStart,
  fetchAllCommitteesSuccess,
  fetchAllCommitteesFailure,
  deleteCommitteeStart,
  deleteCommitteeSuccess,
  deleteCommitteeFailure,
} from "../../reducers/committee/committeeReducer";
import { API } from "../../../utile/security/secreteKey";

//==============================================================================
// Post New Committee
//==============================================================================
export const postCommittee = (committeeData) => async (dispatch) => {
  dispatch(postCommitteeStart());
  try {
    const response = await axios.post(`${API}/committees`, committeeData, {
      withCredentials: true, // For authentication, if necessary
    });
    dispatch(postCommitteeSuccess(response.data));
  } catch (error) {
    dispatch(postCommitteeFailure(error.message));
  }
};

//==============================================================================
// Fetch Single Committee Member
//==============================================================================
export const fetchSingleCommittee = (committeeId) => async (dispatch) => {
  dispatch(fetchSingleCommitteeStart());
  try {
    const response = await axios.get(`${API}/committees/${committeeId}`, {
      withCredentials: true,
    });
    dispatch(fetchSingleCommitteeSuccess(response.data));
  } catch (error) {
    dispatch(fetchSingleCommitteeFailure(error.message));
  }
};

//==============================================================================
// Update Committee Member
//==============================================================================
export const updateCommittee =
  (committeeId, updatedData) => async (dispatch) => {
    dispatch(updateCommitteeStart());
    try {
      const response = await axios.put(
        `${API}/committees/${committeeId}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      dispatch(updateCommitteeSuccess(response.data));
    } catch (error) {
      dispatch(updateCommitteeFailure(error.message));
    }
  };

//==============================================================================
// Fetch Committee Members Based on Year Ranges (Batch)
//==============================================================================
export const fetchCommitteeBatch = (startYear, endYear) => async (dispatch) => {
  dispatch(fetchCommitteeBatchStart());
  try {
    const response = await axios.get(
      `${API}/committees?startYear=${startYear}&endYear=${endYear}`,
      {
        withCredentials: true, 
      }
    );
    dispatch(fetchCommitteeBatchSuccess(response.data));
  } catch (error) {
    dispatch(fetchCommitteeBatchFailure(error.message));
  }
};

//==============================================================================
// Fetch All Committees
//==============================================================================
export const fetchAllCommittees = () => async (dispatch) => {
  dispatch(fetchAllCommitteesStart());
  try {
    const response = await axios.get(`${API}/committees`, {
      withCredentials: true, 
    });
    dispatch(fetchAllCommitteesSuccess(response.data));
  } catch (error) {
    dispatch(fetchAllCommitteesFailure(error.message));
  }
};

//==============================================================================
// Delete Committee Member
//==============================================================================
export const deleteCommittee = (committeeId) => async (dispatch) => {
  dispatch(deleteCommitteeStart());
  try {
    const response = await axios.delete(`${API}/committees/${committeeId}`, {
      withCredentials: true, 
    });
    dispatch(deleteCommitteeSuccess(response.data));
  } catch (error) {
    dispatch(deleteCommitteeFailure(error.message));
  }
};
