import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../services/authService';
import departemenService from '../services/departemenService';

const RegisterPage = () => {
  const [nama_lengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departemenId, setDepartemenId] = useState('');
  const [semuaDepartemen, setSemuaDepartemen] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // PASTIKAN BARIS INI MENGGUNAKAN getPublicAll()
    departemenService.getPublicAll()
      .then(res => {
        setSemuaDepartemen(res.data);
      })
      .catch(err => {
        console.error("Gagal mengambil daftar departemen", err);
        // Tambahkan pesan error untuk pengguna jika API gagal
        setMessage("Tidak dapat memuat daftar departemen. Coba lagi nanti.");
      });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!departemenId) {
        setMessage("Harap pilih departemen terlebih dahulu.");
        return;
    }
    try {
      await authService.register(nama_lengkap, email, password, departemenId);
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      const resMessage =
        (error.response?.data?.message) || error.message || error.toString();
      setMessage(resMessage);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h1 className="text-center mb-4">Halaman Registrasi</h1>
        <form onSubmit={handleRegister}>
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
            <label htmlFor="departemen" className="form-label">Departemen</label>
            <select
              id="departemen"
              className="form-select"
              value={departemenId}
              onChange={(e) => setDepartemenId(e.target.value)}
              required
            >
              <option value="">Pilih Departemen Anda</option>
              {semuaDepartemen.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.nama_departemen}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100 mt-3">Register</button>
        </form>
        {message && (
          <div className="alert alert-danger mt-3" role="alert">
            {message}
          </div>
        )}
        <p className="text-center mt-3">
          Sudah punya akun? <RouterLink to="/login">Login di sini</RouterLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
