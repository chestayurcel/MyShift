const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { 
  ajukanIzin,
  getRiwayatIzinPegawai,
  getAllPerizinanAdmin,
  updateStatusIzinAdmin
} = require('../controllers/perizinanController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder tempat menyimpan file
  },
  filename: function (req, file, cb) {
    // Membuat nama file unik untuk menghindari duplikasi
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Mengajukan izin baru (dengan upload file)
router.route('/').post(protect, upload.single('file_surat'), ajukanIzin);

// Mendapatkan riwayat izin pribadi
router.route('/riwayat').get(protect, getRiwayatIzinPegawai);

// Mendapatkan semua pengajuan izin dari semua pegawai
router.route('/admin/semua').get(protect, isAdmin, getAllPerizinanAdmin);

// Mengupdate status pengajuan izin (terima/tolak)
router.route('/admin/:id/status').put(protect, isAdmin, updateStatusIzinAdmin);

module.exports = router;