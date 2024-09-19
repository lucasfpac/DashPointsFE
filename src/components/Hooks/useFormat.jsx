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
    countryCode = "55";
    restOfNumber = cleanValue.slice(2);
  } else if (cleanValue.startsWith("1")) {
    countryCode = "1";
    restOfNumber = cleanValue.slice(1);
  } else {
    countryCode = cleanValue.slice(0, cleanValue.length - 10);
    restOfNumber = cleanValue.slice(countryCode.length);
  }

  if (countryCode === "55") {
    const areaCode = restOfNumber.slice(0, 2);
    const number = restOfNumber.slice(2);

    if (number.length === 9) {
      return `+${countryCode} (${areaCode}) ${number.slice(
        0,
        5
      )}-${number.slice(5)}`;
    } else if (number.length === 8) {
      return `+${countryCode} (${areaCode}) ${number.slice(
        0,
        4
      )}-${number.slice(4)}`;
    }
  }

  if (countryCode === "1") {
    const areaCode = restOfNumber.slice(0, 3);
    const number = restOfNumber.slice(3);

    if (number.length > 7) {
      return `+${countryCode} (${areaCode}) ${number.slice(
        0,
        3
      )}-${number.slice(3, 7)}-${number.slice(7, 11)}`;
    } else if (number.length > 3) {
      return `+${countryCode} (${areaCode}) ${number.slice(
        0,
        3
      )}-${number.slice(3)}`;
    } else {
      return `+${countryCode} (${areaCode}) ${number}`;
    }
  }

  if (restOfNumber.length <= 3) {
    return `+${countryCode} (${restOfNumber}`;
  } else if (restOfNumber.length <= 6) {
    return `+${countryCode} (${restOfNumber.slice(0, 3)}) ${restOfNumber.slice(
      3
    )}`;
  } else if (restOfNumber.length <= 10) {
    return `+${countryCode} (${restOfNumber.slice(0, 3)}) ${restOfNumber.slice(
      3,
      6
    )}-${restOfNumber.slice(6)}`;
  } else {
    return `+${countryCode} (${restOfNumber.slice(0, 3)}) ${restOfNumber.slice(
      3,
      7
    )}-${restOfNumber.slice(7, 11)}`;
  }
};
