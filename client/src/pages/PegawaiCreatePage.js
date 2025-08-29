import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useSearchParams } from 'react-router-dom';
import adminService from '../services/adminService';
import Layout from '../components/Layout';
import departemenService from '../services/departemenService'; 

const PegawaiCreatePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [nama_lengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('pegawai');
  const [departemenId, setDepartemenId] = useState('');
  const [semuaDepartemen, setSemuaDepartemen] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const deptIdFromUrl = searchParams.get('departemenId');
    if (deptIdFromUrl) {
      setDepartemenId(deptIdFromUrl);
    }

    departemenService.getAll().then(res => {
      setSemuaDepartemen(res.data);
    });
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const data = { 
      nama_lengkap, 
      email, 
      password, 
      role, 
      departemen_id: departemenId 
    };
    try {
      await adminService.createPegawai(data);
      alert('Pegawai baru berhasil ditambahkan!');
      navigate(departemenId ? `/admin/departemen/${departemenId}` : '/admin/pegawai');
    } catch (error) {
      const resMessage = (error.response?.data?.message) || error.message || error.toString();
      setMessage(resMessage);
    }
  };

  return (
    <Layout>
      <h1 className="mb-4">Tambah Pegawai Baru</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
              <input
                type="text"
                id="nama_lengkap"
                className="form-control"
                value={nama_lengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="pegawai">Pegawai</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="departemen" className="form-label">Departemen</label>
              <select
                id="departemen"
                className="form-select"
                value={departemenId}
                onChange={(e) => setDepartemenId(e.target.value)}
                required
              >
                <option value="">Pilih Departemen</option>
                {semuaDepartemen.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.nama_departemen}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary me-2">Simpan</button>
            <RouterLink to={departemenId ? `/admin/departemen/${departemenId}` : '/admin/departemen/daftar'} className="btn btn-secondary">
              Batal
            </RouterLink>
          </form>
          {message && <div className="alert alert-danger mt-3">{message}</div>}
        </div>
      </div>
    </Layout>
  );
};

export default PegawaiCreatePage;
