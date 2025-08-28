import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Impor semua halaman dari filenya masing-masing
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DaftarPegawaiPage from './pages/DaftarPegawaiPage';
import PegawaiCreatePage from './pages/PegawaiCreatePage';
import KelolaDepartemenPage from './pages/KelolaDepartemenPage';
import DaftarDepartemenPage from './pages/DaftarDepartemenPage'; // Halaman baru

// Impor komponen
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Rute Terproteksi untuk Pegawai */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rute Terproteksi untuk Admin */}
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
          <Route
            path="/admin/pegawai/tambah"
            element={
              <AdminRoute>
                <PegawaiCreatePage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/departemen/kelola"
            element={
              <AdminRoute>
                <KelolaDepartemenPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/departemen/daftar"
            element={
              <AdminRoute>
                <DaftarDepartemenPage />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
