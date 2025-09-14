import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/departemen`;

const getToken = () => {
  return localStorage.getItem('userToken');
};

const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

// Rute Publik (tanpa /api/departemen lagi)
const getPublicAll = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/departemen/public`);
};

const getAll = () => {
  return axios.get(API_BASE_URL, getAuthHeader());
};

const create = (data) => {
  return axios.post(API_BASE_URL, data, getAuthHeader());
};

const update = (id, data) => {
  return axios.put(`${API_BASE_URL}/${id}`, data, getAuthHeader());
};

const remove = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`, getAuthHeader());
};

const getDetails = (id) => {
  return axios.get(`${API_BASE_URL}/details/${id}`, getAuthHeader());
};

const getPegawaiInDepartemen = (id) => {
  return axios.get(`${API_BASE_URL}/${id}/pegawai`, getAuthHeader());
};

const getPresensiInDepartemen = (id) => {
  return axios.get(`${API_BASE_URL}/${id}/presensi`, getAuthHeader());
};


const departemenService = {
  getPublicAll,
  getAll,
  create,
  update,
  remove,
  getDetails,
  getPegawaiInDepartemen,
  getPresensiInDepartemen,
};

export default departemenService;