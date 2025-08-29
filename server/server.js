const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Impor semua rute
const authRoutes = require('./routes/authRoutes');
const presensiRoutes = require('./routes/presensiRoutes');
const adminRoutes = require('./routes/adminRoutes');
const departemenRoutes = require('./routes/departemenRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gunakan semua rute
app.use('/api/auth', authRoutes);
app.use('/api/presensi', presensiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/departemen', departemenRoutes);

// Rute dasar untuk testing
app.get('/', (req, res) => {
  res.send('<h1>🎉 Server MyShift Berhasil Berjalan!</h1>');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan pada port http://localhost:${PORT}`);
});
