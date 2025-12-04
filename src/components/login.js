import React from "react";
import "../App.css";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md shadow-xl rounded-2xl p-6 bg-white">
        <div className="flex flex-col items-center gap-6">

          <div className="bg-teal-600 p-4 rounded-xl">
            <span style={{ color: "white", fontSize: "28px" }}>+</span>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-700 leading-tight">
            Sistema de Gestión <br /> de Citas Médicas
          </h2>

          <input
            placeholder="Usuario / Correo"
            className="h-12 w-full border rounded-lg px-3"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="h-12 w-full border rounded-lg px-3"
          />

          <button className="w-full h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-base">
            Iniciar sesión
          </button>

          <button className="text-sm text-gray-600 hover:underline mt-2">
            ¿Olvidaste tu contraseña?
          </button>

        </div>
      </div>
    </div>
  );
}