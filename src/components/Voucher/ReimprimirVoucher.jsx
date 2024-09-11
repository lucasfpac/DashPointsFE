import React from "react";
import Header from "../Header/Header";
import FormInput from "../Form/FormInput";
import { Button } from "../ui/button";
import Footer from "../Footer/Footer";
import useForm from "../../Hooks/useForm";

const Cadastro = () => {
  const cpfecnpj = useForm("cpfecnpj");

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow flex items-center justify-center p-4'>
        <form className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-md'>
          <FormInput
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm'
            type='text'
            id='cpfncnpj'
            title='CPF/CNPJ'
            placeholder='XXX.XXX.XXX-XX OU XX.XXX.XXX/0001-XX'
            {...cpfecnpj}
          />
          <div className='flex justify-center items-center mt-10'>
            <Button>Avançar</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Cadastro;
