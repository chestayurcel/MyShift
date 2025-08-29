import axios from 'axios';

const API_URL = 'http://localhost:5000/api/perizinan/';

const getToken = () => {
  return localStorage.getItem('userToken');
};

const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

// Pegawai mengajukan izin baru
const ajukanIzin = (data) => {
  return axios.post(API_URL, data, getAuthHeader());
};

// Pegawai melihat riwayat izinnya
const getRiwayatIzin = () => {
  return axios.get(API_URL + 'riwayat', getAuthHeader());
};

// Admin melihat semua pengajuan
const getAllIzinForAdmin = () => {
    return axios.get(API_URL + 'admin/semua', getAuthHeader());
};

// Admin mengupdate status izin
const updateStatusIzin = (id, status) => {
    return axios.put(API_URL + `admin/${id}/status`, { status }, getAuthHeader());
};

const perizinanService = {
  ajukanIzin,
  getRiwayatIzin,
  getAllIzinForAdmin,
  updateStatusIzin,
};

export default perizinanService;