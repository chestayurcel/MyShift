const express = require('express');
const router = express.Router();
const { clockIn, clockOut, getRiwayatPresensi } = require('../controllers/presensiController.js');
const { protect } = require('../middleware/authMiddleware.js');

// @route   POST /api/presensi/clockin
router.post('/clockin', protect, clockIn);

// @route   POST /api/presensi/clockout
router.post('/clockout', protect, clockOut);

// @route   GET /api/presensi/riwayat
router.get('/riwayat', protect, getRiwayatPresensi);

module.exports = router;