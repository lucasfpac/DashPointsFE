import React from 'react';

const FormSummary = ({ totalCompras }) => {
  const META_BRINDE = 20000;

  const saldoRestante = META_BRINDE - totalCompras;

  return (
    <div className="grid justify-center items-center mt-10">
      <p className="font-bold">
        SUAS NOTAS SOMAM:{' '}
        <span>
          {totalCompras.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </p>
      <p className="font-bold">
        FALTAM:{' '}
        <span>
          {saldoRestante.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>{' '}
        PARA CONQUISTAR SEU BRINDE
      </p>
    </div>
  );
};

export default FormSummary;
