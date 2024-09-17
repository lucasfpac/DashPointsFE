import axios from 'axios';

const API_URL = 'https://lucasfortunato.com.br/api';

export const getStores = () => {
  return axios.get(`${API_URL}/stores/`);
};
