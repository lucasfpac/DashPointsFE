export const formatCPFOrCNPJ = (value) => {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length <= 11) {
    return cleanValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    return cleanValue
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
};

export const formatCEP = (value) => {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
};

export const formatCelular = (value) => {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length === 0) return "";

  let countryCode = "";
  let restOfNumber = "";

  if (cleanValue.startsWith("55")) {
    countryCode = "+55";
    restOfNumber = cleanValue.slice(2);
  } else {
    countryCode = `+${cleanValue.slice(0, cleanValue.indexOf("("))}`;
    restOfNumber = cleanValue.slice(cleanValue.indexOf("("));
  }

  if (countryCode === "+55") {
    if (restOfNumber.length === 11) {
      return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(
        2,
        7
      )}-${restOfNumber.slice(7)}`;
    } else if (restOfNumber.length === 10) {
      return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(
        2,
        6
      )}-${restOfNumber.slice(6)}`;
    }
  }

  if (restOfNumber.length <= 3) {
    return `${countryCode} (${restOfNumber}`;
  }

  if (restOfNumber.length <= 6) {
    return `${countryCode} (${restOfNumber.slice(0, 3)}) ${restOfNumber.slice(
      3
    )}`;
  }

  return `${countryCode} (${restOfNumber.slice(0, 3)}) ${restOfNumber.slice(
    3,
    7
  )}-${restOfNumber.slice(7, 11)}`;
};
