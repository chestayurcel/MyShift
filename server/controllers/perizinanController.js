const db = require('../config/db');

// @desc    Pegawai mengajukan izin baru
// @route   POST /api/perizinan
// @access  Private (Pegawai)
const ajukanIzin = async (req, res) => {
  const pegawai_id = req.user.id;
  const { jenis_izin, tanggal_mulai, tanggal_selesai, keterangan } = req.body;

  if (!jenis_izin || !tanggal_mulai || !tanggal_selesai || !keterangan) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }
  try {
    const query = 'INSERT INTO perizinan (pegawai_id, jenis_izin, tanggal_mulai, tanggal_selesai, keterangan) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [pegawai_id, jenis_izin, tanggal_mulai, tanggal_selesai, keterangan]);
    res.status(201).json({ message: 'Pengajuan izin berhasil dikirim' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Pegawai mendapatkan riwayat perizinannya
// @route   GET /api/perizinan/riwayat
// @access  Private (Pegawai)
const getRiwayatIzinPegawai = async (req, res) => {
  const pegawai_id = req.user.id;
  try {
    const query = 'SELECT * FROM perizinan WHERE pegawai_id = ? ORDER BY created_at DESC';
    const [riwayat] = await db.query(query, [pegawai_id]);
    res.status(200).json(riwayat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Admin mendapatkan semua data perizinan
// @route   GET /api/perizinan/admin/semua
// @access  Private/Admin
const getAllPerizinanAdmin = async (req, res) => {
  try {
    // Query ini diubah untuk menggabungkan data dari 3 tabel
    const query = `
      SELECT 
        p.id, 
        p.jenis_izin, 
        p.tanggal_mulai, 
        p.tanggal_selesai, 
        p.keterangan, 
        p.status, 
        pg.nama_lengkap, 
        d.nama_departemen 
      FROM perizinan p
      JOIN pegawai pg ON p.pegawai_id = pg.id
      LEFT JOIN departemen d ON pg.departemen_id = d.id
      ORDER BY p.created_at DESC
    `;
    const [perizinan] = await db.query(query);
    res.status(200).json(perizinan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Admin mengupdate status perizinan
// @route   PUT /api/perizinan/admin/:id/status
// @access  Private/Admin
const updateStatusIzinAdmin = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const admin_id = req.user.id; // Mencatat admin yang menyetujui

  if (!status || !['diterima', 'ditolak'].includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid' });
  }
  try {
    const query = 'UPDATE perizinan SET status = ?, disetujui_oleh = ? WHERE id = ?';
    await db.query(query, [status, admin_id, id]);
    res.status(200).json({ message: 'Status pengajuan berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  ajukanIzin,
  getRiwayatIzinPegawai,
  getAllPerizinanAdmin,
  updateStatusIzinAdmin,
};