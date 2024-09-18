import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../NotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CadastroCustomer from "./CadastroCustomer";
import CustomerInfo from "./CustomerInfo";

const Cadastro = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div>
        <Header />
      </div>
      <main className='flex-1 justify-center items-center w-full'>
        <Routes>
          <Route path='/' element={<CadastroCustomer />} />
          <Route path='compra' element={<CustomerInfo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Cadastro;
