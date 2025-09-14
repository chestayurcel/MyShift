import axios from 'axios';

// Menggunakan variabel global dari file .env
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/admin`;

// Fungsi bantuan untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

// Fungsi bantuan untuk membuat header Authorization
const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

// Mengambil semua data riwayat presensi
const getAllPresensi = () => {
  return axios.get(`${API_BASE_URL}/presensi/semua`, getAuthHeader());
};

// Mengambil semua data pegawai
const getAllPegawai = () => {
  return axios.get(`${API_BASE_URL}/pegawai`, getAuthHeader());
};

// Menghapus data pegawai berdasarkan ID
const deletePegawai = (id) => {
  return axios.delete(`${API_BASE_URL}/pegawai/${id}`, getAuthHeader());
};

// Membuat data pegawai baru
const createPegawai = (data) => {
  return axios.post(`${API_BASE_URL}/pegawai`, data, getAuthHeader());
};

// Mengambil data satu pegawai berdasarkan ID
const getPegawaiById = (id) => {
  return axios.get(`${API_BASE_URL}/pegawai/${id}`, getAuthHeader());
};

// Mengupdate data pegawai
const updatePegawai = (id, data) => {
  return axios.put(`${API_BASE_URL}/pegawai/${id}`, data, getAuthHeader());
};


const adminService = {
  getAllPresensi,
  getAllPegawai,
  deletePegawai,
  createPegawai,
  getPegawaiById,
  updatePegawai,
};

export default adminService;
