import React from "react";

const FormSummary = ({ totalCompras }) => {
  const META_BRINDE = 20000;

  let saldoRestante = META_BRINDE - totalCompras;
  if (saldoRestante < 0) {
    saldoRestante = 0;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className='grid justify-center items-center mt-10'>
      <p className='font-bold'>
        SUAS NOTAS SOMAM: <span>{formatCurrency(totalCompras)}</span>
      </p>
      <p className='font-bold'>
        FALTAM: <span>{formatCurrency(saldoRestante)}</span> PARA CONQUISTAR SEU
        BRINDE
      </p>
    </div>
  );
};

export default FormSummary;
