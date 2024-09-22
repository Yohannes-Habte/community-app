import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AboutPage from "./views/aboutPage/AboutPage";
import ContactPage from "./views/contactPage/ContactPage";
import ReportsPage from "./views/reportPage/ReportsPage";
import HomePage from "./views/homePage/HomePage";
import UserProfilePage from "./views/userPages/userProfilePage/UserProfilePage";
import PriestDashboardPage from "./views/priestPages/priestDashboardPage/PriestDashboardPage";
import AdminDashboardPage from "./views/adminPages/adminDashboarPage/AdminDashboardPage";
import UserProtectedRoutes from "./protectedRoutes/UserProtectedRoutes";
import PriestProtectedRoutes from "./protectedRoutes/PriestProtectedRoutes";
import AdminProtectedRoutes from "./protectedRoutes/AdminProtectedRoutes";
import FinanceMgtProtectedRoutes from "./protectedRoutes/FinanceMgtProtectedRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FinanceManagerPage from "./views/financePages/financeManagerPage/FinanceManagerPage";
import { fetchUser } from "./redux/actions/user/userAction";
import UpdateServicePage from "./views/priestPages/updateServicePage/UpdateServicePage";
import LoginPage from "./views/loginPage/LoginPage";
import RegisterPage from "./views/registerPage/RegisterPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />

        {/* User pages */}
        <Route
          path="/user/profile"
          element={
            <UserProtectedRoutes>
              <UserProfilePage />
            </UserProtectedRoutes>
          }
        />

       

        {/* Parish Priest pages */}
        <Route
          path="/priest/dashboard"
          element={
            <PriestProtectedRoutes>
              <PriestDashboardPage />
            </PriestProtectedRoutes>
          }
        />

        <Route path="/services/:id" element={<UpdateServicePage />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoutes>
              <AdminDashboardPage />
            </AdminProtectedRoutes>
          }
        />

        {/* Finance Manager pages */}
        <Route
          path="/finance/dashboard"
          element={
            <FinanceMgtProtectedRoutes>
              <FinanceManagerPage />
            </FinanceMgtProtectedRoutes>
          }
        />
      </Routes>

      {/* React toastify */}
      <ToastContainer
        position="top-right"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
