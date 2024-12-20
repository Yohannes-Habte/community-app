import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AboutPage from "./views/aboutPage/AboutPage";
import ContactPage from "./views/contactPage/ContactPage";
import HomePage from "./views/homePage/HomePage";
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
import NewsPage from "./views/newsPage/NewsPage";
import UpdateCommitteeProfilePage from "./views/adminPages/updateCommitteeProfilePage/UpdateCommitteeProfilePage";
import UpdateFinancialReportPage from "./views/financePages/updateFinancialReportPage/UpdateFinancialReportPage";
import UpdateEventPage from "./views/adminPages/updateEventPage/UpdateEventPage";
import UpdatePriestDelegationPage from "./views/priestPages/updatePriestDelegationPage/UpdatePriestDelegationPage";
import UserProfilePage from "./views/userProfilePage/UserProfilePage";
import UpdateAnnualBudgetPage from "./views/adminPages/updateAnnualBudget/UpdateAnnualBudgetPage";
import UpdateMassPage from "./views/adminPages/updateMassPage/UpdateMassPage";

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
        <Route path="/news" element={<NewsPage />} />
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
        <Route
          path="/delegations/:id"
          element={<UpdatePriestDelegationPage />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoutes>
              <AdminDashboardPage />
            </AdminProtectedRoutes>
          }
        />

        <Route
          path="/committees/:id"
          element={<UpdateCommitteeProfilePage />}
        />

        <Route path="/masses/:id" element={<UpdateMassPage />} />

        <Route path="/events/:id" element={<UpdateEventPage />} />

        <Route path="/budgets/:id" element={<UpdateAnnualBudgetPage />} />

        {/* Finance Manager pages */}
        <Route
          path="/finance/dashboard"
          element={
            <FinanceMgtProtectedRoutes>
              <FinanceManagerPage />
            </FinanceMgtProtectedRoutes>
          }
        />

        <Route
          path="/reports/finances/:id"
          element={<UpdateFinancialReportPage />}
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
