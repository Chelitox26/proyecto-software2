import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      setSuccess("Usuario creado correctamente");
    } catch (err) {
      console.log(err.code);

      if (err.code === "auth/email-already-in-use") {
        setError("El correo ya está en uso");
      } else if (err.code === "auth/invalid-email") {
        setError("El correo no es válido");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setError("Error al crear el usuario");
      }
    }
  };

return (
  <div className="register-container">
    <div className="register-card">

      <h2 className="register-title">Registrar Usuario</h2>

      <input
        className="register-input"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="register-input"
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button className="register-btn" onClick={handleRegister}>
        Crear Usuario
      </button>

      {error && <p className="register-message" style={{ color: "red" }}>{error}</p>}
      {success && <p className="register-message" style={{ color: "green" }}>{success}</p>}

    </div>
  </div>
);
}
