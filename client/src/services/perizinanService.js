import axios from 'axios';

// Menggunakan variabel global dari file .env
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/perizinan`;

const getToken = () => {
  return localStorage.getItem('userToken');
};

const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

// Pegawai mengajukan izin baru
const ajukanIzin = (data) => {
  return axios.post(API_BASE_URL, data, getAuthHeader());
};

// Pegawai melihat riwayat izinnya
const getRiwayatIzin = () => {
  return axios.get(`${API_BASE_URL}/riwayat`, getAuthHeader());
};

// Admin melihat semua pengajuan
const getAllIzinForAdmin = () => {
    return axios.get(`${API_BASE_URL}/admin/semua`, getAuthHeader());
};

// Admin mengupdate status izin
const updateStatusIzin = (id, status) => {
    return axios.put(`${API_BASE_URL}/admin/${id}/status`, { status }, getAuthHeader());
};

const perizinanService = {
  ajukanIzin,
  getRiwayatIzin,
  getAllIzinForAdmin,
  updateStatusIzin,
};

export default perizinanService;
