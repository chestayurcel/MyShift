const db = require('../config/db');

// @desc    Membuat departemen baru
// @route   POST /api/departemen
// @access  Private/Admin
const createDepartemen = async (req, res) => {
  const { nama_departemen } = req.body;
  if (!nama_departemen) {
    return res.status(400).json({ message: 'Nama departemen harus diisi' });
  }
  try {
    const query = 'INSERT INTO departemen (nama_departemen) VALUES (?)';
    await db.query(query, [nama_departemen]);
    res.status(201).json({ message: 'Departemen berhasil dibuat' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Mendapatkan semua departemen
// @route   GET /api/departemen atau GET /api/departemen/public
// @access  Private/Admin atau Public
const getAllDepartemen = async (req, res) => {
  try {
    const [departemen] = await db.query('SELECT * FROM departemen ORDER BY nama_departemen ASC');
    res.status(200).json(departemen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Mengupdate departemen
// @route   PUT /api/departemen/:id
// @access  Private/Admin
const updateDepartemen = async (req, res) => {
  const { id } = req.params;
  const { nama_departemen } = req.body;
  if (!nama_departemen) {
    return res.status(400).json({ message: 'Nama departemen harus diisi' });
  }
  try {
    const query = 'UPDATE departemen SET nama_departemen = ? WHERE id = ?';
    await db.query(query, [nama_departemen, id]);
    res.status(200).json({ message: 'Departemen berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Menghapus departemen
// @route   DELETE /api/departemen/:id
// @access  Private/Admin
const deleteDepartemen = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM departemen WHERE id = ?', [id]);
    res.status(200).json({ message: 'Departemen berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Mendapatkan detail satu departemen
// @route   GET /api/departemen/details/:id
// @access  Private/Admin
const getDepartemenById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM departemen WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Departemen tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Mendapatkan semua pegawai dalam satu departemen
// @route   GET /api/departemen/:id/pegawai
// @access  Private/Admin
const getPegawaiByDepartemen = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT id, nama_lengkap, email, role FROM pegawai WHERE departemen_id = ?';
    const [pegawai] = await db.query(query, [id]);
    res.status(200).json(pegawai);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Mendapatkan riwayat presensi dari satu departemen
// @route   GET /api/departemen/:id/presensi
// @access  Private/Admin
const getPresensiByDepartemen = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT pg.nama_lengkap, p.tanggal, p.jam_masuk, p.jam_keluar, p.status
      FROM presensi p
      JOIN pegawai pg ON p.pegawai_id = pg.id
      WHERE pg.departemen_id = ?
      ORDER BY p.tanggal DESC, p.jam_masuk DESC
    `;
    const [presensi] = await db.query(query, [id]);
    res.status(200).json(presensi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  createDepartemen,
  getAllDepartemen,
  updateDepartemen,
  deleteDepartemen,
  getDepartemenById,
  getPegawaiByDepartemen,
  getPresensiByDepartemen,
};
