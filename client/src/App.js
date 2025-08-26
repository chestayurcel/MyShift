import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import './App.css';
import styles from './pages/HomePage.module.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DaftarPegawaiPage from './pages/DaftarPegawaiPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Aplikasi Presensi MyShift</h1>
      <nav className={styles.nav}>
        <RouterLink to="/login" className={`${styles.navLink} ${styles.loginButton}`}>
          Login
        </RouterLink>
        <RouterLink to="/register" className={`${styles.navLink} ${styles.registerButton}`}>
          Register
        </RouterLink>
      </nav>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" 
                element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route
            path="/admin/dashboard"
            element={<AdminRoute><AdminDashboardPage /></AdminRoute>}
          />
          <Route
            path="/admin/pegawai"
            element={<AdminRoute><DaftarPegawaiPage /></AdminRoute>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;