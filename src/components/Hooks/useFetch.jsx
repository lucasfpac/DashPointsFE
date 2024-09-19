import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            "Usuário já existe. Por favor, use CPF/CNPJ diferente."
          );
        } else if (response.status === 400) {
          throw new Error(
            json.message || "Solicitação inválida. Verifique seus dados."
          );
        } else if (response.status === 500) {
          throw new Error(
            "Erro no servidor. Por favor, tente novamente mais tarde."
          );
        } else {
          throw new Error(
            json.message || "Ocorreu um erro. Por favor, tente novamente."
          );
        }
      }
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
