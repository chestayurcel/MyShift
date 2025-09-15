import axios from 'axios';

// Kembali ke URL localhost
const API_URL = 'http://localhost:5000/api/perizinan/';

const getToken = () => {
  return localStorage.getItem('userToken');
};

const getAuthHeader = (isFormData = false) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`
  };
  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  return { headers };
};

// Mengirim FormData, bukan JSON biasa
const ajukanIzin = (formData) => {
  return axios.post(API_URL, formData, getAuthHeader(true));
};

const getRiwayatIzin = () => {
  return axios.get(API_URL + 'riwayat', getAuthHeader());
};

const getAllIzinForAdmin = () => {
    return axios.get(API_URL + 'admin/semua', getAuthHeader());
};

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