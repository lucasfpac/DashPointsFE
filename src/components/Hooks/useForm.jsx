import React from "react";
import useValidadeDocument from "./useValidadeDocument";
import { formatCPFOrCNPJ, formatCEP, formatCelular } from "./useFormat";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize números apenas.",
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
  celular: {
    regex: /^\d{1,3}\d{10,11}$/,
    message:
      "Utilize um número de celular válido no formato +XX (XX) XXXXX-XXXX",
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [formattedValue, setFormattedValue] = React.useState("");
  const [error, setError] = React.useState(null);
  const { validateCPF, validateCNPJ } = useValidadeDocument();

  const cleanValue = (value) => value.replace(/\D/g, "");

  function validate(value) {
    if (!type || type === false) return true;
    if (type === "checkbox") return true;
    if (type === "cpfecnpj") {
      const cleanedValue = cleanValue(value);
      if (cleanedValue.length === 11 && validateCPF(cleanedValue)) {
        setError(null);
        return true;
      }
      if (cleanedValue.length === 14 && validateCNPJ(cleanedValue)) {
        setError(null);
        return true;
      }
      setError("CPF ou CNPJ inválido.");
      return false;
    }
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    }
    if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }
    setError(null);
    return true;
  }

  function onChange({ target }) {
    const { value } = target;
    if (type === "checkbox") {
      setValue(value);
    } else if (type === "cpfecnpj" || type === "cep" || type === "celular") {
      handleInputChange(target, type);
    } else {
      setValue(value);
      setFormattedValue(value);
    }
  }

  const handleInputChange = (inputField, inputType) => {
    let { value, selectionStart } = inputField;
    let cleanValue = value;
    if (inputType !== "email") {
      cleanValue = value.replace(/\D/g, "");
    }
    let formattedValue = cleanValue;
    if (inputType === "cpfecnpj") {
      formattedValue = formatCPFOrCNPJ(cleanValue);
    } else if (inputType === "cep") {
      formattedValue = formatCEP(cleanValue);
    } else if (inputType === "celular") {
      formattedValue = formatCelular(cleanValue);
    }
    const lengthDifference = formattedValue.length - value.length;
    const newCursorPosition = selectionStart + lengthDifference;
    inputField.value = formattedValue;
    inputField.setSelectionRange(newCursorPosition, newCursorPosition);
    setValue(cleanValue);
    setFormattedValue(formattedValue);
  };

  return {
    value: formattedValue || value,
    rawValue: cleanValue(value),
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
