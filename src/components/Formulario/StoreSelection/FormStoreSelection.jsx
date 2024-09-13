import React from "react";
import FormSelect from "../../shared/FormSelect";
import FormRadioGroup from "./FormRadioGroup";

const FormStoreSelection = ({
  selectedStore,
  setSelectedStore,
  selectedValue,
  setSelectedValue,
  additionalInputValue,
  setAdditionalInputValue,
}) => {
  return (
    <>
      <FormSelect
        label='Selecione uma loja'
        options={["Artefato", "Brentwood", "BK", "WTC"]}
        placeholder='Escolha uma loja'
        value={selectedStore}
        onChange={setSelectedStore}
      />
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

export default FormStoreSelection;
