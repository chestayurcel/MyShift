    const express = require('express');
    const router = express.Router();
    const { 
      ajukanIzin,
      getRiwayatIzinPegawai,
      getAllPerizinanAdmin,
      updateStatusIzinAdmin
    } = require('../controllers/perizinanController');
    const { protect, isAdmin } = require('../middleware/authMiddleware');

    // Rute untuk Pegawai
    router.route('/').post(protect, ajukanIzin);
    router.route('/riwayat').get(protect, getRiwayatIzinPegawai);

    // Rute untuk Admin
    router.route('/admin/semua').get(protect, isAdmin, getAllPerizinanAdmin);
    router.route('/admin/:id/status').put(protect, isAdmin, updateStatusIzinAdmin);

    module.exports = router;
    
