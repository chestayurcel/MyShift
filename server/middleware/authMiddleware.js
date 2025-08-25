const jwt = require('jsonwebtoken');
const db = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const [rows] = await db.query('SELECT id, nama_lengkap, email, role FROM pegawai WHERE id = ?', [decoded.id]);
      req.user = rows[0];

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Lanjutkan jika user adalah admin
    } else {
        res.status(403).json({ message: 'Akses ditolak. Rute ini hanya untuk admin.' });
    }
};

module.exports = { protect, isAdmin };