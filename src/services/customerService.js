import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getCustomers = () => {
  return axios.get(`${API_URL}/customers/`);
};
