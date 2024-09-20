export const API_URL = "https://lucasfortunato.com.br/dashpoints/api";

export function CEP_GET(cep) {
  return {
    url: `https://viacep.com.br/ws/${cep}/json/`,
    options: {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    },
  };
}

export function CUSTOMERS_GET(cpfecnpj) {
  return {
    url: API_URL + `/customers/cpf_cnpj/?cpf_cnpj=${cpfecnpj}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function CUSTOMERS_POST(body) {
  return {
    url: API_URL + "/customers/",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function COMPRAS_POST(formData, id) {
  return {
    url: API_URL + `/purchases/?customer=${id}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    },
  };
}

export function COMPRAS_GET(id) {
  return {
    url: API_URL + `/purchases/?customer=${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function STORES_GET() {
  return {
    url: API_URL + "/stores",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}
