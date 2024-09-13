import React from "react";
import FormInput from "./FormInput";

const FormInputFields = ({ cpfecnpj, nome, email, celular }) => {
  return (
    <>
      <FormInput
        type='text'
        name='cpfecnpj'
        title='CPF/CNPJ'
        placeholder='XXX.XXX.XXX-XX OU XX.XXX.XXX/0001-XX'
        error={cpfecnpj.error}
        onChange={cpfecnpj.onChange}
        onBlur={cpfecnpj.onBlur}
        value={cpfecnpj.value}
      />
      <FormInput
        type='text'
        name='nome'
        title='Nome'
        placeholder='Seu nome completo'
        error={nome.error}
        onChange={nome.onChange}
        onBlur={nome.onBlur}
        value={nome.value}
      />
      <FormInput
        type='email'
        name='email'
        title='Email'
        placeholder='email@example.com'
        error={email.error}
        onChange={email.onChange}
        onBlur={email.onBlur}
        value={email.value}
      />
      <FormInput
        type='number'
        name='celular'
        title='Celular'
        placeholder='(XX) XXXXX-XXXX'
        error={celular.error}
        onChange={celular.onChange}
        onBlur={celular.onBlur}
        value={celular.value}
      />
    </>
  );
};

export default FormInputFields;
