const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const presensiRoutes = require('./routes/presensiRoutes');
const adminRoutes = require('./routes/adminRoutes');
const departemenRoutes = require('./routes/departemenRoutes');
const perizinanRoutes = require('./routes/perizinanRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/presensi', presensiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/departemen', departemenRoutes);
app.use('/api/perizinan', perizinanRoutes);


app.get('/', (req, res) => {
  res.send('<h1>🎉 Server MyShift Berhasil Berjalan!</h1>');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server berjalan di semua antarmuka pada port ${PORT}`);
});