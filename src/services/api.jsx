export const API_URL = 'https://lucasfortunato.com.br/dashpoints/api';
export const API_URL2 = 'http://localhost:3000';

export function CEP_GET(cep) {
  return {
    url: `https://viacep.com.br/ws/${cep}/json/`,
    options: {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
    },
  };
}

export function TOKEN_POST(body) {
  return {
    url: API_URL2 + '/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL2 + '/validade',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function CUSTOMERS_GET(token) {
  return {
    url: API_URL2 + '/customers',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function CUSTOMERS_POST(body) {
  return {
    url: API_URL2 + '/customers',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function COMPRAS_POST(token) {
  return {
    url: API_URL2 + '/compras',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function STORES_GET() {
  return {
    url: API_URL + '/stores',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}
