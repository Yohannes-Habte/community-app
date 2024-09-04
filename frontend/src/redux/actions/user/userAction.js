import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import Cookies from "js-cookie";
import {

  fetchAllUsersStart,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  fetchSingleUserStart,
  fetchSingleUserSuccess,
  fetchSingleUserFailure,
} from "../../reducers/userReducer";


//==============================================================================
// Get all parishioners
//==============================================================================
export const getAllParishioners = () => async (dispatch) => {
  dispatch(fetchAllUsersStart());
  try {
    const response = await axios.get(`${API}/members`);
    dispatch(fetchAllUsersSuccess(response.data.users));
  } catch (error) {
    dispatch(fetchAllUsersFailure(error.response.data.message));
  }
};

//==============================================================================
// Fetch a Single User
//==============================================================================

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchSingleUserStart());

  try {
    // console.log('All cookies:', Cookies.get());
    const token = Cookies.get("token");
   

    if (!token) {
      // console.warn("No token found in cookies, redirecting to login.");
      throw new Error("No user found");
    }

    const res = await axios.get(`${API}/members/user`, {
      withCredentials: true,
    });
    console.log("user data = ", res);
    dispatch(fetchSingleUserSuccess(res.data.result));
  } catch (error) {
    // console.error("Fetch User Error:", error);
    dispatch(fetchSingleUserFailure(error.message));
  }
};
