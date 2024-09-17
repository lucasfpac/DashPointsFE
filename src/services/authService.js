import axios from 'axios';

const API_URL = 'https://lucasfortunato.com.br/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      username,
      password
    });

    const { access, refresh } = response.data;

    // Armazena os tokens no localStorage
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login', error);
    throw new Error(error.response ? error.response.data.detail : 'Erro ao fazer login');
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('Nenhum refresh token encontrado');
  }

  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken
    });

    const { access } = response.data;
    
    // Atualiza o access token no localStorage
    localStorage.setItem('access_token', access);

    return access;
  } catch (error) {
    console.error('Erro ao atualizar o token', error);
    throw new Error('Erro ao atualizar o token');
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};


export const getUsers = () => {
  return axios.get(`${API_URL}/users/`);
};
