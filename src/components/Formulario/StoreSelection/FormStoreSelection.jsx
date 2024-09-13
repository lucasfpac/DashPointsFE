import React, { useEffect } from "react";
import FormSelect from "../../shared/FormSelect";
import useFetch from "../../hooks/useFetch";
import { STORES_GET } from "../../services/api";

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
    <div className='my-4 w-full'>
      {loading && <p>Loading stores...</p>}
      {error && <p>Error loading stores: {error}</p>}
      {!loading && stores && (
        <FormSelect
          label='Selecione uma loja'
          options={stores.map((store) => store.name)}
          placeholder='Selecione a loja'
          value={selectedStore}
          onChange={setSelectedStore}
        />
      )}
    </div>
  );
};

export default FormStoreSelect;
