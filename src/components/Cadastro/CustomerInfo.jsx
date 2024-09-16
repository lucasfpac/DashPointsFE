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

  console.log(data[0].name);
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>
      <main className="flex-1 justify-center items-center w-full">
        <Title
          title="Compras do Cliente"
          paragraph="Verifique as compras e imprima o comprovante"
        />
        <p className="text-center font-bold">CPF: {data[0].cpf}</p>
        <hr />
        <br />
        <div className="flex flex-col flex-1 justify-center items-center w-full">
          <div className="w-full max-w-full md:max-w-4xl p-2">
            <CustomerTable totalCompras={totalCompras} />
            <FormSummary totalCompras={totalCompras} />
            <FormButtons loading={loading} />
          </div>
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerInfo;
