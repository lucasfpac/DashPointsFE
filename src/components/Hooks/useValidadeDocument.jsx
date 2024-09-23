const useValidadeDocument = () => {
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    let remainder;
    for (let i = 0; i < 9; i++) sum += Number(cpf.charAt(i)) * (10 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== Number(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number(cpf.charAt(i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === Number(cpf.charAt(10));
  };

  const validateCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, "");
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
    let sum = 0;
    let remainder;
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) sum += Number(cnpj.charAt(i)) * weights1[i];
    remainder = sum % 11;
    remainder = remainder < 2 ? 0 : 11 - remainder;
    if (remainder !== Number(cnpj.charAt(12))) return false;
    sum = 0;
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 13; i++) sum += Number(cnpj.charAt(i)) * weights2[i];
    remainder = sum % 11;
    remainder = remainder < 2 ? 0 : 11 - remainder;
    return remainder === Number(cnpj.charAt(13));
  };
  return { validateCPF, validateCNPJ };
};

export default useValidadeDocument;
