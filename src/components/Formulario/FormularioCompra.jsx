import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { CUSTOMERS_POST } from "../../services/api";
import FormStoreSelect from "./FormStoreSelect/FormStoreSelect";
import FormPurchaseDetails from "./FormPurchaseDetails/FormPurchaseDetails";
import FormDate from "../shared/FormDate";
import FormSummary from "./FormSummary/FormSummary";
import FormButtons from "./FormButtons/FormButtons";
import Error from "@/Helper/Error";

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
      cpf: nf.value,
      date: selectedDate,
      valor: valor.value,
      store: selectedStore,
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
        {/* Store Selection */}
        <FormStoreSelect
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />

        {/* Purchase Details Inputs */}
        <FormPurchaseDetails nf={nf} valor={valor} />

        {/* Purchase Date Input */}
        <FormDate
          name='dataCompra'
          title='Data da Compra'
          value={selectedDate}
          onChange={setSelectedDate}
          error={error}
        />

        {/* Purchase Summary */}
        <FormSummary />

        {/* Action Buttons */}
        <FormButtons loading={loading} />

        {/* Error Display */}
        <div className='text-center'>
          <Error error={error} />
        </div>
      </form>
    </>
  );
};

export default FormularioCompra;
