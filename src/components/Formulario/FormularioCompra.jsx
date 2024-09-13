import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../Hooks/useForm";
import useFetch from "../Hooks/useFetch";
import { CUSTOMERS_POST } from "../../services/api";
import FormPurchaseDetails from "./FormPurchaseDetails/FormPurchaseDetails";
import FormDate from "../shared/FormDate";
import FormSummary from "./FormSummary/FormSummary";
import FormButtons from "./FormButtons/FormButtons";
import Error from "@/components/Helper/Error";
import FormStoreSelect from "./FormStoreSelect/FormStoreSelect";

const FormularioCompra = () => {
  const location = React.useLocation();
  const token = location.state?.token || localStorage.getItem("token"); // Retrieve token

  const [selectedStore, setSelectedStore] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false);

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
        <FormStoreSelect
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
        <FormPurchaseDetails nf={nf} valor={valor} />
        <FormDate
          name='dataCompra'
          title='Data da Compra'
          value={selectedDate}
          onChange={setSelectedDate}
          error={error}
        />
        <FormSummary />
        <FormButtons loading={loading} />
        <div className='text-center'>
          <Error error={error} />
        </div>
      </form>
    </>
  );
};

export default FormularioCompra;
