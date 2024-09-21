import React from 'react';
import FormInput from '../InputFields/FormInput';

const FormPurchaseDetails = ({ nf, valor }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <FormInput
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm mt-4"
        type="number"
        id="nf"
        title="Número do Pedido / NF"
        {...nf}
      />
      <FormInput
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm mt-4"
        type="text"
        id="valor"
        title="Valor"
        {...valor}
      />
    </div>
  );
};

export default FormPurchaseDetails;
