import React from "react";
import Header from "../Header/Header";
import FormInput from "../Formulario/InputFields/FormInput";
import { Button } from "../ui/button";
import Footer from "../Footer/Footer";
import useForm from "../Hooks/useForm";
import { CustomerContext } from "@/CustomerContext";
import Error from "../Helper/Error";

const Cadastro = () => {
  const cpfecnpj = useForm("cpfecnpj");

  const { customerLogin, error, loading } = React.useContext(CustomerContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (cpfecnpj.validate()) {
      customerLogin(cpfecnpj.rawValue);
    }
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow flex items-center justify-center p-4'>
        <form
          className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-md'
          onSubmit={handleSubmit}
        >
          <FormInput
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm'
            type='text'
            id='cpfncnpj'
            title='CPF/CNPJ'
            placeholder='XXX.XXX.XXX-XX OU XX.XXX.XXX/0001-XX'
            {...cpfecnpj}
          />
          <div className='flex flex-col items-center mt-10'>
            <Button disabled={loading} className='w-full max-w-xs'>
              {loading ? "Carregando..." : "Avançar"}
            </Button>
            {error && (
              <div aria-live='polite' className='mt-3'>
                <Error error='CPF/CNPJ incorreto.' />
              </div>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Cadastro;
