import React, { useState, useEffect } from "react";
import { FaUser, FaUsers, FaPhone, FaIdCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export default function Pacientes() {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  const [pacientes, setPacientes] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", identidad: "", telefono: "" });

  useEffect(() => {
    const ref = collection(db, "pacientes");
    const unsub = onSnapshot(ref, (snap) => {
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPacientes(lista);
    });
    return () => unsub();
  }, []);

  const guardarPaciente = async () => {
    if (!nuevo.nombre || !nuevo.identidad || !nuevo.telefono) return;
    await addDoc(collection(db, "pacientes"), nuevo);
    setNuevo({ nombre: "", identidad: "", telefono: "" });
  };

  return (
    <div className="container">
      <header className="header">
        <h1><FaUsers /> Pacientes</h1>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
      </header>

      <div className="card resumen-card">
        <h2>Resumen</h2>
        <p>Total de pacientes: <strong>{pacientes.length}</strong></p>
      </div>

      <div className="card formulario-card">
        <h2>Registrar nuevo paciente</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Número de identidad"
          value={nuevo.identidad}
          onChange={(e) => setNuevo({ ...nuevo, identidad: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={nuevo.telefono}
          onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })}
        />
        <button onClick={guardarPaciente} className="btn-guardar">Guardar</button>
      </div>

      <div className="card lista-card">
        <h2><FaUser /> Lista de Pacientes</h2>        
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Identidad</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.identidad}</td>
                <td>{p.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
