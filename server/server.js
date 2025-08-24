const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Server MyShift Berhasil Berjalan!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port http://localhost:${PORT}`);
});