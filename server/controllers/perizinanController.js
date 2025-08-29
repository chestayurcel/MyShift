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

    // @desc    Pegawai melihat riwayat pengajuan izinnya
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

    // @desc    Admin melihat semua pengajuan izin
    // @route   GET /api/perizinan/admin/semua
    // @access  Private (Admin)
    const getAllPerizinanAdmin = async (req, res) => {
      try {
        // Query ini menggabungkan tabel perizinan dengan pegawai untuk mendapatkan nama
        const query = `
          SELECT p.*, pg.nama_lengkap 
          FROM perizinan p 
          JOIN pegawai pg ON p.pegawai_id = pg.id 
          ORDER BY p.status = 'menunggu' DESC, p.created_at DESC
        `;
        const [semuaIzin] = await db.query(query);
        res.status(200).json(semuaIzin);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
      }
    };

    // @desc    Admin mengupdate status pengajuan izin (terima/tolak)
    // @route   PUT /api/perizinan/admin/:id/status
    // @access  Private (Admin)
    const updateStatusIzinAdmin = async (req, res) => {
      const admin_id = req.user.id;
      const { id } = req.params; // ID dari pengajuan izin
      const { status } = req.body; // Status baru: 'diterima' atau 'ditolak'

      if (!status || (status !== 'diterima' && status !== 'ditolak')) {
        return res.status(400).json({ message: 'Status tidak valid' });
      }

      try {
        const query = 'UPDATE perizinan SET status = ?, disetujui_oleh = ? WHERE id = ?';
        await db.query(query, [status, admin_id, id]);
        res.status(200).json({ message: `Pengajuan izin berhasil ${status}` });
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
