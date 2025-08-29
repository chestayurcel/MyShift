import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';
import departemenService from '../services/departemenService';
import adminService from '../services/adminService'; // Kita butuh ini untuk hapus pegawai

const DepartemenDetailPage = () => {
  const { id } = useParams(); // Mengambil ID dari URL, misal: /departemen/1
  const navigate = useNavigate();

  const [departemen, setDepartemen] = useState(null);
  const [pegawai, setPegawai] = useState([]);
  const [presensi, setPresensi] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Mengambil semua data secara paralel untuk efisiensi
      const [deptRes, pegRes, presRes] = await Promise.all([
        departemenService.getById(id),
        departemenService.getPegawaiByDepartemen(id),
        departemenService.getPresensiByDepartemen(id)
      ]);
      setDepartemen(deptRes.data);
      setPegawai(pegRes.data);
      setPresensi(presRes.data);
    } catch (error) {
      console.error("Gagal memuat data detail departemen:", error);
      navigate('/admin/departemen/daftar'); // Jika departemen tidak ditemukan, kembali ke daftar
    } finally {
      setLoading(false);
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
        fetchData(); // Refresh data setelah menghapus
      } catch (error) {
        alert('Gagal menghapus pegawai.');
      }
    }
  };

  if (loading) {
    return <Layout><p>Memuat data...</p></Layout>;
  }

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Detail Departemen: {departemen?.nama_departemen}</h1>
        <RouterLink to="/admin/departemen/daftar" className="btn btn-secondary">
          Kembali ke Daftar
        </RouterLink>
      </div>

      {/* Bagian Manajemen Pegawai */}
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Daftar Pegawai</h5>
          {/* Tombol Tambah akan mengarah ke form yang sama, tapi dengan ID departemen */}
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
                {pegawai.length > 0 ? pegawai.map(p => (
                  <tr key={p.id}>
                    <td>{p.nama_lengkap}</td>
                    <td>{p.email}</td>
                    <td>{p.role}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2" disabled>Edit</button>
                      <button onClick={() => handleDeletePegawai(p.id)} className="btn btn-sm btn-danger">Hapus</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center">Belum ada pegawai di departemen ini.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bagian Riwayat Presensi */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Riwayat Presensi Departemen</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
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
                {presensi.length > 0 ? presensi.map((pr, index) => (
                  <tr key={index}>
                    <td>{pr.nama_lengkap}</td>
                    <td>{new Date(pr.tanggal).toLocaleDateString('id-ID')}</td>
                    <td>{pr.jam_masuk}</td>
                    <td>{pr.jam_keluar || '-'}</td>
                    <td>{pr.status}</td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-center">Belum ada riwayat presensi di departemen ini.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DepartemenDetailPage;
