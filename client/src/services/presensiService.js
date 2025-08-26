import axios from 'axios';

const API_URL = 'http://localhost:5000/api/presensi/';

// Fungsi untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

// Fungsi untuk membuat header Authorization
const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

const clockIn = () => {
  return axios.post(API_URL + 'clockin', {}, getAuthHeader());
};

const clockOut = () => {
  return axios.post(API_URL + 'clockout', {}, getAuthHeader());
};

const getRiwayat = () => {
  return axios.get(API_URL + 'riwayat', getAuthHeader());
};

const presensiService = {
  clockIn,
  clockOut,
  getRiwayat,
};

export default presensiService;