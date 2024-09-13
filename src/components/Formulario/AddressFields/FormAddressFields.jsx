import React from "react";
import FormInput from "../InputFields/FormInput";

const FormAddressFields = ({
  cep,
  handleCepBlur,
  cidade,
  setCidade,
  uf,
  setUf,
}) => {
  return (
    <>
      <FormInput
        type='text'
        name='cep'
        title='CEP'
        placeholder='99999-999'
        error={cep.error}
        onChange={cep.onChange}
        onBlur={handleCepBlur}
        value={cep.value}
      />
      <FormInput
        type='text'
        name='cidade'
        title='Cidade'
        placeholder='Cidade'
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />
      <FormInput
        type='text'
        name='uf'
        title='UF'
        placeholder='UF'
        value={uf}
        onChange={(e) => setUf(e.target.value)}
      />
    </>
  );
};

export default FormAddressFields;
