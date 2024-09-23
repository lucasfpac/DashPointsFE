import React from "react";
import FormSelect from "../../shared/FormSelect";
import { CustomerContext } from "@/CustomerContext";

const FormStoreSelect = ({ selectedStore, setSelectedStore }) => {
  const { stores, loading, error } = React.useContext(CustomerContext);

  return (
    <>
      {loading && <p>Carregando lojas...</p>}
      {error && <p>Erro ao carregar lojas: {error}</p>}
      {!loading && stores && (
        <FormSelect
          label='Selecione uma loja'
          options={stores.map((store) => ({
            value: store.id.toString(),
            label: store.name,
          }))}
          placeholder='Escolha uma loja'
          value={selectedStore?.toString()}
          onChange={setSelectedStore}
        />
      )}
    </>
  );
};

export default FormStoreSelect;
