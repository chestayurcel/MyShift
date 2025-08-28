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
// @route   GET /api/departemen
// @access  Private/Admin
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

module.exports = {
  createDepartemen,
  getAllDepartemen,
  updateDepartemen,
  deleteDepartemen,
};