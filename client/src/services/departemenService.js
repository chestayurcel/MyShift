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

// Mengambil semua departemen (memerlukan login admin)
const getAll = () => {
  return axios.get(API_URL, getAuthHeader());
};

// Mengambil semua departemen (tidak memerlukan login)
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

// Mengambil detail satu departemen
const getById = (id) => {
  return axios.get(API_URL + id + '/details', getAuthHeader());
};

// Mengambil pegawai dalam satu departemen
const getPegawaiByDepartemen = (id) => {
  return axios.get(API_URL + id + '/pegawai', getAuthHeader());
};

// Mengambil presensi dalam satu departemen
const getPresensiByDepartemen = (id) => {
  return axios.get(API_URL + id + '/presensi', getAuthHeader());
};

const departemenService = {
  getAll,
  getPublicAll,
  create,
  update,
  remove,
  getById,
  getPegawaiByDepartemen,
  getPresensiByDepartemen,
};

export default departemenService;
