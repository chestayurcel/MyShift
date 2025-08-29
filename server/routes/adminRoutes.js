const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middleware/authMiddleware');
    
// Impor semua fungsi dari controller
const { 
  getAllPresensi, 
  getAllPegawai,
  createPegawai,
  updatePegawai,
  deletePegawai,
  getPegawaiById // <-- TAMBAHKAN FUNGSI YANG HILANG DI SINI
} = require('../controllers/adminController.js');

// Rute 'Read'
router.get('/presensi/semua', protect, isAdmin, getAllPresensi);
router.get('/pegawai', protect, isAdmin, getAllPegawai);

// RUTE UNTUK CREATE, UPDATE, DELETE, DAN GET BY ID
router.post('/pegawai', protect, isAdmin, createPegawai);
router.get('/pegawai/:id', protect, isAdmin, getPegawaiById); // <-- Tambahkan rute ini
router.put('/pegawai/:id', protect, isAdmin, updatePegawai);
router.delete('/pegawai/:id', protect, isAdmin, deletePegawai);

module.exports = router;
