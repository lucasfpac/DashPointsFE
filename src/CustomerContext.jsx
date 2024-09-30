import React from "react";
import {
  PURCHASES_GET,
  CUSTOMERS_GET,
  STORES_GET,
  EVENTS_GET,
} from "./services/api";
import { useNavigate } from "react-router-dom";

export const CustomerContext = React.createContext();

export const CustomerStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [purchases, setPurchases] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [metaBrinde, setMetaBrinde] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [hasActiveEvent, setHasActiveEvent] = React.useState(false);
  const [activeEventId, setActiveEventId] = React.useState(null);
  const navigate = useNavigate();

  const today = new Date();
  const customerLogout = React.useCallback(async function () {
    setData(null);
    setPurchases([]);
    setStores([]);
    setError(null);
    setLoading(false);
    setLogin(false);
  }, []);

  async function fetchStores() {
    try {
      const { url, options } = STORES_GET();
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const json = await response.json();
      setStores(json.results);
    } catch (err) {
      console.log("Erro ao buscar lojas:", err.message);
      setError(err.message);
    }
  }

  async function fetchActiveEvent() {
    try {
      const { url, options } = EVENTS_GET();
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const { results } = await response.json();

      const activeEvent = results.find((event) => {
        const startDate = new Date(event.start_date);
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(event.end_date);
        endDate.setDate(endDate.getDate() + 1);
        return today >= startDate && today <= endDate;
      });

      if (activeEvent) {
        setMetaBrinde(Number(activeEvent.voucher_value));
        setHasActiveEvent(true);
        setActiveEventId(activeEvent.id);
        return activeEvent.id;
      } else {
        setMetaBrinde(0);
        setHasActiveEvent(false);
        setActiveEventId(null);
        return null;
      }
    } catch (err) {
      console.log("Erro ao buscar eventos:", err.message);
      setMetaBrinde(0);
      setHasActiveEvent(false);
      setActiveEventId(null);
      return null;
    }
  }

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
      await customerPurchases(json.id);
      navigate("/cadastro/compra");
    } catch (err) {
      console.log("Erro no customerLogin:", err.message);
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function customerPurchases(customerId) {
    try {
      setLoading(true);
      const { url, options } = PURCHASES_GET(customerId);
      const response = await fetch(url, options);
      if (response.status === 404) {
        setPurchases([]);
        return;
      }
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const json = await response.json();
      setPurchases(json);
    } catch (err) {
      console.log("Erro ao buscar compras:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchStores();
    fetchActiveEvent();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customerLogin,
        customerLogout,
        customerPurchases,
        fetchActiveEvent,
        hasActiveEvent,
        activeEventId,
        today,
        metaBrinde,
        data,
        purchases,
        stores,
        loading,
        error,
        login,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
