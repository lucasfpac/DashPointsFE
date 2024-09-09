import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(username, password);
      navigate('/'); // Redireciona após login bem-sucedido
    } catch (error) {
      setError(error.message); // Define a mensagem de erro para exibição
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entrar</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">Entrar</button>
        </form>
        <p className="login-register-link">
          Não tem uma conta? <a href="/register">Registre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
