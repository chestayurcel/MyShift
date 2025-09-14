const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

// @desc    Mendaftarkan user baru dari halaman publik
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  // Ambil departemen_id dari request body
  const { nama_lengkap, email, password, departemen_id } = req.body;

  // Validasi
  if (!nama_lengkap || !email || !password || !departemen_id) {
    return res.status(400).json({ message: 'Harap isi semua field, termasuk departemen' });
  }

  try {
    const [rows] = await db.query('SELECT email FROM pegawai WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Query INSERT diubah untuk menyertakan departemen_id dan role 'pegawai'
    const query = 'INSERT INTO pegawai (nama_lengkap, email, password, role, departemen_id) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [nama_lengkap, email, hashedPassword, 'pegawai', departemen_id]);

    logger.info(`Registrasi berhasil untuk email: ${email}`);

    res.status(201).json({
      message: 'Registrasi berhasil!',
    });
  } catch (error) {
    logger.error(`Error saat registrasi untuk email ${email}: ${error.message}`);
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Autentikasi user & mendapatkan token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Harap isi email dan password' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM pegawai WHERE email = ?', [email]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      logger.info(`Login berhasil untuk user: ${email}`);
      const token = jwt.sign(
        { 
          id: user.id, 
          nama: user.nama_lengkap,
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login berhasil!',
        token: token,
      });
    } else {
      logger.warn(`Percobaan login gagal untuk user: ${email}`);
      res.status(401).json({ message: 'Email atau password salah' });
    }
  } catch (error) {
    logger.error(`Error saat proses login untuk ${email}: ${error.message}`);
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
