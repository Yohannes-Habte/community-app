import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoutes = ({children}) => {
   
    const { currentUser } = useSelector((state) => state.user);
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else if (currentUser && currentUser.role !== 'admin') {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
};

export default AdminProtectedRoutes;
