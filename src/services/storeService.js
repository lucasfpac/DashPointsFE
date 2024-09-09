import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getStores = () => {
  return axios.get(`${API_URL}/stores/`);
};
