import React from "react";
import FormRadioGroup from "./FormRadioGroup";

const FormRadio = ({
  selectedValue,
  setSelectedValue,
  additionalInputValue,
  setAdditionalInputValue,
}) => {
  React.useEffect(() => {
    if (selectedValue === "nao") {
      setAdditionalInputValue("");
    }
  }, [selectedValue, setAdditionalInputValue]);

  return (
    <>
      <FormRadioGroup
        name='stores'
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
        onAdditionalInputChange={(value) => setAdditionalInputValue(value)}
      />
    </>
  );
};

export default FormRadio;
