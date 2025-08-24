const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Mendaftarkan user baru
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  // 1. Ambil data dari request body
  const { nama_lengkap, email, password } = req.body;

  // 2. Validasi sederhana: pastikan semua field terisi
  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({ message: 'Harap isi semua field' });
  }

  try {
    // 3. Cek apakah email sudah terdaftar
    const [rows] = await db.query('SELECT email FROM pegawai WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // 4. Enkripsi (hash) password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Simpan user baru ke database
    const query = 'INSERT INTO pegawai (nama_lengkap, email, password) VALUES (?, ?, ?)';
    await db.query(query, [nama_lengkap, email, hashedPassword]);

    // 6. Kirim respon sukses
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
  // 1. Ambil data dari request body
  const { email, password } = req.body;

  // 2. Validasi sederhana
  if (!email || !password) {
    return res.status(400).json({ message: 'Harap isi email dan password' });
  }

  try {
    // 3. Cari user berdasarkan email
    const [rows] = await db.query('SELECT * FROM pegawai WHERE email = ?', [email]);
    const user = rows[0];

    // 4. Jika user ditemukan DAN password cocok
    if (user && (await bcrypt.compare(password, user.password))) {
      // 5. Buat Token (JWT)
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, // Data yang ingin disimpan di token (payload)
        process.env.JWT_SECRET,             // Kunci rahasia dari .env
        { expiresIn: '1h' }                 // Token akan kedaluwarsa dalam 1 jam
      );

      // 6. Kirim respon sukses beserta token
      res.status(200).json({
        message: 'Login berhasil!',
        token: token,
      });
    } else {
      // 7. Jika user tidak ditemukan atau password salah
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