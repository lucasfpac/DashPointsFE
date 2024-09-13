import React, { useEffect } from "react";
import FormSelect from "../../shared/FormSelect";
import FormRadioGroup from "./FormRadioGroup";
import useFetch from "../../hooks/useFetch";
import { STORES_GET } from "../../services/api";

const FormStoreSelect = ({
  selectedStore,
  setSelectedStore,
  selectedValue,
  setSelectedValue,
  additionalInputValue,
  setAdditionalInputValue,
}) => {
  const { data: stores, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchStores = async () => {
      const { url, options } = STORES_GET(); // Fetch stores from the API
      await request(url, options);
    };

    fetchStores();
  }, [request]);

  return (
    <>
      {loading && <p>Loading stores...</p>}
      {error && <p>Error loading stores: {error}</p>}
      {!loading && stores && (
        <FormSelect
          label='Selecione uma loja'
          options={stores.map((store) => store.name)} // Assuming each store object has a 'name' property
          placeholder='Escolha uma loja'
          value={selectedStore}
          onChange={setSelectedStore}
        />
      )}

      <FormRadioGroup
        label='Sentiu falta de alguma loja?'
        value={selectedValue}
        onChange={setSelectedValue}
        options={[
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
        ]}
        additionalInput={{
          condition: "sim",
          placeholder: "Qual?",
          value: additionalInputValue,
        }}
        onAdditionalInputChange={setAdditionalInputValue}
      />
    </>
  );
};

export default FormStoreSelect;
