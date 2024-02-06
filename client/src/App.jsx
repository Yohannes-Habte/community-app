import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import UserSignupPage from './views/userPages/userSignupPage/UserSignupPage';
import UserLoginPage from './views/userPages/userLoginPage/UserLoginPage';
import AboutPage from './views/aboutPage/AboutPage';
import ContactPage from './views/contactPage/ContactPage';
import ReportsPage from './views/reportPage/ReportsPage';
import HomePage from './views/homePage/HomePage';
import ServicesPage from './views/servicesPage/ServicesPage';

const App = () => {
  return (
    <div>
      <Router>
        <ToastContainer position="bottom-center" limit={1} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<UserSignupPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
