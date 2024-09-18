import React from "react";
import FormRadioGroup from "./FormRadioGroup";

const FormRadio = ({
  selectedValue,
  setSelectedValue,
  additionalInputValue,
  setAdditionalInputValue,
}) => {
  return (
    <>
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
          value: additionalInputValue.text,
        }}
        onAdditionalInputChange={setAdditionalInputValue}
      />
    </>
  );
};

export default FormRadio;
