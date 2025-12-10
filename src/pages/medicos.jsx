import React, { useEffect, useState } from "react";
import { FaUser, FaUsers, FaCalendarAlt, FaUserMd, FaFileInvoice, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Firebase
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Modal Agregar Nuevo Médico
import NuevoMedico from "../components/nuevoMedico";

export default function Medicos() {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [mostrarNuevoMedico, setMostrarNuevoMedico] = useState(false);

  // 🔥 Obtener médicos en tiempo real  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "medicos"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMedicos(lista);
    });

    return () => unsub();
  }, []);

  // 🔍 Filtrar médicos por nombre, especialidad o teléfono
  const medicosFiltrados = medicos.filter((m) =>
    `${m.nombre} ${m.apellido}`.toLowerCase().includes(buscar.toLowerCase()) ||
    (m.especialidad || "").toLowerCase().includes(buscar.toLowerCase()) ||
    (m.telefono || "").toLowerCase().includes(buscar.toLowerCase())
  );

  // 📊 Contadores
  const total = medicos.length;
  const activos = medicos.filter((m) => m.estado === "Activo").length;
  const especialidades = new Set(medicos.map((m) => m.especialidad)).size;

  const promedioExp = medicos.length
    ? Math.round(
        medicos.reduce((acc, m) => acc + (parseInt(m.experiencia) || 0), 0) /
          medicos.length
      )
    : 0;

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUser /> Usuario
        </div>

        <ul>
          <li onClick={() => navigate("/pacientes")}><FaUsers /> Pacientes</li>
          <li onClick={() => navigate("/citas")}><FaCalendarAlt /> Citas</li>
          <li className="active" onClick={() => navigate("/medicos")}>
            <FaUserMd /> Médicos
          </li>
          <li onClick={() => navigate("/facturacion")}><FaFileInvoice /> Facturación</li>
          <li onClick={() => navigate("/reportes")}><FaChartBar /> Reportes</li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="header">
          <h1>Gestión de Médicos</h1>

          <button
            className="btn-new-invoice"
            onClick={() => setMostrarNuevoMedico(true)}
          >
            Nuevo Médico
          </button>
        </header>

        {/* BUSCADOR */}
        <input
          className="invoice-search"
          placeholder="Buscar médicos por nombre o especialidad..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />

        {/* TARJETAS RESUMEN */}
        <div className="invoice-cards">
          <div className="invoice-card">
            <h2 className="card-value blue">{total}</h2>
            <p className="card-title">Total Médicos</p>
          </div>

          <div className="invoice-card">
            <h2 className="card-value green">{activos}</h2>
            <p className="card-title">Activos</p>
          </div>

          <div className="invoice-card">
            <h2 className="card-value yellow">{especialidades}</h2>
            <p className="card-title">Especialidades</p>
          </div>

          <div className="invoice-card">
            <h2 className="card-value">{promedioExp}</h2>
            <p className="card-title">Años Promedio</p>
          </div>
        </div>

        {/* TABLA */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Licencia</th>
              <th>Experiencia</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {medicosFiltrados.map((m) => (
              <tr key={m.id}>
                <td>{m.nombre} {m.apellido}</td>
                <td>{m.especialidad}</td>
                <td>{m.telefono}</td>
                <td>{m.licencia}</td>
                <td>{m.experiencia || "—"} años</td>
                <td>
                  <span
                    className={`estado-tag ${
                      m.estado === "Activo" ? "pagada" : "pendiente"
                    }`}
                  >
                    {m.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* MODAL NUEVO MÉDICO */}
      {mostrarNuevoMedico && (
        <NuevoMedico onClose={() => setMostrarNuevoMedico(false)} />
      )}
    </div>
  );
}