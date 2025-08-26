import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import styles from './Auth.module.css';

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
    <div>
      <h1>Halaman Registrasi</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="nama_lengkap">Nama Lengkap</label>
          <input
            type="text"
            id="nama_lengkap"
            value={nama_lengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {message && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;