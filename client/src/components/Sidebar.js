// client/src/components/Sidebar.js
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Kita akan buat file ini
import { jwtDecode } from 'jwt-decode';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();
  const token = localStorage.getItem('userToken');
  const user = token ? jwtDecode(token) : null;

  // Tentukan link mana yang aktif berdasarkan URL saat ini
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h2 className="sidebar-brand">MyShift</h2>
      <nav className="sidebar-nav">
        {user && user.role === 'admin' ? (
          // Menu untuk Admin
          <>
            <RouterLink to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}>
              Dashboard Admin
            </RouterLink>
            <RouterLink to="/admin/pegawai" className={`nav-link ${isActive('/admin/pegawai') ? 'active' : ''}`}>
              Daftar Pegawai
            </RouterLink>
          </>
        ) : (
          // Menu untuk Pegawai
          <RouterLink to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            Dashboard
          </RouterLink>
        )}
        <button onClick={handleLogout} className="nav-link logout-button">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;