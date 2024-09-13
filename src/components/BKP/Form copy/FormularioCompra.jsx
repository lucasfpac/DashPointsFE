import React from "react";
import FormInput from "./FormInput";
import FormDate from "./FormDate";
import { Button } from "../../ui/button";
import FormSelect from "./FormSelect";
import useForm from "../../../Hooks/useForm";
import useFetch from "../../../Hooks/useFetch";
import { CUSTOMERS_POST } from "../../../services/api";
import Error from "@/Helper/Error";
import { Navigate } from "react-router-dom";

const FormularioCompra = () => {
  const [selectedStore, setSelectedStore] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const nf = useForm("number");
  const valor = useForm("number");

  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      cpf: cpfecnpj.value,
      email: email.value,
      address: cep.value,
      name: nome.value,
      surname: nome.value,
      phone: celular.value,
      date: selectedDate,
    };

    console.log("Dados enviados:", data);

    const { url, options } = CUSTOMERS_POST(data);

    const { response, json } = await request(url, options);

    if (response.ok) {
      console.log("Formulário enviado com sucesso", json);
      setRedirect(true);
    } else {
      console.log("Erro no envio do formulário:", response.status, json);
    }
  }

  return (
    <>
      {redirect && <Navigate to='/reimprimir-token' />}
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'
      >
        <div className='my-4 w-full'>
          <FormSelect
            label='Selecione uma loja'
            options={["Artefato", "Brentwood", "BK", "WTC"]}
            placeholder='Selecione a loja'
            value={selectedStore}
            onChange={setSelectedStore}
          />
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <FormInput
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm mt-4'
            type='number'
            id='nf'
            title='Número do Pedido / NF'
            {...nf}
          />
          <FormInput
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm mt-4'
            type='number'
            id='valor'
            title='Valor'
            {...valor}
          />
        </div>
        <FormDate
          name='dataCompra'
          title='Data da Compra'
          value={selectedDate}
          onChange={setSelectedDate}
          error={error}
        />
        <div className='grid justify-center items-center mt-10'>
          <p className='font-bold'>
            SUAS NOTAS SOMAM: <span>R$ 0,00</span>
          </p>
          <p className='font-bold'>
            FALTAM: R$ 21.900,00 PARA CONQUISTAR SEU BRINDE
          </p>
        </div>
        <div className='flex justify-center items-center mt-8 gap-10'>
          {loading ? (
            <Button disabled>Avançar</Button>
          ) : (
            <Button>Avançar</Button>
          )}
          {loading ? (
            <Button disabled>Finalizar</Button>
          ) : (
            <Button>Finalizar</Button>
          )}
        </div>
        <div className='text-center'>
          <Error error={error} />
        </div>
      </form>
    </>
  );
};

export default FormularioCompra;
