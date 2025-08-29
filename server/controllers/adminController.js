const db = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc    Admin mendapatkan semua riwayat presensi pegawai
// @route   GET /api/admin/presensi/semua
// @access  Private/Admin
const getAllPresensi = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id, 
        p.tanggal, 
        p.jam_masuk, 
        p.jam_keluar, 
        p.status, 
        pg.nama_lengkap 
      FROM presensi p
      JOIN pegawai pg ON p.pegawai_id = pg.id
      ORDER BY p.tanggal DESC, p.jam_masuk DESC;
    `;
    const [history] = await db.query(query);
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Admin mendapatkan semua data pegawai
// @route   GET /api/admin/pegawai
// @access  Private/Admin
const getAllPegawai = async (req, res) => {
  try {
    const [pegawai] = await db.query(
      'SELECT id, nama_lengkap, email, role, created_at FROM pegawai ORDER BY id DESC'
    );
    res.status(200).json(pegawai);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Admin membuat akun pegawai baru
// @route   POST /api/admin/pegawai
// @access  Private/Admin
const createPegawai = async (req, res) => {
  const { nama_lengkap, email, password, role, departemen_id } = req.body;

  if (!nama_lengkap || !email || !password || !role) {
    return res.status(400).json({ message: 'Harap isi semua field' });
  }

  try {
    const [existing] = await db.query('SELECT email FROM pegawai WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO pegawai (nama_lengkap, email, password, role, departemen_id) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [nama_lengkap, email, hashedPassword, role, departemen_id || null]);

    res.status(201).json({ message: 'Pegawai baru berhasil dibuat' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Admin mengupdate data pegawai
// @route   PUT /api/admin/pegawai/:id
// @access  Private/Admin
const updatePegawai = async (req, res) => {
  const { id } = req.params;
  const { nama_lengkap, email, role } = req.body;

  if (!nama_lengkap || !email || !role) {
    return res.status(400).json({ message: 'Nama, email, dan role harus diisi' });
  }

  try {
    const query = 'UPDATE pegawai SET nama_lengkap = ?, email = ?, role = ? WHERE id = ?';
    await db.query(query, [nama_lengkap, email, role, id]);
    res.status(200).json({ message: 'Data pegawai berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Admin menghapus data pegawai
// @route   DELETE /api/admin/pegawai/:id
// @access  Private/Admin
const deletePegawai = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM pegawai WHERE id = ?', [id]);
    res.status(200).json({ message: 'Pegawai berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllPresensi,
  getAllPegawai,
  createPegawai,
  updatePegawai,
  deletePegawai,
};
