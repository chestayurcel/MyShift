const express = require('express');
const router = express.Router();
const { 
  createDepartemen, 
  getAllDepartemen, 
  updateDepartemen, 
  deleteDepartemen 
} = require('../controllers/departemenController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Semua rute di bawah ini akan diproteksi dan hanya bisa diakses oleh admin
router.route('/')
  .post(protect, isAdmin, createDepartemen)
  .get(protect, isAdmin, getAllDepartemen);

router.route('/:id')
  .put(protect, isAdmin, updateDepartemen)
  .delete(protect, isAdmin, deleteDepartemen);

module.exports = router;