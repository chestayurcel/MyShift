import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; 
import adminService from '../services/adminService';
import styles from './Dashboard.module.css';

const DaftarPegawaiPage = () => {
  const [pegawai, setPegawai] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    adminService.getAllPegawai()
      .then(response => {
        setPegawai(response.data);
      })
      .catch(error => {
        console.error('Gagal mengambil data pegawai:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1>Admin Dashboard - Daftar Semua Pegawai</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
      
      {/* BAGIAN YANG DIPERBAIKI */}
      <div>
        <RouterLink to="/admin/dashboard" className={styles.navButton}>
          Kembali ke Riwayat Presensi
        </RouterLink>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Lengkap</th>
            <th>Email</th>
            <th>Role</th>
            <th>Tanggal Terdaftar</th>
          </tr>
        </thead>
        <tbody>
          {pegawai.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nama_lengkap}</td>
              <td>{p.email}</td>
              <td>{p.role}</td>
              <td>{new Date(p.created_at).toLocaleDateString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DaftarPegawaiPage;