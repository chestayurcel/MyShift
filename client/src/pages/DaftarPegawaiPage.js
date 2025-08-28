import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import adminService from '../services/adminService';
import Layout from '../components/Layout';

const DaftarPegawaiPage = () => {
  const [pegawai, setPegawai] = useState([]);
  const navigate = useNavigate();

  // Menggunakan useCallback untuk mencegah re-render yang tidak perlu
  // dan menghilangkan warning dari ESLint
  const fetchPegawai = useCallback(() => {
    adminService.getAllPegawai()
      .then(response => {
        setPegawai(response.data);
      })
      .catch(error => {
        console.error('Gagal mengambil data pegawai:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('userToken');
          navigate('/login');
        }
      });
  }, [navigate]);

  useEffect(() => {
    fetchPegawai();
  }, [fetchPegawai]);

  // Fungsi untuk menghapus pegawai
  const handleDelete = async (pegawaiId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pegawai ini?')) {
      try {
        await adminService.deletePegawai(pegawaiId);
        alert('Pegawai berhasil dihapus.');
        fetchPegawai(); // Refresh tabel setelah menghapus
      } catch (error) {
        alert('Gagal menghapus pegawai.');
        console.error(error);
      }
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Daftar Semua Pegawai</h1>
        <RouterLink to="/admin/pegawai/tambah" className="btn btn-success">
          + Tambah Pegawai
        </RouterLink>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nama Lengkap</th>
              <th>Email</th>
              <th>Role</th>
              <th>Tanggal Terdaftar</th>
              <th>Aksi</th>
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
                <td>
                  <button className="btn btn-sm btn-primary me-2" disabled>Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DaftarPegawaiPage;
