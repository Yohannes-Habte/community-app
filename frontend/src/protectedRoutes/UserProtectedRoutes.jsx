import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoutes = ({ children }) => {
  const { currentUser } = useSelector((state) => state.member);

  if (!currentUser) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default UserProtectedRoutes;
