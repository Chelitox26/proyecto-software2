import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaUserMd,
  FaFileInvoice,
  FaChartBar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Firebase
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

// Modal de edición
import EditarCita from "../components/editarCita";

export default function Citas() {
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [resumen, setResumen] = useState({
    total: 0,
    confirmadas: 0,
    pendientes: 0,
    agendadas: 0
  });

  const [editCita, setEditCita] = useState(null);

  // 🔥 escuchar citas en tiempo real
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "citas"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setCitas(lista);

      // resumen
      setResumen({
        total: lista.length,
        confirmadas: lista.filter((c) => c.estado === "Confirmada").length,
        pendientes: lista.filter((c) => c.estado === "Pendiente").length,
        agendadas: lista.filter((c) => c.estado === "Agendada").length
      });
    });

    return () => unsub();
  }, []);

  // 🔴 cancelar cita
  const handleCancel = async (id) => {
    if (!window.confirm("¿Deseas cancelar esta cita?")) return;

    await updateDoc(doc(db, "citas", id), {
      estado: "Cancelada"
    });
  };

  const handleLogout = () => navigate("/");

  return (
    <div className="layout">
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

      <main className="main">
        <header className="header">
          <h1>Gestión de Citas</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        {/* CARDS */}
        <div className="cards-container">
          <div className="card"><h2>{resumen.total}</h2><p>Total Citas</p></div>
          <div className="card"><h2>{resumen.confirmadas}</h2><p>Confirmadas</p></div>
          <div className="card"><h2>{resumen.pendientes}</h2><p>Pendientes</p></div>
          <div className="card"><h2>{resumen.agendadas}</h2><p>Agendadas</p></div>
        </div>

        {/* TABLA */}
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.fecha}</td>
                <td>{cita.paciente}</td>
                <td>{cita.medico}</td>
                <td>
                  <span className={`status ${cita.estado?.toLowerCase()}`}>
                    {cita.estado}
                  </span>
                </td>

                {/* ACCIONES */}
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => setEditCita(cita)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-cancel"
                    onClick={() => handleCancel(cita.id)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="new-appointment-btn"
          onClick={() => navigate("/nueva-cita")}
        >
          Nueva cita
        </button>

        {/* MODAL EDITAR CITA */}
        {editCita && (
          <EditarCita
            cita={editCita}
            onClose={() => setEditCita(null)}
          />
        )}
      </main>
    </div>
  );
}