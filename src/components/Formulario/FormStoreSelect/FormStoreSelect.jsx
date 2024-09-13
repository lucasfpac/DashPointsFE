import React from "react";
import FormSelect from "../../shared/FormSelect";

const FormStoreSelect = ({ selectedStore, setSelectedStore }) => {
  return (
    <div className='my-4 w-full'>
      <FormSelect
        label='Selecione uma loja'
        options={["Artefato", "Brentwood", "BK", "WTC"]}
        placeholder='Selecione a loja'
        value={selectedStore}
        onChange={setSelectedStore}
      />
    </div>
  );
};

export default FormStoreSelect;
