// src/pages/HomePage.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center mb-4">Aplikasi Presensi MyShift</h1>
        <div className="d-grid gap-3">
          <RouterLink to="/login" className="btn btn-primary btn-lg">
            Login
          </RouterLink>
          <RouterLink to="/register" className="btn btn-success btn-lg">
            Register
          </RouterLink>
        </div>
      </div>
    </div>
  );
}

export default HomePage;