const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Mendaftarkan user baru
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { nama_lengkap, email, password } = req.body;

  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({ message: 'Harap isi semua field' });
  }

  try {
    const [rows] = await db.query('SELECT email FROM pegawai WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO pegawai (nama_lengkap, email, password) VALUES (?, ?, ?)';
    await db.query(query, [nama_lengkap, email, hashedPassword]);

    res.status(201).json({
      message: 'Registrasi berhasil!',
      data: {
        nama_lengkap,
        email,
      },
    });
  } catch (error) {
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
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login berhasil!',
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Email atau password salah' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};