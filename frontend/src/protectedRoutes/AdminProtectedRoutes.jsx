import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ children }) => {
  const { currentUser } = useSelector((state) => state.member);

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoutes;
