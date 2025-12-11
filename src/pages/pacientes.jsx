import React, { useEffect, useState } from "react";
import "../App.css";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaUserMd,
  FaFileInvoice,
  FaChartBar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Firebase
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Modal Nuevo Paciente
import NuevoPaciente from "../components/nuevoPaciente";

export default function Pacientes() {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  // Calcular edad en base a fechaNacimiento
  const calcularEdad = (fecha) => {
    if (!fecha) return "---";
    const hoy = new Date();
    const nac = new Date(fecha);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad + " años";
  };

  // Cargar pacientes desde Firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pacientes"), (snap) => {
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPacientes(lista);
    });

    return () => unsub();
  }, []);

  // Filtro
  const filtered = pacientes.filter((p) => {
    const s = search.toLowerCase();
    return (
      p.nombre?.toLowerCase().includes(s) ||
      p.apellido?.toLowerCase().includes(s) ||
      p.cedula?.toLowerCase().includes(s) ||
      p.telefono?.toLowerCase().includes(s)
    );
  });

  // Estadísticas
  const total = pacientes.length;
  const mujeres = pacientes.filter((p) => p.genero === "F").length;
  const hombres = pacientes.filter((p) => p.genero === "M").length;
  const terceraEdad = pacientes.filter((p) => {
    const edad = parseInt(calcularEdad(p.fechaNacimiento));
    return edad >= 60;
  }).length;

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUser /> Usuario
        </div>

        <ul>
          <li className="active">
            <FaUsers /> Pacientes
          </li>

          <li onClick={() => navigate("/citas")}>
            <FaCalendarAlt /> Citas
          </li>

          <li onClick={() => navigate("/medicos")}>
            <FaUserMd /> Médicos
          </li>

          <li onClick={() => navigate("/facturacion")}>
            <FaFileInvoice /> Facturación
          </li>

          <li onClick={() => navigate("/reportes")}>
            <FaChartBar /> Reportes
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <div className="header">
          <h1>Gestión de Pacientes</h1>

          <button
            className="btn-new-invoice"
            onClick={() => setMostrarModal(true)}
          >
            Nuevo Paciente
          </button>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          className="patient-search"
          placeholder="Buscar pacientes por nombre, cédula o teléfono…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CARDS */}
        <div className="patient-cards">
          <div className="patient-card">
            <p className="title">Total Pacientes</p>
            <p className="value blue">{total}</p>
          </div>

          <div className="patient-card">
            <p className="title">Mujeres</p>
            <p className="value green">{mujeres}</p>
          </div>

          <div className="patient-card">
            <p className="title">Hombres</p>
            <p className="value yellow">{hombres}</p>
          </div>

          <div className="patient-card">
            <p className="title">Tercera Edad</p>
            <p className="value purple">{terceraEdad}</p>
          </div>
        </div>

        {/* TABLA */}
        <table className="patient-table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Edad</th>
              <th>Género</th>
              <th>Fecha Registro</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre} {p.apellido}</td>
                <td>{p.cedula}</td>
                <td>{p.telefono}</td>
                <td>{calcularEdad(p.fechaNacimiento)}</td>

                <td>
                  <span className={`gender-badge ${p.genero}`}>
                    {p.genero}
                  </span>
                </td>

                <td>{p.fechaRegistro || "---"}</td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* MODAL NUEVO PACIENTE */}
      {mostrarModal && (
        <NuevoPaciente onClose={() => setMostrarModal(false)} />
      )}

    </div>
  );
}