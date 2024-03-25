import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../redux/reducers/userReducer';
import axios from 'axios';
import { API } from '../securitiy/secreteKey';
import { toast } from 'react-toastify';

const Logout = async () => {
  // Navigate
  const navigate = useNavigate();
  // Global state variables
  const { error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Sign out Function
  const logoutUser = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(`${API}/auth/logout`);

      if (data.success) {
        dispatch(userLogoutSuccess(data.message));
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error('User could not logout');
      }
    } catch (error) {
      dispatch(userLogoutFailure(error.response.data.message));
    }
  };

  return logoutUser;
};

export default Logout;
