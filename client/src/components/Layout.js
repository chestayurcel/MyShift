// client/src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="d-flex">
      <Sidebar handleLogout={handleLogout} />
      <div style={{ marginLeft: '250px', padding: '2rem', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;