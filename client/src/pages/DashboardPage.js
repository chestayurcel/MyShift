import React, { useState, useEffect, useCallback } from 'react';
import presensiService from '../services/presensiService';
import Layout from '../components/Layout';
import { jwtDecode } from 'jwt-decode';

const DashboardPage = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [message, setMessage] = useState('');
  const [namaUser, setNamaUser] = useState('');

  const fetchRiwayat = useCallback(async () => {
    try {
      const response = await presensiService.getRiwayat();
      setRiwayat(response.data);
    } catch (error) {
      console.error('Gagal mengambil riwayat:', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const user = jwtDecode(token);
        setNamaUser(user.nama || 'Pegawai');
      } catch (e) {
        console.error("Token tidak valid:", e);
      }
    }
    fetchRiwayat();
  }, [fetchRiwayat]);

  const handleClockIn = async () => {
    try {
      const response = await presensiService.clockIn();
      setMessage(response.data.message);
      fetchRiwayat();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal melakukan clock-in');
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await presensiService.clockOut();
      setMessage(response.data.message);
      fetchRiwayat();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal melakukan clock-out');
    }
  };

  return (
    <Layout>
      <div className="card shadow-sm p-4 mb-4">
        <h1 className="mb-4">Selamat Datang, {namaUser}!</h1>
        <div className="alert alert-primary">
          Terus semangat dalam menyelesaikan semua pekerjaanmu.
        </div>
      </div>
      
      <div className="card shadow-sm p-4">
        <div className="d-flex gap-2 mb-4">
          <button onClick={handleClockIn} className="btn btn-success">Clock In</button>
          <button onClick={handleClockOut} className="btn btn-warning text-dark">Clock Out</button>
        </div>

        {message && <div className="alert alert-info" role="alert">{message}</div>}

        <h2 className="mb-3">Riwayat Presensi Anda</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
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
                  <td colSpan="4" className="text-center">Belum ada riwayat presensi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
