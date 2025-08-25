const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middleware/authMiddleware.js');

const { getAllPresensi } = require('../controllers/adminController.js');

// @route   GET /api/admin/presensi/semua
// Rute ini dilindungi oleh DUA middleware:
// 1. 'protect' memastikan user sudah login.
// 2. 'isAdmin' memastikan user yang login adalah admin.
router.get('/presensi/semua', protect, isAdmin, getAllPresensi);

module.exports = router;