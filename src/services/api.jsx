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

export function TOKEN_POST(body) {
  return {
    url: API_URL + "validate-token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "/validate-token",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function CUSTOMERS_GET(token) {
  return {
    url: API_URL + "/customers",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function CUSTOMERS_POST(body) {
  return {
    url: API_URL + "/customers",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
