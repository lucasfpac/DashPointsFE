import React from "react";
import useForm from "../Hooks/useForm";
import useFetch from "../Hooks/useFetch";
import { PURCHASES_POST } from "../../services/api";
import FormPurchaseDetails from "./FormPurchaseDetails/FormPurchaseDetails";
import FormDate from "../shared/FormDate";
import Error from "@/components/Helper/Error";
import FormStoreSelect from "./FormStoreSelect/FormStoreSelect";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CustomerContext } from "@/CustomerContext";

const FormularioCompra = ({ onClose }) => {
  const [selectedStore, setSelectedStore] = React.useState("");
  const { data, customerPurchases, fetchActiveEvent, today } =
    React.useContext(CustomerContext);
  const [selectedDate, setSelectedDate] = React.useState(today);

  const nf = useForm("number");
  const valor = useForm("currency");

  const { error, loading, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const activeEventId = await fetchActiveEvent();

    const purchases = {
      invoice: nf.value,
      date: format(selectedDate, "yyyy-MM-dd"),
      value: valor.decimalString,
      store: Number(selectedStore),
      customer: Number(data.id),
      event: Number(activeEventId),
    };

    const { url, options } = PURCHASES_POST(purchases);
    const { response } = await request(url, options);
    if (response && response.ok) {
      await customerPurchases(data.id);
      onClose();
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'
        autoComplete='off'
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
        {loading ? (
          <Button disabled>Adicionar</Button>
        ) : (
          <Button>Adicionar</Button>
        )}
        <div className='text-center'>
          <Error error={error} />
        </div>
      </form>
    </>
  );
};

export default FormularioCompra;
