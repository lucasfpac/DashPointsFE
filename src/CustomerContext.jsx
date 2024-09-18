import React from "react";
import { CUSTOMERS_GET } from "./services/api";
import { useNavigate } from "react-router-dom";

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
      navigate("/cadastro/compra");
    } catch (err) {
      console.log("Erro no customerLogin:", err.message);
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
