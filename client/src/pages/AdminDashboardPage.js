import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { jwtDecode } from 'jwt-decode';

const AdminDashboardPage = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Mengambil nama admin dari token untuk pesan yang lebih personal
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

  return (
    <Layout>
      <div className="card shadow-sm p-4">
        <h1 className="mb-3">Selamat Datang, {adminName}!</h1>
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Selamat Bekerja!</h4>
          <p>
            Anda dapat mengelola departemen dan pegawai melalui menu di sidebar.
          </p>
          <hr />
          <p className="mb-0">
            Semangat!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
