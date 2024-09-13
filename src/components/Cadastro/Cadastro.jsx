import React from "react";
import Header from "../Header/Header";
import Formulario from "../Formulario/Formulario";
import Title from "../Title/Title";
import Footer from "../Footer/Footer";

const Cadastro = () => {
  return (
    <>
      <Header />
      <Title
        title='Cadastrar Compra'
        paragraph='1. Digite seus dados pessoais'
      />
      <div className='flex mt-3 justify-center items-center overflow-x-hidden'>
        <div className='w-full p-4'>
          <Formulario />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cadastro;
