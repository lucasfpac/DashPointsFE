import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CadastroCompra from './CadastroCompra';
import CadastroCustomer from './CadastroCustomer';
import { CustomerContext } from '@/CustomerContext';

const Cadastro = () => {
  // const { data } = React.useContext(CustomerContext);

  return (
    <>
      <Header />
      <section className="container">
        <Routes>
          <Route path="/" element={<CadastroCustomer />} />
          <Route path="compra" element={<CadastroCompra />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </section>
    </>
  );
};

export default Cadastro;
