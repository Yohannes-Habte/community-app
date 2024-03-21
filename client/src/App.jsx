import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserSignupPage from './views/userSignupPage/UserSignupPage';
import UserLoginPage from './views/userLoginPage/UserLoginPage';
import AboutPage from './views/aboutPage/AboutPage';
import ContactPage from './views/contactPage/ContactPage';
import ReportsPage from './views/reportPage/ReportsPage';
import HomePage from './views/homePage/HomePage';
import UserProfilePage from './views/userPages/userProfilePage/UserProfilePage';
import UserAddresspage from './views/userPages/userAddressPage/UserAddresspage';
import ChangePasswordPage from './views/userPages/changePasswordPage/ChangePasswordPage';
import ContributionPage from './views/userPages/userContributionPage/ContributionPage';
import UserInboxPage from './views/userPages/userInboxPage/UserInboxPage';
import AllUserServicespage from './views/userPages/allUserServicesPage/AllUserServicespage';
import ServiceRequestPage from './views/userPages/serviceRequestPage/ServiceRequestPage';
import PriestDashboardPage from './views/priestPages/priestDashboardPage/PriestDashboardPage';
import AdminDashboardPage from './views/adminPages/adminDashboarPage/AdminDashboardPage';
import FinancialReport from './components/reportTables/FinancialReport';
import FinacneManagerPage from './views/financePages/financeManagerPage/FinacneManagerPage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="*" element={<Navigate to={'/'} />} />

          {/* User pages */}
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/address" element={<UserAddresspage />} />
          <Route path="/user/changePassword" element={<ChangePasswordPage />} />
          <Route path="/user/contribution" element={<ContributionPage />} />
          <Route path="/user/serviceRequest" element={<ServiceRequestPage />} />
          <Route path="/user/services" element={<AllUserServicespage />} />
          <Route path="/user/inbox" element={<UserInboxPage />} />

          {/* Parish Priest pages */}
          <Route path="/priest/dashboard" element={<PriestDashboardPage />} />

          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Finance Manager pages */}
          <Route path="/finance/dashboard" element={<FinacneManagerPage />} />
          <Route path="/finance/reports" element={<FinancialReport />} />
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
      </Router>
    </div>
  );
};

export default App;
