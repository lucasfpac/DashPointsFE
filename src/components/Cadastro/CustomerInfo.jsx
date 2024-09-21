import React, { useContext } from 'react';
import Title from '../Title/Title';
import CustomerTable from '../Table/CustomerTable';
import { CustomerContext } from '@/CustomerContext';
import FormSummary from '../Formulario/FormSummary/FormSummary';
import FormButtons from '../Formulario/FormButtons/FormButtons';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CustomerInfo = () => {
  const {
    data: customerData,
    purchases,
    loading,
    error,
  } = useContext(CustomerContext);

  const totalCompras =
    purchases && purchases.length > 0
      ? purchases.reduce((acc, compra) => acc + Number(compra.value), 0)
      : 0;

  const targetValue = 2000;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 justify-center items-center w-full">
        <Title
          title="Compras do Cliente"
          paragraph="Verifique as compras e imprima o comprovante"
        />
        <p className="text-center font-bold">
          CPF: {customerData ? customerData.cpf_cnpj : 'Loading...'}
        </p>
        <hr />
        <br />
        <div className="flex flex-col flex-1 justify-center items-center w-full">
          <div className="w-full max-w-full md:max-w-4xl p-2">
            <CustomerTable
              purchases={purchases}
              totalCompras={totalCompras}
              customerData={customerData}
              loading={loading}
              error={error}
            />
            <FormSummary totalCompras={totalCompras} />
            <FormButtons
              loading={loading ? loading : undefined}
              totalCompras={totalCompras}
              targetValue={targetValue}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerInfo;
