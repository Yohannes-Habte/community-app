import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './views/homePage/Home';
import SingleUser from './views/singleUserPage/SingleMember';
import SingleSacrament from './views/sigleSacramentPage/SingleSacrament';
import Sacraments from './views/sacramentPage/Sacraments';
import Login from './views/loginPage/Login';
import Finance from './views/financePage/Finance';
import Spirituals from './views/spiritualpage/Spirituals';
import Members from './views/memberPage/Members';
import Committe from './views/committeePage/Committee';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<SingleUser />} />
          <Route path="/committee" element={<Committe />} />
          <Route path="/sacraments" element={<Sacraments />} />
          <Route path="/sacraments/:id" element={<SingleSacrament />} />
          <Route path="/spirituals" element={<Spirituals />} />
          <Route path="/finance" element={<Finance />} />
          
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
