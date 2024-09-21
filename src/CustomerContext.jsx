import React from 'react';
import { COMPRAS_GET, CUSTOMERS_GET } from './services/api';
import { useNavigate } from 'react-router-dom';

export const CustomerContext = React.createContext();

export const CustomerStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [purchases, setPurchases] = React.useState([]);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const customerLogout = React.useCallback(async function () {
    setData(null);
    setPurchases([]);
    setError(null);
    setLoading(false);
    setLogin(false);
  }, []);

  async function customerLogin(cpfecnpj) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = CUSTOMERS_GET(cpfecnpj);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const json = await response.json();

      setData(json);
      setLogin(true);
      customerPurchases(json.id);
      navigate('/cadastro/compra');
    } catch (err) {
      console.log('Erro no customerLogin:', err.message);
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function customerPurchases(customerId) {
    try {
      setLoading(true);
      const { url, options } = COMPRAS_GET(customerId);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const json = await response.json();
      setPurchases(json.results);
    } catch (err) {
      console.log('Erro ao buscar compras:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CustomerContext.Provider
      value={{
        customerLogin,
        customerLogout,
        data,
        purchases,
        error,
        loading,
        login,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
