import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../Hooks/useForm";
import useFetch from "../Hooks/useFetch";
import { CEP_GET, CUSTOMERS_POST, TOKEN_POST } from "../../services/api";
import FormInputFields from "./InputFields/FormInputFields";
import FormAddressFields from "./AddressFields/FormAddressFields";
import FormStoreSelect from "./FormStoreSelect/FormStoreSelect";
import FormConsentCheckboxes from "./ConsentCheckboxes/FormConsentCheckboxes";
import FormActions from "./FormActions/FormActions";
import FormRadio from "./FormRadio/FormRadio";

const Formulario = () => {
  const [cidade, setCidade] = React.useState("");
  const [uf, setUf] = React.useState("");
  const [selectedStore, setSelectedStore] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [additionalInputValue, setAdditionalInputValue] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [token, setToken] = React.useState(null); // Store the token

  const cpfecnpj = useForm("cpfecnpj");
  const email = useForm("email");
  const cep = useForm("cep");
  const nome = useForm("");
  const celular = useForm("number");

  const { loading, error, request } = useFetch();

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
      try {
        // Now request the token based on the CPF or CNPJ
        const tokenBody = { cpfCnpj: cpfecnpj.value };
        const { url: tokenUrl, options: tokenOptions } = TOKEN_POST(tokenBody);
        const { response: tokenResponse, json: tokenJson } = await request(
          tokenUrl,
          tokenOptions
        );

        if (tokenResponse.ok) {
          setToken(tokenJson.token); // Store token
          localStorage.setItem("token", tokenJson.token); // Optionally store in localStorage
          setRedirect(true); // Redirect to next form
        } else {
          console.error(
            "Failed to fetch token",
            tokenResponse.status,
            tokenJson
          );
        }
      } catch (e) {
        console.error("Token fetching error", e);
      }
    } else {
      console.error("Erro no envio do formulário:", response.status, json);
    }
  }

  return (
    <>
      {redirect && <Navigate to='/cadastro-compra' state={{ token }} />}{" "}
      {/* Passing token via state */}
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg grid grid-cols-2 gap-2'
      >
        <FormInputFields
          cpfecnpj={cpfecnpj}
          nome={nome}
          email={email}
          celular={celular}
        />
        <FormAddressFields
          cep={cep}
          handleCepBlur={handleCepBlur}
          cidade={cidade}
          setCidade={setCidade}
          uf={uf}
          setUf={setUf}
        />
        <FormStoreSelect
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
        <div className='flex flex-col gap-2 col-span-2'>
          <FormRadio
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            additionalInputValue={additionalInputValue}
            setAdditionalInputValue={setAdditionalInputValue}
          />
          <FormConsentCheckboxes />
          <FormActions loading={loading} error={error} />
        </div>
      </form>
    </>
  );
};

export default Formulario;
