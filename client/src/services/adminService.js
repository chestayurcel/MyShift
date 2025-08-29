import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/';

// Fungsi bantuan untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

// Fungsi bantuan untuk membuat header Authorization
const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

// Mengambil semua data pegawai
const getAllPegawai = () => {
  return axios.get(API_URL + 'pegawai', getAuthHeader());
};

// Mengambil data satu pegawai berdasarkan ID
const getById = (id) => {
  return axios.get(API_URL + 'pegawai/' + id, getAuthHeader());
};

// Membuat data pegawai baru
const createPegawai = (data) => {
  return axios.post(API_URL + 'pegawai', data, getAuthHeader());
};

// Mengupdate data pegawai berdasarkan ID
const update = (id, data) => {
  return axios.put(API_URL + 'pegawai/' + id, data, getAuthHeader());
};

// Menghapus data pegawai berdasarkan ID
const deletePegawai = (id) => {
  return axios.delete(API_URL + 'pegawai/' + id, getAuthHeader());
};


const adminService = {
  getAllPegawai,
  getById,
  createPegawai,
  update,
  deletePegawai,
};

export default adminService;
