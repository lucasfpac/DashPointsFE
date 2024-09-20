import React from "react";
import useForm from "../Hooks/useForm";
import useFetch from "../Hooks/useFetch";
import { COMPRAS_POST } from "../../services/api";
import FormPurchaseDetails from "./FormPurchaseDetails/FormPurchaseDetails";
import FormDate from "../shared/FormDate";
import Error from "@/components/Helper/Error";
import FormStoreSelect from "./FormStoreSelect/FormStoreSelect";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CustomerContext } from "@/CustomerContext";

const FormularioCompra = () => {
  const today = new Date();
  const [selectedStore, setSelectedStore] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(today);
  const { data } = React.useContext(CustomerContext);

  const nf = useForm("number");
  const valor = useForm("number");

  const { error, loading, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("invoice", nf.value);
    formData.append("date", format(selectedDate, "dd-MM-yyyy"));
    formData.append("value", valor.value);
    formData.append("store", selectedStore);

    const { url, options } = COMPRAS_POST(formData, data.cpf_cnpj);
    request(url, options);
  }

  return (
    <>
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
        />
        <br />
        <Button loading={loading ? loading : undefined}>Adicionar</Button>
        <div className='text-center'>
          <Error error={error} />
        </div>
      </form>
    </>
  );
};

export default FormularioCompra;
