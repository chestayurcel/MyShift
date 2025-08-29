const express = require('express');
const router = express.Router();
const { 
  createDepartemen, 
  getAllDepartemen, 
  updateDepartemen, 
  deleteDepartemen,
  getDepartemenById,
  getPegawaiByDepartemen,
  getPresensiByDepartemen
} = require('../controllers/departemenController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// RUTE PUBLIK - Tidak memerlukan login
// Digunakan untuk mengisi dropdown di halaman registrasi
router.get('/public', getAllDepartemen);

// Rute terproteksi untuk Admin - CRUD Departemen
router.route('/')
  .post(protect, isAdmin, createDepartemen)
  .get(protect, isAdmin, getAllDepartemen);

router.route('/:id')
  .put(protect, isAdmin, updateDepartemen)
  .delete(protect, isAdmin, deleteDepartemen);

// Rute terproteksi untuk Admin - Halaman Detail Departemen
router.get('/:id/details', protect, isAdmin, getDepartemenById);
router.get('/:id/pegawai', protect, isAdmin, getPegawaiByDepartemen);
router.get('/:id/presensi', protect, isAdmin, getPresensiByDepartemen);

module.exports = router;
