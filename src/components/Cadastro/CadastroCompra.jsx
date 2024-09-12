import React from "react";
import Header from "../Header/Header";
import Title from "../Title/Title";
import Footer from "../Footer/Footer";
import FormularioCompra from "../Form/FormularioCompra";

const CadastroCompra = () => {
  return (
    <>
      <Header />
      <Title
        title='Cadastrar Compra'
        paragraph='1. Digite os dados da sua compra'
      />
      <div className='flex mt-3 justify-center items-center'>
        <div className='w-full max-w-4xl p-4'>
          <FormularioCompra />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CadastroCompra;
