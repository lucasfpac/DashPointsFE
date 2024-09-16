import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CadastroCustomer from './CadastroCustomer';
import CustomerInfo from './CustomerInfo';

const Cadastro = () => {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<CadastroCustomer />} />
          <Route path="compra" element={<CustomerInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default Cadastro;
