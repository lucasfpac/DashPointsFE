import React from "react";
import useValidadeDocument from "./useValidadeDocument";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  number: {
    regex: /^\+?\d{1,3}\d+$/,
    message: "Utilize números apenas, incluindo o código do país.",
  },
  cpfecnpj: {
    regex:
      /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
    message: "Utilize formatos válidos para CPF ou CNPJ",
  },
  cep: {
    regex: /\d{5}-?\d{3}/,
    message: "Digite um CEP válido",
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState(type === "checkbox" ? false : "");
  const [error, setError] = React.useState(null);
  const { validateCPF, validateCNPJ } = useValidadeDocument();

  function validate(value) {
    if (type === false) return true;

    if (type === "checkbox") return true;

    if (type === "cpfecnpj") {
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length === 11 && validateCPF(value)) {
        setError(null);
        return true;
      }
      if (cleanedValue.length === 14 && validateCNPJ(value)) {
        setError(null);
        return true;
      }
      setError("CPF ou CNPJ inválido.");
      return false;
    }

    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    const { type, checked, value } = target;
    if (error) validate(type === "checkbox" ? checked : value);
    if (type === "checkbox") {
      setValue(checked);
    } else {
      setValue(value);
    }
  }

  return {
    value,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
