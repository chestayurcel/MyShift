import axios from 'axios';

const API_URL = 'http://localhost:5000/api/departemen/';

const getToken = () => {
  return localStorage.getItem('userToken');
};

const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
};

const getAll = () => {
  return axios.get(API_URL, getAuthHeader());
};

const create = (data) => {
  return axios.post(API_URL, data, getAuthHeader());
};

const update = (id, data) => {
  return axios.put(API_URL + id, data, getAuthHeader());
};

const remove = (id) => {
  return axios.delete(API_URL + id, getAuthHeader());
};

const departemenService = {
  getAll,
  create,
  update,
  remove,
};

export default departemenService;