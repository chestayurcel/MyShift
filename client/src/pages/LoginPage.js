import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

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
    <div className="container mt-5"> {/* Bootstrap container dan margin-top */}
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '400px' }}> {/* Bootstrap card */}
        <h1 className="text-center mb-4">Login MyShift</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3"> {/* Bootstrap margin-bottom */}
            <label htmlFor="email" className="form-label">Email</label> {/* Bootstrap form-label */}
            <input
              type="email"
              id="email"
              className="form-control" // Bootstrap form-control
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
          <button type="submit" className="btn btn-primary w-100 mt-3">Login</button> {/* Bootstrap button */}
        </form>
        {message && (
          <div className="alert alert-danger mt-3" role="alert"> {/* Bootstrap alert */}
            {message}
          </div>
        )}
        <p className="text-center mt-3">
          Belum punya akun? <RouterLink to="/register">Daftar di sini</RouterLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;