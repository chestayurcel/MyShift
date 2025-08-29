import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import adminService from '../services/adminService';
import departemenService from '../services/departemenService';
import Layout from '../components/Layout';

const PegawaiEditPage = () => {
  const { id } = useParams(); // Mengambil ID pegawai dari URL
  const navigate = useNavigate();
  
  const [pegawaiData, setPegawaiData] = useState({
    nama_lengkap: '',
    email: '',
    role: 'pegawai',
    departemen_id: ''
  });
  const [semuaDepartemen, setSemuaDepartemen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchPegawaiData = useCallback(async () => {
    try {
      // Ambil data pegawai dan data semua departemen secara bersamaan
      const [pegawaiRes, departemenRes] = await Promise.all([
        adminService.getById(id),
        departemenService.getAll()
      ]);
      setPegawaiData(pegawaiRes.data);
      setSemuaDepartemen(departemenRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      navigate('/admin/pegawai'); // Redirect jika pegawai tidak ditemukan
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchPegawaiData();
  }, [fetchPegawaiData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPegawaiData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await adminService.update(id, pegawaiData);
      alert('Data pegawai berhasil diperbarui!');
      // Kembali ke halaman detail departemen dari pegawai tersebut
      navigate(`/admin/departemen/${pegawaiData.departemen_id || ''}`);
    } catch (error) {
      const resMessage = (error.response?.data?.message) || error.message || error.toString();
      setMessage(resMessage);
    }
  };

  if (loading) {
    return <Layout><p>Loading...</p></Layout>;
  }

  return (
    <Layout>
      <h1 className="mb-4">Edit Pegawai</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
              <input
                type="text"
                id="nama_lengkap"
                name="nama_lengkap"
                className="form-control"
                value={pegawaiData.nama_lengkap}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={pegawaiData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                name="role"
                className="form-select"
                value={pegawaiData.role}
                onChange={handleChange}
              >
                <option value="pegawai">Pegawai</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="departemen_id" className="form-label">Departemen</label>
              <select
                id="departemen_id"
                name="departemen_id"
                className="form-select"
                value={pegawaiData.departemen_id || ''}
                onChange={handleChange}
              >
                <option value="">-- Tidak ada departemen --</option>
                {semuaDepartemen.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.nama_departemen}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary me-2">Update</button>
            <RouterLink to={`/admin/departemen/${pegawaiData.departemen_id || ''}`} className="btn btn-secondary">
              Batal
            </RouterLink>
          </form>
          {message && (
            <div className="alert alert-danger mt-3" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PegawaiEditPage;
