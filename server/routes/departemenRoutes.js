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
router.get('/public', getAllDepartemen);

// Rute CRUD Departemen (dilindungi)
router.route('/')
  .post(protect, isAdmin, createDepartemen)
  .get(protect, isAdmin, getAllDepartemen);

router.route('/:id')
  .put(protect, isAdmin, updateDepartemen)
  .delete(protect, isAdmin, deleteDepartemen);

// RUTE BARU UNTUK HALAMAN DETAIL (dilindungi)
// Mengubah /:id/details menjadi /details/:id untuk menghindari konflik
router.get('/details/:id', protect, isAdmin, getDepartemenById);
router.get('/:id/pegawai', protect, isAdmin, getPegawaiByDepartemen);
router.get('/:id/presensi', protect, isAdmin, getPresensiByDepartemen);

module.exports = router;
