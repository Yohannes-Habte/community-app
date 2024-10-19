import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserSuccess,
  logoutUserFailure,
  logoutUserRequest,
} from "../../redux/reducers/user/memberReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../securitiy/secreteKey";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const { error, currentUser } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(logoutUserRequest());

      const { data } = await axios.get(`${API}/auth/logout`);

      if (data.success) {
        dispatch(logoutUserSuccess(data.message));
        toast.success(data.message);

        // Remove token from cookies
        Cookies.remove("token");

        navigate("/");
      } else {
        dispatch(logoutUserFailure("Logout failed"));
        toast.error("User could not logout");
      }
    } catch (error) {
      dispatch(
        logoutUserFailure(
          error.response ? error.response.data.message : "Network error"
        )
      );
      toast.error("Failed to logout. Please try again.");
    }
  };

  return { error, currentUser, signOut };
};

export default Logout;
