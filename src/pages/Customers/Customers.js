import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../../services/customerService';
import './Customers.css';

function CustomerRegister() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se pelo menos CPF ou CNPJ foi preenchido
    if (!cpf && !cnpj) {
      setError('Por favor, insira um CPF ou CNPJ.');
      return;
    }

    try {
      await registerCustomer({ name, surname, cpf, cnpj, phone, address, dob });
      navigate('/points'); // Redireciona para a página de clientes após o cadastro
    } catch (err) {
      setError('Erro ao cadastrar cliente');
    }
  };

  return (
    <div className="customer-register-container">
      <div className="customer-register-box">
        <h2>Cadastro de Cliente</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="customer-register-form">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="customer-register-input"
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="customer-register-input"
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="customer-register-input"
          />
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="customer-register-input"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="customer-register-input"
          />
          <input
            type="text"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="customer-register-input"
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="customer-register-input"
          />
          <button type="submit" className="customer-register-btn">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
