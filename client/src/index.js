import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import UserProvider from './contexts/user/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </UserProvider>
  </React.StrictMode>
);
