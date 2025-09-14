import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/presensi`;

const getToken = () => {
  return localStorage.getItem('userToken');
};

const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

const clockIn = () => {
  return axios.post(`${API_BASE_URL}/clockin`, {}, getAuthHeader());
};

const clockOut = () => {
  return axios.post(`${API_BASE_URL}/clockout`, {}, getAuthHeader());
};

const getRiwayat = () => {
  return axios.get(`${API_BASE_URL}/riwayat`, getAuthHeader());
};


const presensiService = {
  clockIn,
  clockOut,
  getRiwayat,
};

export default presensiService;