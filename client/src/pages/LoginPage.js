import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import styles from './Auth.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setMessage('');

    try {
    const response = await authService.login(email, password);
    if (response.data.token) {
      const token = response.data.token;
      localStorage.setItem('userToken', token);

      const user = jwtDecode(token);
      
       if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
    
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
      <h1>Login MyShift</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}> {/* <-- Terapkan class */}
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className={styles.button}>Login</button> {/* <-- Terapkan class */}
      </form>
      {message && <div className={styles.errorMessage}>{message}</div>}
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
};

export default LoginPage;