import { useState, useCallback } from "react";
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

const cleanValue = (value) => value.replace(/\D/g, "");

const useForm = (type) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState(null);
  const { validateCPF, validateCNPJ } = useValidadeDocument();

  const validate = useCallback(
    (inputValue) => {
      if (!type || type === "checkbox") return true;

      const cleanedValue = cleanValue(inputValue);

      if (type === "cpfecnpj") {
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

      if (inputValue.length === 0) {
        setError("Preencha um valor.");
        return false;
      }

      if (types[type] && !types[type].regex.test(inputValue)) {
        setError(types[type].message);
        return false;
      }

      setError(null);
      return true;
    },
    [type, validateCPF, validateCNPJ]
  );

  const handleInputChange = useCallback((inputField, inputType) => {
    let { value, selectionStart } = inputField;
    let cleanValueStr = value.replace(/\D/g, "");
    let formattedValueStr = cleanValueStr;

    if (inputType === "cpfecnpj") {
      formattedValueStr = formatCPFOrCNPJ(cleanValueStr);
    } else if (inputType === "cep") {
      formattedValueStr = formatCEP(cleanValueStr);
    } else if (inputType === "celular") {
      formattedValueStr = formatCelular(cleanValueStr);
    }

    const lengthDifference = formattedValueStr.length - value.length;
    const newCursorPosition = selectionStart + lengthDifference;

    inputField.value = formattedValueStr;
    inputField.setSelectionRange(newCursorPosition, newCursorPosition);

    setValue(cleanValueStr);
    setFormattedValue(formattedValueStr);
  }, []);

  const onChange = useCallback(
    ({ target }) => {
      const { value } = target;
      if (type === "checkbox") {
        setValue(value);
      } else if (["cpfecnpj", "cep", "celular"].includes(type)) {
        handleInputChange(target, type);
      } else {
        setValue(value);
        setFormattedValue(value);
      }
    },
    [type, handleInputChange]
  );

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
