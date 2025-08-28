// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Impor semua halaman dari filenya masing-masing
import HomePage from './pages/HomePage'; // <-- IMPORT BARU
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DaftarPegawaiPage from './pages/DaftarPegawaiPage';

// Impor komponen
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* HAPUS FUNGSI HOMEPAGE DARI SINI, GUNAKAN KOMPONEN HASIL IMPORT */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/pegawai"
            element={
              <AdminRoute>
                <DaftarPegawaiPage />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;