const db = require('../config/db');
const logger = require('../config/logger');

// @desc    Pegawai mengajukan izin baru
// @route   POST /api/perizinan
// @access  Private (Pegawai)
const ajukanIzin = async (req, res) => {
  const pegawai_id = req.user.id;
  const { jenis_izin, tanggal_mulai, tanggal_selesai, keterangan } = req.body;

  // Pastikan file diunggah
  if (!req.file) {
    return res.status(400).json({ message: 'File surat izin wajib diunggah' });
  }

  const file_surat = req.file.filename; // Ambil nama file dari multer

  if (!jenis_izin || !tanggal_mulai || !tanggal_selesai || !keterangan) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }
  try {
    const query = 'INSERT INTO perizinan (pegawai_id, jenis_izin, tanggal_mulai, tanggal_selesai, keterangan, file_surat) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(query, [pegawai_id, jenis_izin, tanggal_mulai, tanggal_selesai, keterangan, file_surat]);
    
    logger.info(`Pengajuan izin baru oleh pegawai ID: ${pegawai_id}`);
    res.status(201).json({ message: 'Pengajuan izin berhasil dikirim' });
  } catch (error) {
    logger.error(`Error saat ajukanIzin oleh pegawai ID ${pegawai_id}: ${error.message}`);
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
    logger.error(`Error getRiwayatIzinPegawai untuk ID ${pegawai_id}: ${error.message}`);
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Admin mendapatkan semua data perizinan
// @route   GET /api/perizinan/admin/semua
// @access  Private/Admin
const getAllPerizinanAdmin = async (req, res) => {
  try {
    // Query ini sudah mencakup join dengan tabel departemen
    const query = `
      SELECT 
        p.id, 
        p.jenis_izin, 
        p.tanggal_mulai, 
        p.tanggal_selesai, 
        p.keterangan, 
        p.status, 
        p.file_surat,
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
    logger.error(`Error getAllPerizinanAdmin: ${error.message}`);
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
  const admin_id = req.user.id;

  if (!status || !['diterima', 'ditolak'].includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid' });
  }
  try {
    const query = 'UPDATE perizinan SET status = ?, disetujui_oleh = ? WHERE id = ?';
    await db.query(query, [status, admin_id, id]);
    
    logger.info(`Admin ID ${admin_id} mengubah status izin ID ${id} menjadi ${status}`);
    res.status(200).json({ message: 'Status pengajuan berhasil diperbarui' });
  } catch (error) {
    logger.error(`Error updateStatusIzinAdmin untuk izin ID ${id}: ${error.message}`);
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