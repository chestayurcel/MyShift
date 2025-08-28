import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap'; // Import dari react-bootstrap
import './Sidebar.css';
import { jwtDecode } from 'jwt-decode';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();
  const token = localStorage.getItem('userToken');
  const user = token ? jwtDecode(token) : null;

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="sidebar">
      <h2 className="sidebar-brand">MyShift</h2>
      <Nav className="flex-column sidebar-nav">
        {user && user.role === 'admin' ? (
          // Menu untuk Admin
          <>
            <Nav.Link as={RouterLink} to="/admin/dashboard" active={location.pathname === '/admin/dashboard'}>
              Dashboard
            </Nav.Link>

            {/* Dropdown Departemen menggunakan react-bootstrap */}
            <NavDropdown title="Departemen" id="departemen-nav-dropdown" active={isActive('/admin/departemen')}>
              <NavDropdown.Item as={RouterLink} to="/admin/departemen/kelola">
                Kelola Departemen
              </NavDropdown.Item>
              <NavDropdown.Item as={RouterLink} to="/admin/departemen/daftar">
                Daftar Departemen
              </NavDropdown.Item>
            </NavDropdown>

            {/* Placeholder Dropdown Perizinan */}
            <NavDropdown title="Perizinan" id="perizinan-nav-dropdown" active={isActive('/admin/perizinan')} disabled>
              <NavDropdown.Item as={RouterLink} to="/admin/perizinan/cuti">
                Cuti
              </NavDropdown.Item>
              <NavDropdown.Item as={RouterLink} to="/admin/perizinan/sakit">
                Sakit
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          // Menu untuk Pegawai
          <Nav.Link as={RouterLink} to="/dashboard" active={location.pathname === '/dashboard'}>
            Dashboard
          </Nav.Link>
        )}
        <button onClick={handleLogout} className="nav-link logout-button">
          Logout
        </button>
      </Nav>
    </div>
  );
};

export default Sidebar;
