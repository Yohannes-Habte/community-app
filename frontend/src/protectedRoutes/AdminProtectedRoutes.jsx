import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUser } from "../redux/actions/user/userAction";

const AdminProtectedRoutes = ({ children }) => {
  const { currentUser } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoutes;
