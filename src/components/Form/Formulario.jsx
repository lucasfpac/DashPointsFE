import React from "react";
import FormInput from "./FormInput";
import { Button } from "../ui/button";
import FormSelect from "./FormSelect";
import FormRadio from "./FormRadio";
import FormCheckbox from "./FormCheckbox";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { CEP_GET } from "../../services/api";

const Formulario = () => {
  const [cidade, setCidade] = React.useState("");
  const [uf, setUf] = React.useState("");
  const [selectedStore, setSelectedStore] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [additionalInputValue, setAdditionalInputValue] = React.useState("");

  const cpfecnpj = useForm("cpfecnpj");
  const email = useForm("email");
  const cep = useForm("cep");
  const nome = useForm("");
  const celular = useForm("number");
  const isMaiorDe18 = useForm("checkbox");
  const regulamento = useForm("checkbox");
  const lgpd = useForm("checkbox");

  const { request } = useFetch();

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

    const { url, options } = USER_POST({
      cpfecnpj: cpfecnpj.value,
      email: email.value,
      cep: cep.value,
      nome: nome.value,
      celular: celular.value,
      maior: isMaiorDe18.value,
      regulamento: regulamento.value,
      lgpd: lgpd.value,
      radioValue: selectedValue,
      selectValue: selectedStore,
      additionalInputValue: additionalInputValue || "",
    });
    const { response } = await request(url, options);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'
    >
      <FormInput
        className='w-full p-3 border border-gray-300 rounded-md shadow-sm'
        type='text'
        id='cpfncnpj'
        title='CPF/CNPJ'
        placeholder='XXX.XXX.XXX-XX OU XX.XXX.XXX/0001-XX'
        {...cpfecnpj}
      />
      <FormInput
        className='w-full p-3 border border-gray-300 rounded-md shadow-sm mt-4'
        type='text'
        id='name'
        title='Nome'
        {...nome}
      />
      <FormInput
        className='w-full p-3 border border-gray-300 rounded-md shadow-sm mt-4'
        type='email'
        id='email'
        title='Email'
        placeholder='email@email.com'
        {...email}
      />
      <div className='grid grid-cols-2 gap-4 mt-4'>
        <FormInput
          className='w-full p-3 border border-gray-300 rounded-md shadow-sm'
          type='number'
          id='cel'
          title='Celular'
          placeholder='99999-9999'
          {...celular}
        />
        <FormInput
          className='w-full p-3 border border-gray-300 rounded-md shadow-sm'
          type='text'
          id='cep'
          title='CEP'
          placeholder='99999-999'
          {...cep}
          onBlur={handleCepBlur}
        />
        <FormInput
          className='w-full p-3 border border-gray-300 rounded-md shadow-sm'
          type='text'
          id='cidade'
          title='Cidade'
          value={cidade || ""}
          onChange={({ target }) => setCidade(target.value)}
        />
        <FormInput
          className='w-full p-3 border border-gray-300 rounded-md shadow-sm'
          type='text'
          id='uf'
          title='UF'
          value={uf || ""}
          onChange={({ target }) => setUf(target.value)}
        />
      </div>
      <div className='my-4'>
        <FormSelect
          label='Selecione uma loja'
          options={["Artefato", "Brentwood", "BK", "WTC"]}
          placeholder='Escolha uma loja'
          value={selectedStore}
          onChange={setSelectedStore}
        />
      </div>
      <div className='my-4'>
        <FormRadio
          label='Sentiu falta de alguma loja?'
          value={selectedValue}
          onChange={setSelectedValue}
          options={[
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
          ]}
          additionalInput={{
            condition: "sim",
            placeholder: "Qual?",
          }}
          onAdditionalInputChange={setAdditionalInputValue}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <FormCheckbox
          id='maiorde18'
          text='Concordo que sou maior de 18 anos.'
          className='p-3 border border-gray-300 rounded-md shadow-sm'
          {...isMaiorDe18}
        />
        <FormCheckbox
          id='ccpolitica'
          text='Concordo com o Regulamento e Politica de Privacidade deste site.'
          className='p-3 border border-gray-300 rounded-md shadow-sm'
          {...regulamento}
        />
        <FormCheckbox
          id='lgpd'
          text='Autorizo, nos termos do item 28 do regulamento, o tratamento de meus dados relativos a nomes, imagens e sons de voz, pela Promotora, para as finalidades e período definidos no regulamento.'
          className='p-3 border border-gray-300 rounded-md shadow-sm'
          {...lgpd}
        />
      </div>
      <div className='flex justify-center items-center mt-8'>
        <Button type='submit'>Avançar</Button>
      </div>
    </form>
  );
};

export default Formulario;
