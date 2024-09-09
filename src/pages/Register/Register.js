import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";  // Estilos separados

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    // Supondo que o registro seja bem-sucedido
    navigate("/login"); // Redireciona para a página de login após o registro
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registrar</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
          />
          <button type="submit" className="register-btn">Registrar</button>
        </form>
        <p className="register-login-link">
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
