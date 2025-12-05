import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../App.css";

export default function Login() {

  const navigate = useNavigate();

  // Valores de los inputs
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Firebase Login
      await signInWithEmailAndPassword(auth, email, pass);

      navigate("/citas");

    } catch (err) {
      console.log(err);
      setError("Usuario o contraseña incorrecta");
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

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
