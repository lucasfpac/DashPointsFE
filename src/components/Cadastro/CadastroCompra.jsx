import React from "react";
import Header from "../Header/Header";
import Title from "../Title/Title";
import Footer from "../Footer/Footer";
import FormularioCompra from "../Formulario/FormularioCompra";

const CadastroCompra = () => {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <Header />
      <div className='flex-shrink-0'>
        <Title
          title='Cadastrar Compra'
          paragraph='1. Digite os dados da sua compra'
        />
      </div>
      <div className='flex flex-col flex-1 justify-center items-center w-full'>
        <div className='w-full max-w-full md:max-w-4xl p-2'>
          <FormularioCompra />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroCompra;
