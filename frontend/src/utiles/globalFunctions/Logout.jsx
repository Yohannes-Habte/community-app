import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
} from "../../redux/reducers/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../securitiy/secreteKey";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      // Dispatch logout start action
      dispatch(logoutUserStart());

      // Call logout API
      const { data } = await axios.get(`${API}/auth/logout`);

      // Check logout success
      if (data.success) {
        dispatch(logoutUserSuccess(data.message));
        toast.success(data.message);
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
      } else {
        // Handle logout failure
        dispatch(logoutUserFailure("Logout failed"));
        toast.error("User could not logout");
      }
    } catch (error) {
      // Handle network errors or other exceptions
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
