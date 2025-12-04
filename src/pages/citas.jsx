import React from "react";
import { FaUser, FaUsers, FaCalendarAlt, FaUserMd, FaFileInvoice, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./citas.css";

export default function Citas() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  const totals = {
    total: 3,
    confirmadas: 1,
    pendientes: 1,
    agendadas: 1
  };

  const appointments = [
    { fecha: "24/04/2024", paciente: "Carlos López", medico: "Dra. María García", estado: "Agendada" },
    { fecha: "25/04/2024", paciente: "Ana García", medico: "Dr. Juan Pérez", estado: "Confirmada" },
    { fecha: "26/04/2024", paciente: "María Rodríguez", medico: "Dra. Ana Rodríguez", estado: "Pendiente" }
  ];

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUser /> Usuario
        </div>

        <ul>
          <li><FaUsers /> Pacientes</li>
          <li className="active"><FaCalendarAlt /> Citas</li>
          <li><FaUserMd /> Médicos</li>
          <li><FaFileInvoice /> Facturación</li>
          <li><FaChartBar /> Reportes</li>
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
          <div className="card"><h2>{totals.total}</h2><p>Total Citas</p></div>
          <div className="card"><h2>{totals.confirmadas}</h2><p>Confirmadas</p></div>
          <div className="card"><h2>{totals.pendientes}</h2><p>Pendientes</p></div>
          <div className="card"><h2>{totals.agendadas}</h2><p>Agendadas</p></div>
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
            {appointments.map((cita, i) => (
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
            ))}
          </tbody>
        </table>

        {/* BOTÓN */}
        <button className="new-appointment-btn">
          Nueva cita
        </button>

      </main>
    </div>
  );
}