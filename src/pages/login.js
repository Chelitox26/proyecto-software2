import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/citas");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-icon">
          <span>+</span>
        </div>

        <h2 className="login-title">
          Sistema de Gestión <br /> de Citas Médicas
        </h2>

        <input
          placeholder="Usuario / Correo"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
        />

        <button className="login-btn" onClick={handleLogin}>
          Iniciar sesión
        </button>

        <button className="forgot-btn">
          ¿Olvidaste tu contraseña?
        </button>

      </div>
    </div>
  );
}