import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout, username }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Dashpoints</Link>
      </div>
      <div className="navbar-content">
        <div className="navbar-welcome">
          <span>
            {isLoggedIn ? `Bem-vindo, ${username}!` : 'Bem-vindo, Visitante'}
          </span>
        </div>
        <div className="navbar-buttons">
          {isLoggedIn ? (
            <div>
              <Link to="/points" className="navbar-btn">Registrar Pontos</Link>
              <Link to="/customers" className="navbar-btn">Registrar Cliente</Link>
              <button onClick={onLogout} className="navbar-btn">Sair</button>
            </div>
            
          ) : (
            <>
              <Link to="/login" className="navbar-btn">Entrar</Link>
              <Link to="/register" className="navbar-btn">Registrar-se</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
