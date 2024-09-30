import React from "react";
import { CustomerContext } from "@/CustomerContext";

const FormSummary = ({ totalCompras }) => {
  const { metaBrinde } = React.useContext(CustomerContext);

  let saldoRestante = metaBrinde - totalCompras;
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
