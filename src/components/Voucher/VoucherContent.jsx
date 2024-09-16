import React from 'react';

const InvoiceContent = ({ invoice, customer }) => {
  return (
    <div>
      <h1>VOUCHER PARA TROCA</h1>
      <p>Emitido em {invoice.data}</p>
      <hr />
      <div className="section">
        <p>
          <strong>Dados Pessoais:</strong>
        </p>
        <p>CPF/CNPJ: {customer.cpf}</p>
        <p>Nome: {customer.name}</p>
        <p>E-mail: {customer.email}</p>
      </div>
      <hr />
      <div className="section">
        <p>
          <strong>Dados da Compra:</strong>
        </p>
        <p>Loja: {invoice.loja}</p>
        <p>Número do pedido / NF: {invoice.nf}</p>
        <p>Valor da Nf: R$ {invoice.valor.toFixed(2)}</p>
      </div>
      <hr />
      <p>
        <strong>Valor total: R$ {invoice.valor.toFixed(2)}</strong>
      </p>
      <p>Procure o espaço concierge e informe este</p>
      <div className="center">
        <p>CÓDIGO DE CONFIRMAÇÃO</p>
        <p>{invoice.id}</p>
      </div>
    </div>
  );
};

export default InvoiceContent;
