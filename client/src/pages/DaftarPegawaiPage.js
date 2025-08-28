import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import Layout from '../components/Layout'; // <-- 1. Import Layout

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
          // Hapus token lama jika ada sebelum redirect
          localStorage.removeItem('userToken');
          navigate('/login');
        }
      });
  }, [navigate]);

  // Fungsi handleLogout sudah tidak diperlukan di sini karena sudah ada di dalam Layout

  return (
    <Layout> {/* <-- 2. Bungkus semua konten dengan Layout */}
      <h1 className="mb-4">Daftar Semua Pegawai</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
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
    </Layout>
  );
};

export default DaftarPegawaiPage;