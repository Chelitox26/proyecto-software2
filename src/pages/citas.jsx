import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaUserMd,
  FaFileInvoice,
  FaChartBar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Citas() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [citas, setCitas] = useState([]);
  const [resumen, setResumen] = useState({
    total: 0,
    confirmadas: 0,
    pendientes: 0,
    agendadas: 0,
  });

  // Cargar SOLO lo que haya en localStorage.citas
  useEffect(() => {
    const stored = localStorage.getItem("citas");
    if (stored) {
      const data = JSON.parse(stored);
      setCitas(data);

      const stats = {
        total: data.length,
        confirmadas: data.filter((c) => c.estado === "Confirmada").length,
        pendientes: data.filter((c) => c.estado === "Pendiente").length,
        agendadas: data.filter((c) => c.estado === "Agendada").length,
      };
      setResumen(stats);
    } else {
      // si no hay nada, dejamos todo en cero
      setCitas([]);
      setResumen({
        total: 0,
        confirmadas: 0,
        pendientes: 0,
        agendadas: 0,
      });
    }
  }, []);

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUser /> Usuario
        </div>

        <ul>
          <li>
            <FaUsers /> Pacientes
          </li>
          <li className="active">
            <FaCalendarAlt /> Citas
          </li>
          <li>
            <FaUserMd /> Médicos
          </li>
          <li>
            <FaFileInvoice /> Facturación
          </li>
          <li>
            <FaChartBar /> Reportes
          </li>
        </ul>
      </aside>

      {/* CONTENIDO */}
      <main className="main">
        {/* HEADER */}
        <header className="header">
          <h1>Gestión de Citas</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        {/* CARDS */}
        <div className="cards-container">
          <div className="card">
            <h2>{resumen.total}</h2>
            <p>Total Citas</p>
          </div>
          <div className="card">
            <h2>{resumen.confirmadas}</h2>
            <p>Confirmadas</p>
          </div>
          <div className="card">
            <h2>{resumen.pendientes}</h2>
            <p>Pendientes</p>
          </div>
          <div className="card">
            <h2>{resumen.agendadas}</h2>
            <p>Agendadas</p>
          </div>
        </div>

        {/* TABLA */}
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "16px" }}>
                  No hay citas registradas. Usa el botón &quot;Nueva cita&quot; para agregar una.
                </td>
              </tr>
            ) : (
              citas.map((cita, i) => (
                <tr key={i}>
                  <td>{cita.fecha}</td>
                  <td>{cita.paciente}</td>
                  <td>{cita.medico}</td>
                  <td>
                    <span className={`status ${cita.estado.toLowerCase()}`}>
                      {cita.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* BOTÓN */}
        <button
          className="new-appointment-btn"
          onClick={() => navigate("/nueva-cita")}
        >
          Nueva cita
        </button>
      </main>
    </div>
  );
}
