import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUser } from "../redux/actions/user/userAction";

const UserProtectedRoutes = ({ children }) => {
  const { currentUser } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserProtectedRoutes;
