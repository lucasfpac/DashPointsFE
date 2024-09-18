import React, { useState, useCallback, useContext } from "react";
import useForm from "../Hooks/useForm";
import useFetch from "../Hooks/useFetch";
import { CEP_GET, CUSTOMERS_POST } from "../../services/api";
import FormInputFields from "./InputFields/FormInputFields";
import FormAddressFields from "./AddressFields/FormAddressFields";
import FormStoreSelect from "./FormStoreSelect/FormStoreSelect";
import FormConsentCheckboxes from "./ConsentCheckboxes/FormConsentCheckboxes";
import FormActions from "./FormActions/FormActions";
import FormRadio from "./FormRadio/FormRadio";
import { CustomerContext } from "@/CustomerContext";

const Formulario = () => {
  const [addressData, setAddressData] = useState({ cidade: "", uf: "" });
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [additionalInputValue, setAdditionalInputValue] = useState("");

  const cpfecnpj = useForm("cpfecnpj");
  const email = useForm("email");
  const cep = useForm("cep");
  const nome = useForm("");
  const celular = useForm("number");

  const { customerLogin } = useContext(CustomerContext);
  const { loading, error, request } = useFetch();

  const handleCepBlur = useCallback(async () => {
    if (cep.validate()) {
      const { url, options } = CEP_GET(cep.value);
      try {
        const { response, json } = await request(url, options);
        if (response.ok) {
          setAddressData({ cidade: json.localidade, uf: json.uf });
        } else {
          cep.setError("Erro ao buscar dados para o CEP.");
        }
      } catch (e) {
        cep.setError("Erro de rede ou servidor.");
      }
    }
  }, [cep, request]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!cpfecnpj.validate() || !email.validate() || !cep.validate()) {
        return;
      }

      const data = {
        cpf: cpfecnpj.value,
        email: email.value,
        name: nome.value,
        phone: celular.value,
        cep: cep.value,
        cidade: addressData.cidade,
        uf: addressData.uf,
        store: selectedStore,
        additionalInfo: {
          selectedValue,
          additionalInputValue,
        },
      };

      const { url, options } = CUSTOMERS_POST(data);
      const { response } = await request(url, options);

      if (response.ok) {
        customerLogin(cpfecnpj.value);
      }
    },
    [
      cpfecnpj,
      email,
      cep,
      addressData,
      selectedStore,
      selectedValue,
      additionalInputValue,
      request,
      customerLogin,
      nome,
      celular,
    ]
  );

  return (
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
        cidade={addressData.cidade}
        uf={addressData.uf}
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
  );
};

export default Formulario;
