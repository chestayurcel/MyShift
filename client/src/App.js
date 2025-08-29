import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Impor semua halaman
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AjukanIzinPage from './pages/AjukanIzinPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import KelolaDepartemenPage from './pages/KelolaDepartemenPage';
import DaftarDepartemenPage from './pages/DaftarDepartemenPage';
import DepartemenDetailPage from './pages/DepartemenDetailPage';
import PegawaiByDepartemenPage from './pages/PegawaiByDepartemenPage';
import PresensiByDepartemenPage from './pages/PresensiByDepartemenPage';
import PegawaiCreatePage from './pages/PegawaiCreatePage';
import PegawaiEditPage from './pages/PegawaiEditPage';
import KelolaPerizinanPage from './pages/KelolaPerizinanPage';

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
          
          {/* Rute Pegawai */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
          />
          <Route 
            path="/ajukan-izin"
            element={<ProtectedRoute><AjukanIzinPage /></ProtectedRoute>} 
          />
          
          {/* Rute Admin */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/departemen/kelola" element={<AdminRoute><KelolaDepartemenPage /></AdminRoute>} />
          <Route path="/admin/departemen/daftar" element={<AdminRoute><DaftarDepartemenPage /></AdminRoute>} />
          <Route path="/admin/departemen/:id" element={<AdminRoute><DepartemenDetailPage /></AdminRoute>} />
          <Route path="/admin/departemen/:id/pegawai" element={<AdminRoute><PegawaiByDepartemenPage /></AdminRoute>} />
          <Route path="/admin/departemen/:id/presensi" element={<AdminRoute><PresensiByDepartemenPage /></AdminRoute>} />
          <Route path="/admin/pegawai/tambah" element={<AdminRoute><PegawaiCreatePage /></AdminRoute>} />
          <Route path="/admin/pegawai/edit/:id" element={<AdminRoute><PegawaiEditPage /></AdminRoute>} />
          <Route path="/admin/perizinan" element={<AdminRoute><KelolaPerizinanPage /></AdminRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;