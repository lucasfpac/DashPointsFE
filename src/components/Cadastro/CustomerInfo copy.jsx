import React, { useContext } from 'react';
import Title from '../Title/Title';
import CustomerTable from '../Table/CustomerTable';
import { CustomerContext } from '@/CustomerContext';
import useFetch from '../Hooks/useFetch';
import FormSummary from '../Formulario/FormSummary/FormSummary';
import FormButtons from '../Formulario/FormButtons/FormButtons';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CustomerInfo = () => {
  const { loading } = useFetch();
  const { data } = useContext(CustomerContext);

  const totalCompras =
    data && data[0].compras
      ? data[0].compras.reduce((acc, compra) => acc + compra.valor, 0)
      : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Compras do Cliente</h1>
          <p className="text-sm text-gray-600">
            Verifique as compras e imprima o comprovante
          </p>
        </div>
        <p className="text-center font-bold mt-4">CPF: {data[0].cpf}</p>
        <hr className="my-4" />
        <div className="w-full max-w-full md:max-w-4xl p-2">
          <CustomerTable totalCompras={totalCompras} />
          <FormSummary totalCompras={totalCompras} />
          <FormButtons loading={loading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerInfo;
