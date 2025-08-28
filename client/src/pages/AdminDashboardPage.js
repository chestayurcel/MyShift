import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import Layout from '../components/Layout'; // Import komponen Layout

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
        // Jika token tidak valid atau akses ditolak, arahkan ke login
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Hapus token lama jika ada sebelum redirect
          localStorage.removeItem('userToken');
          navigate('/login');
        }
      }
    };
    fetchSemuaRiwayat();
  }, [navigate]);

  return (
    <Layout> {/* Gunakan Layout sebagai pembungkus utama */}
      <h1 className="mb-4">Riwayat Presensi Semua Pegawai</h1>
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
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
                <td colSpan="5" className="text-center">Belum ada data presensi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;