const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middleware/authMiddleware.js');
    
// Impor semua fungsi dari controller
const { 
  getAllPresensi, 
  getAllPegawai,
  createPegawai,
  updatePegawai,
  deletePegawai
} = require('../controllers/adminController.js');

// Rute 'Read' (sudah ada)
router.get('/presensi/semua', protect, isAdmin, getAllPresensi);
router.get('/pegawai', protect, isAdmin, getAllPegawai);

// RUTE BARU UNTUK CREATE, UPDATE, DELETE
router.post('/pegawai', protect, isAdmin, createPegawai);
router.put('/pegawai/:id', protect, isAdmin, updatePegawai);
router.delete('/pegawai/:id', protect, isAdmin, deletePegawai);


module.exports = router;