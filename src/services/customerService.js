import axios from 'axios';

const API_URL = 'https://lucasfortunato.com.br/api';

export const getCustomers = () => {
  return axios.get(`${API_URL}/customers/`);
};

// Função para cadastrar um cliente
export const registerCustomer = async (customerData) => {
  try {
    const response = await axios.post('https://lucasfortunato.com.br/api/customers/', customerData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar cliente', error);
    throw error;
  }
};
