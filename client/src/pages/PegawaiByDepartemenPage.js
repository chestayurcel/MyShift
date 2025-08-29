import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';
import departemenService from '../services/departemenService';
import adminService from '../services/adminService';

const PegawaiByDepartemenPage = () => {
  const { id } = useParams(); // id departemen
  const navigate = useNavigate();
  const [pegawai, setPegawai] = useState([]);
  const [departemenNama, setDepartemenNama] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const [pegawaiRes, deptRes] = await Promise.all([
        departemenService.getPegawaiInDepartemen(id),
        departemenService.getDetails(id)
      ]);
      setPegawai(pegawaiRes.data);
      setDepartemenNama(deptRes.data.nama_departemen);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      navigate('/admin/departemen/daftar');
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeletePegawai = async (pegawaiId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pegawai ini?')) {
      try {
        await adminService.deletePegawai(pegawaiId);
        alert('Pegawai berhasil dihapus.');
        fetchData(); // Refresh data
      } catch (err) {
        alert('Gagal menghapus pegawai.');
      }
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Daftar Pegawai: {departemenNama}</h1>
        <RouterLink to={`/admin/departemen/${id}`} className="btn btn-secondary">
          Kembali
        </RouterLink>
      </div>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manajemen Pegawai</h5>
          <RouterLink to={`/admin/pegawai/tambah?departemenId=${id}`} className="btn btn-success btn-sm">
            + Tambah Pegawai
          </RouterLink>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nama Lengkap</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pegawai.length > 0 ? (
                  pegawai.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nama_lengkap}</td>
                      <td>{p.email}</td>
                      <td>{p.role}</td>
                      <td>
                        <RouterLink to={`/admin/pegawai/edit/${p.id}`} className="btn btn-primary btn-sm me-2">
                          Edit
                        </RouterLink>
                        <button onClick={() => handleDeletePegawai(p.id)} className="btn btn-danger btn-sm">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">Belum ada pegawai di departemen ini.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PegawaiByDepartemenPage;