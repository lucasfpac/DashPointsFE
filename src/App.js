import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { login as loginUser, refreshToken, logout as logoutUser } from './services/authService';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Points from './pages/Points/Points';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          await validateToken(accessToken);
          setIsLoggedIn(true);
          setUsername(localStorage.getItem("username")); // Obtém o nome do usuário
        } catch (error) {
          console.error('Token inválido ou expirado', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    initializeAuth();
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/validate-token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }) // Send token in the body
      });
      
      if (response.ok) {
        return true; // Token is valid
      } else {
        await refreshToken(); // Token is invalid or expired, refresh it
        return true;
      }
    } catch (error) {
      throw new Error('Error validating token');
    }
  };
  

  const handleLogin = async (username, password) => {
    try {
      await loginUser(username, password);
      setIsLoggedIn(true);
      setUsername(username); // Define o nome do usuário após login
      localStorage.setItem("username", username);
    } catch (error) {
      console.error('Erro ao fazer login', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} username={username} />
      <Routes isLoggedIn={isLoggedIn} onLogout={handleLogout} username={username}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/points" element={isLoggedIn ? <Points /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
