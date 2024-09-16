import React from 'react';
import Title from '../Title/Title';
import Formulario from '../Formulario/Formulario';

const CadastroCustomer = () => {
  return (
    <>
      <Title
        title="Cadastrar Compra"
        paragraph="1. Digite seus dados pessoais"
      />
      <div className="flex mt-3 justify-center items-center overflow-x-hidden">
        <div className="w-full p-4">
          <Formulario />
        </div>
      </div>
    </>
  );
};

export default CadastroCustomer;
