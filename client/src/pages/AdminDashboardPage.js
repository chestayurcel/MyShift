import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';
import { jwtDecode } from 'jwt-decode';

const AdminDashboardPage = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const user = jwtDecode(token);
        setAdminName(user.nama || 'Admin');
      } catch (error) {
        console.error("Token tidak valid:", error);
        setAdminName('Admin');
      }
    }
  }, []);

  // ======================================================================
  // IKON BARU UNTUK DEPARTEMEN
  // ======================================================================
  const DepartmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-people-fill mb-3 text-primary" viewBox="0 0 16 16">
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
    </svg>
  );

  const PermissionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-calendar-check mb-3 text-success" viewBox="0 0 16 16">
        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg>
  );

  return (
    <Layout>
      {/* Banner Selamat Datang */}
      <div className="p-5 mb-4 bg-primary text-white rounded-3 shadow">
        <div className="container-fluid py-3">
          <h1 className="display-5 fw-bold">Selamat Datang, {adminName}!</h1>
          <p className="col-md-8 fs-4">Selamat bekerja! Gunakan panel ini untuk mengelola semua aspek operasional aplikasi MyShift.</p>
        </div>
      </div>

      {/* Kartu Akses Cepat */}
      <div className="row align-items-md-stretch">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100 p-4">
            <DepartmentIcon />
            <h2>Manajemen Departemen</h2>
            <p>Atur semua departemen, kelola pegawai di dalamnya, dan lihat riwayat presensi spesifik per departemen.</p>
            <RouterLink to="/admin/departemen/daftar" className="btn btn-outline-primary">
              Kelola Departemen
            </RouterLink>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100 p-4">
            <PermissionIcon />
            <h2>Manajemen Perizinan</h2>
            <p>Tinjau, terima, atau tolak pengajuan cuti dan sakit dari semua pegawai dalam satu tempat terpusat.</p>
            <RouterLink to="/admin/perizinan" className="btn btn-outline-success">
              Kelola Perizinan
            </RouterLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;