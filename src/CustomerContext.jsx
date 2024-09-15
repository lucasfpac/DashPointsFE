import React from 'react';
import { TOKEN_POST, CUSTOMERS_GET } from './services/api';
import { useNavigate } from 'react-router-dom';

export const CustomerContext = React.createContext();

export const CustomerStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const customerLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  async function getCustomer(token) {
    window.localStorage.removeItem('token');
    console.log('getCustomer chamado com token:', token);
    const { url, options } = CUSTOMERS_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    setData(json);
    setLogin(true);
  }

  async function customerLogin(cpfecnpj) {
    window.localStorage.removeItem('token');
    console.log('customerLogin chamado com cpfecnpj:', cpfecnpj);
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ cpfecnpj });
      console.log('Fazendo requisição para TOKEN_POST:', url);
      const tokenRes = await fetch(url, options);
      console.log('Resposta da requisição TOKEN_POST:', tokenRes);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      console.log('Token recebido:', token);
      window.localStorage.setItem('token', token);
      await getCustomer(token);
      console.log('Redirecionando para /cadastro/compra');
      navigate('/cadastro/compra');
    } catch (err) {
      console.log('Erro no customerLogin:', err.message);
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CustomerContext.Provider
      value={{ customerLogin, customerLogout, data, error, loading, login }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
