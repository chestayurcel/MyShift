const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const presensiRoutes = require('./routes/presensiRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/presensi', presensiRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Server MyShift Berhasil Berjalan!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port http://localhost:${PORT}`);
});