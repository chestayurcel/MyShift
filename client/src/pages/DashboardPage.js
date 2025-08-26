import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import presensiService from '../services/presensiService';
import styles from './Dashboard.module.css'; // Pastikan import ini ada

const DashboardPage = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    try {
      const response = await presensiService.getRiwayat();
      setRiwayat(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
      console.error('Gagal mengambil riwayat:', error);
    }
  };

  const handleClockIn = async () => {
    try {
      const response = await presensiService.clockIn();
      setMessage(response.data.message);
      fetchRiwayat();
    } catch (error) {
      setMessage(error.response.data.message || 'Gagal melakukan clock-in');
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await presensiService.clockOut();
      setMessage(response.data.message);
      fetchRiwayat();
    } catch (error) {
      setMessage(error.response.data.message || 'Gagal melakukan clock-out');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1>Dashboard Pegawai</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={handleClockIn} className={styles.clockInButton}>Clock In</button>
        <button onClick={handleClockOut} className={styles.clockOutButton}>Clock Out</button>
      </div>

      {message && <p className={styles.message}>{message}</p>}

      <h2>Riwayat Presensi Anda</h2>

      {/* BAGIAN TABEL YANG HILANG - PASTIKAN ADA DI SINI */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jam Masuk</th>
            <th>Jam Keluar</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {riwayat.length > 0 ? (
            riwayat.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>{item.jam_masuk}</td>
                <td>{item.jam_keluar || '-'}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Belum ada riwayat presensi.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* BATAS AKHIR BAGIAN TABEL */}

    </div> // <-- Pastikan tabel berada SEBELUM div penutup ini
  );
};

export default DashboardPage;