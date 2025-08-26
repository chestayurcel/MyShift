const db = require('../config/db');

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

const getAllPegawai = async (req, res) => {
  try {
    // Ambil semua data pegawai kecuali password mereka
    const [pegawai] = await db.query(
      'SELECT id, nama_lengkap, email, role, created_at FROM pegawai'
    );
    res.status(200).json(pegawai);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllPresensi,
  getAllPegawai, // <-- Tambahkan fungsi baru
};