import React, { useEffect } from "react";
import FormSelect from "../../shared/FormSelect";
import useFetch from "../../Hooks/useFetch";
import { STORES_GET } from "../../../services/api";

const FormStoreSelect = ({ selectedStore, setSelectedStore }) => {
  const { data: stores, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchStores = async () => {
      const { url, options } = STORES_GET();
      await request(url, options);
    };

    fetchStores();
  }, [request]);

  return (
    <>
      {loading && <p>Carregando lojas...</p>}
      {error && <p>Erro ao carregar lojas: {error}</p>}
      {!loading && stores && (
        <FormSelect
          label='Selecione uma loja'
          options={stores.results.map((store) => store.name)}
          placeholder='Escolha uma loja'
          value={selectedStore}
          onChange={setSelectedStore}
        />
      )}
    </>
  );
};

export default FormStoreSelect;
