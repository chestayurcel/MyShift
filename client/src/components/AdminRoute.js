import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Perhatikan cara importnya

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== 'admin') {
      // Jika role bukan admin, arahkan ke dashboard pegawai biasa
      return <Navigate to="/dashboard" />;
    }
  } catch (error) {
    // Jika token tidak valid, arahkan ke login
    console.error("Invalid token:", error);
    localStorage.removeItem('userToken');
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;