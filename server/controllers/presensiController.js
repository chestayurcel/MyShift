const db = require('../config/db');

// Fungsi bantuan untuk mendapatkan tanggal hari ini (YYYY-MM-DD)
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// ======================================================================
// FUNGSI BANTUAN BARU UNTUK FORMAT WAKTU (HH:MM:SS)
// ======================================================================
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// @desc    Mencatat waktu masuk (Clock In)
// @route   POST /api/presensi/clockin
// @access  Private
const clockIn = async (req, res) => {
  const pegawai_id = req.user.id;
  const tanggal = getTodayDate();
  const jam_masuk = getCurrentTime(); // <-- DIGANTI

  try {
    const [existing] = await db.query(
      'SELECT id FROM presensi WHERE pegawai_id = ? AND tanggal = ?',
      [pegawai_id, tanggal]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Anda sudah melakukan clock-in hari ini.' });
    }

    const query = 'INSERT INTO presensi (pegawai_id, tanggal, jam_masuk) VALUES (?, ?, ?)';
    await db.query(query, [pegawai_id, tanggal, jam_masuk]);

    res.status(201).json({ message: 'Clock-in berhasil dicatat.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Mencatat waktu keluar (Clock Out)
// @route   POST /api/presensi/clockout
// @access  Private
const clockOut = async (req, res) => {
  const pegawai_id = req.user.id;
  const tanggal = getTodayDate();
  const jam_keluar = getCurrentTime(); // <-- DIGANTI

  try {
    const [rows] = await db.query(
      'SELECT id FROM presensi WHERE pegawai_id = ? AND tanggal = ? AND jam_keluar IS NULL',
      [pegawai_id, tanggal]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Anda belum melakukan clock-in atau sudah clock-out hari ini.' });
    }

    const presensiId = rows[0].id;
    const query = 'UPDATE presensi SET jam_keluar = ? WHERE id = ?';
    await db.query(query, [jam_keluar, presensiId]);

    res.status(200).json({ message: 'Clock-out berhasil dicatat.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// @desc    Mendapatkan riwayat presensi user
// @route   GET /api/presensi/riwayat
// @access  Private
const getRiwayatPresensi = async (req, res) => {
  const pegawai_id = req.user.id;
  try {
    const [history] = await db.query(
        'SELECT tanggal, jam_masuk, jam_keluar, status FROM presensi WHERE pegawai_id = ? ORDER BY tanggal DESC',
        [pegawai_id]
    );
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  clockIn,
  clockOut,
  getRiwayatPresensi,
};