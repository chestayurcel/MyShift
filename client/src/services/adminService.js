import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/';

// Fungsi untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

// Fungsi untuk membuat header Authorization
const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

const getAllPresensi = () => {
  return axios.get(API_URL + 'presensi/semua', getAuthHeader());
};
const getAllPegawai = () => {
  return axios.get(API_URL + 'pegawai', getAuthHeader());
};
const adminService = {
  getAllPresensi,
  getAllPegawai,
};

export default adminService;