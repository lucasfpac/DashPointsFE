import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getPoints = () => {
  return axios.get(`${API_URL}/points/`);
};

export const addPoint = (pointData) => {
  return axios.post(`${API_URL}/points/`, pointData);
};
