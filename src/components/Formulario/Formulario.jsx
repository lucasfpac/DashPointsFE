import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { CEP_GET, CUSTOMERS_POST } from "../../services/api";
import FormInputFields from "./InputFields/FormInputFields";
import FormAddressFields from "./AddressFields/FormAddressFields";
import FormStoreSelection from "./StoreSelection/FormStoreSelection";
import FormConsentCheckboxes from "./ConsentCheckboxes/FormConsentCheckboxes";
import FormActions from "./FormActions/FormActions";

const Formulario = () => {
  // State for dynamic form elements
  const [cidade, setCidade] = React.useState("");
  const [uf, setUf] = React.useState("");
  const [selectedStore, setSelectedStore] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [additionalInputValue, setAdditionalInputValue] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  // Custom form hooks for input management
  const cpfecnpj = useForm("cpfecnpj");
  const email = useForm("email");
  const cep = useForm("cep");
  const nome = useForm("");
  const celular = useForm("number");

  const { loading, error, request } = useFetch();

  // Handle CEP Blur to fetch city and state
  async function handleCepBlur() {
    const isValid = cep.validate();
    if (isValid) {
      const { url, options } = CEP_GET(cep.value);
      try {
        const { response, json } = await request(url, options);
        if (response.ok) {
          setUf(json.uf);
          setCidade(json.localidade);
        } else {
          cep.setError("Erro ao buscar dados para o CEP.");
        }
      } catch (e) {
        cep.setError("Erro de rede ou servidor.");
      }
    }
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      cpf: cpfecnpj.value,
      email: email.value,
      address: cep.value,
      name: nome.value,
      surname: nome.value,
      phone: celular.value,
    };

    const { url, options } = CUSTOMERS_POST(data);
    const { response, json } = await request(url, options);

    if (response.ok) {
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
        {/* Input Fields */}
        <FormInputFields
          cpfecnpj={cpfecnpj}
          nome={nome}
          email={email}
          celular={celular}
        />

        {/* Address Fields */}
        <FormAddressFields
          cep={cep}
          handleCepBlur={handleCepBlur}
          cidade={cidade}
          setCidade={setCidade}
          uf={uf}
          setUf={setUf}
        />

        {/* Store Selection */}
        <FormStoreSelection
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          additionalInputValue={additionalInputValue}
          setAdditionalInputValue={setAdditionalInputValue}
        />

        {/* Consent Checkboxes */}
        <FormConsentCheckboxes />

        {/* Form Actions */}
        <FormActions loading={loading} error={error} />
      </form>
    </>
  );
};

export default Formulario;
