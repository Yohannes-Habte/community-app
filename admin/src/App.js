import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './views/homePage/Home';
import Users from './views/usersPage/Users';
import SingleUser from './views/singleUserPage/SingleUser';
import SingleSacrament from './views/sigleSacramentPage/SingleSacrament';
import Sacraments from './views/sacramentPage/Sacraments';
import Login from './views/loginPage/Login';
import Finance from './views/financePage/Finance';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/sacraments" element={<Sacraments />} />
          <Route path="/sacraments/:id" element={<SingleSacrament />} />
          <Route path="/finance" element={<Finance />} />
          
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
