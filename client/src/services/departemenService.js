import axios from 'axios';

const API_URL = 'http://localhost:5000/api/departemen/';

// Fungsi bantuan untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

// Fungsi bantuan untuk membuat header Authorization
const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

// Mengambil semua departemen (untuk admin)
const getAll = () => {
  return axios.get(API_URL, getAuthHeader());
};

// Mengambil semua departemen (untuk publik/registrasi)
const getPublicAll = () => {
  return axios.get(API_URL + 'public');
};

// Membuat departemen baru
const create = (data) => {
  return axios.post(API_URL, data, getAuthHeader());
};

// Mengupdate departemen
const update = (id, data) => {
  return axios.put(API_URL + id, data, getAuthHeader());
};

// Menghapus departemen
const remove = (id) => {
  return axios.delete(API_URL + id, getAuthHeader());
};

// ======================================================================
// FUNGSI-FUNGSI BARU UNTUK HALAMAN DETAIL
// ======================================================================

// Mengambil detail satu departemen berdasarkan ID
const getDetails = (id) => {
  // PERBAIKAN DI SINI: Menggunakan rute 'details/:id'
  return axios.get(API_URL + 'details/' + id, getAuthHeader());
};

// Mengambil daftar pegawai dalam satu departemen
const getPegawaiInDepartemen = (id) => {
  return axios.get(API_URL + id + '/pegawai', getAuthHeader());
};

// Mengambil riwayat presensi dalam satu departemen
const getPresensiInDepartemen = (id) => {
  return axios.get(API_URL + id + '/presensi', getAuthHeader());
};


const departemenService = {
  getAll,
  getPublicAll,
  create,
  update,
  remove,
  getDetails,
  getPegawaiInDepartemen,
  getPresensiInDepartemen,
};

export default departemenService;
