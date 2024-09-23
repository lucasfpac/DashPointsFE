import React from "react";
import { formatCurrency } from "../Table/CustomerTable";
import { formatCPFOrCNPJ } from "../Hooks/useFormat";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const VoucherContent = ({ purchase, customer }) => {
  if (!purchase || !customer) {
    return <p>Dados não disponíveis.</p>;
  }

  return (
    <div>
      <h1>VOUCHER PARA TROCA</h1>
      <p>Emitido em {formatDate(purchase.date) || "Data não disponível"}</p>
      <hr />
      <div className='section'>
        <p>
          <strong>Dados Pessoais:</strong>
        </p>
        <p>CPF/CNPJ: {formatCPFOrCNPJ(customer.cpf_cnpj)}</p>
        <p>Nome: {customer.full_name}</p>
        <p>E-mail: {customer.email}</p>
      </div>
      <hr />
      <div className='section'>
        <p>
          <strong>Dados da Compra:</strong>
        </p>
        <p>Loja: {purchase.store_name}</p>
        <p>Número do pedido / NF: {purchase.invoice}</p>
        <p>Valor da Nf: {formatCurrency(purchase.value)}</p>
      </div>
      <hr />
      <p>
        <strong>Valor total: {formatCurrency(purchase.value)}</strong>
      </p>
      <p>Procure o espaço concierge e informe este</p>
      <div className='center'>
        <p>CÓDIGO DE CONFIRMAÇÃO</p>
        <p>{purchase.id}</p>
      </div>
    </div>
  );
};

export default VoucherContent;
