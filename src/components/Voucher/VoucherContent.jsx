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
    <div className='voucher'>
      <div className='voucher-info'>
        <p className='centered-bold'>VOUCHER PARA TROCA</p>
        <p className='centered'>
          Emitido em {formatDate(purchase.date) || "Data não disponível"}
        </p>
      </div>
      <div className='separator'></div>
      <div className='voucher-personal-info'>
        <p className='centered-bold'>Dados Pessoais</p>
        <br />
        <p>
          <strong>CPF/CNPJ:</strong> {formatCPFOrCNPJ(customer.cpf_cnpj)}
        </p>
        <p>
          <strong>Nome:</strong> {customer.full_name}
        </p>
        <p>
          <strong>E-mail:</strong> {customer.email}
        </p>
      </div>
      <div className='separator'></div>
      <div className='voucher-purchase-info'>
        <p className='centered-bold'>Dados da Compra</p>
        <br />
        <p>
          <strong>Loja:</strong> {purchase.store_name}
        </p>
        <p>
          <strong>Número do pedido / NF:</strong> {purchase.invoice}
        </p>
        <p>
          <strong>Valor da NF:</strong> {formatCurrency(purchase.value)}
        </p>
      </div>
      <div className='separator'></div>
      <div className='voucher-footer'>
        <p>
          <strong>Valor Total:</strong> {formatCurrency(purchase.value)}
        </p>
        <br />
        <p>Procure o espaço concierge e informe este</p>
      </div>
      <div className='voucher-confirmation-code'>
        <p>CÓDIGO DE CONFIRMAÇÃO</p>
        <p>{purchase.id}</p>
      </div>
    </div>
  );
};

export default VoucherContent;
