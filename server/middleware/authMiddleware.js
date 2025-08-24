const jwt = require('jsonwebtoken');
const db = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  // 1. Cek apakah header authorization ada dan dimulai dengan "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Ambil token dari header (setelah kata "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Ambil data user dari DB berdasarkan id di token (tanpa password)
      //    dan lampirkan ke object 'req' agar bisa diakses di controller
      const [rows] = await db.query('SELECT id, nama_lengkap, email, role FROM pegawai WHERE id = ?', [decoded.id]);
      req.user = rows[0];

      // 5. Jika semua berhasil, lanjut ke controller/fungsi berikutnya
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  // Jika tidak ada token sama sekali
  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

module.exports = { protect };