import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
function LandingPage({ isLoggedIn, username }) {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Bem-vindo ao Dashpoints</h1>
        <p>Seu sistema de gerenciamento de pontos promocionais.</p>
        {isLoggedIn ? (
          <div className="landing-buttons">
            <p>`Bem-vindo, ${username}!` </p>
            <Link to="/points" className="navbar-btn">Registrar Pontos</Link>
            <Link to="" className="navbar-btn">Registrar Cliente</Link>
          </div>
        ) : (
          <div className="landing-buttons">
            <p>Bem-vindo, Visitante</p>
            <p>
              Já possui uma conta? <Link to="/login">Faça o login aqui</Link>
            </p>
            <p>
              Ainda não? <Link to="/register">Registre-se</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
