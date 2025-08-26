import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Tambahkan Link
import authService from '../services/authService';
import styles from './Auth.module.css'; // <-- 1. Import CSS Module

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
    <div className={styles.formContainer}> {/* <-- 2. Terapkan class */}
      <h1>Halaman Registrasi</h1>
      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}> {/* <-- Terapkan class */}
          <label htmlFor="nama_lengkap">Nama Lengkap</label>
          <input
            type="text"
            id="nama_lengkap"
            value={nama_lengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
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
          <button type="submit" className={styles.button}>Register</button> {/* <-- Terapkan class */}
        </div>
      </form>
      {message && (
        <div className={styles.errorMessage}>
          {message}
        </div>
      )}
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
};

export default RegisterPage;