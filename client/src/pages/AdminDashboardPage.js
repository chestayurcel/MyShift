import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import adminService from '../services/adminService';
import styles from './Dashboard.module.css';

const AdminDashboardPage = () => {
  const [semuaRiwayat, setSemuaRiwayat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSemuaRiwayat = async () => {
      try {
        const response = await adminService.getAllPresensi();
        setSemuaRiwayat(response.data);
      } catch (error) {
        console.error('Gagal mengambil data presensi:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate('/login');
        }
      }
    };
    fetchSemuaRiwayat();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1>Admin Dashboard - Riwayat Semua Pegawai</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>

    <div>
        <RouterLink to="/admin/pegawai" className={styles.navButton}>
    Lihat Daftar Pegawai
  </RouterLink>
    </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nama Pegawai</th>
            <th>Tanggal</th>
            <th>Jam Masuk</th>
            <th>Jam Keluar</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {semuaRiwayat.length > 0 ? (
            semuaRiwayat.map((item) => (
              <tr key={item.id}>
                <td>{item.nama_lengkap}</td>
                <td>{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>{item.jam_masuk}</td>
                <td>{item.jam_keluar || '-'}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Belum ada data presensi.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardPage;