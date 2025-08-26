import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminRoute from './components/AdminRoute';

function HomePage() {
  return (
    <div>
      <h1>Selamat Datang di Aplikasi Presensi MyShift!</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard (Protected)</Link></li>
        </ul>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;