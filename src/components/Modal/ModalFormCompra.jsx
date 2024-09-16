import React from 'react';
import FormularioCompra from '../Formulario/FormularioCompra';

const ModalFormCompra = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center w-full">
      <div className="w-full max-w-full md:max-w-4xl p-2">
        <FormularioCompra />
      </div>
    </div>
  );
};

export default ModalFormCompra;
