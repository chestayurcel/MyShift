import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../services/authService';


const RegisterPage = () => {
  const [nama_lengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await authService.register(nama_lengkap, email, password);
      alert('Registrasi berhasil! Silakan login.'); 
      navigate('/login');
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
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