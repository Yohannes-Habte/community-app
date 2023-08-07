import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './views/homePage/Home';
import Contact from './views/contactPage/Contact';
import Service from './views/servicePage/Service';
import About from './views/aboutPage/About';
import Register from './views/registerPage/Register';
import Login from './views/loginPage/Login';
import Navbar from './components/navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Reports from './views/reportPage/Reports';
import Header from './components/header/Header';

const App = () => {
  return (
    <div>
      <Router>
        <ToastContainer position="bottom-center" limit={1} />
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
