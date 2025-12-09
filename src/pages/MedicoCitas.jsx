import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function MedicoCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const cerrarSesion = () => {
    navigate("/"); // volver al login
  };

  // Cargar citas desde localStorage (las mismas que usa Citas.jsx)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("citas");
      if (stored) {
        const data = JSON.parse(stored);
        setCitas(data);
      } else {
        setCitas([]);
      }
    } catch (error) {
      console.error("Error leyendo citas de localStorage:", error);
      setCitas([]);
    }
    setLoading(false);
  }, []);

  const actualizarStorage = (nuevasCitas) => {
    setCitas(nuevasCitas);
    localStorage.setItem("citas", JSON.stringify(nuevasCitas));
  };

  const cambiarEstado = (index, nuevoEstado) => {
    const nuevas = citas.map((cita, i) =>
      i === index ? { ...cita, estado: nuevoEstado } : cita
    );
    actualizarStorage(nuevas);
  };

  const borrarCita = (index) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar esta cita?"
    );
    if (!confirmar) return;

    const nuevas = citas.filter((_, i) => i !== index);
    actualizarStorage(nuevas);
  };

  const resumen = useMemo(() => {
    const total = citas.length;
    const confirmadas = citas.filter((c) => c.estado === "Confirmada").length;
    const pendientes = citas.filter((c) => c.estado === "Pendiente").length;
    const realizadas = citas.filter(
      (c) =>
        c.estado === "Realizada" ||
        c.estado === "Completada" ||
        c.estado === "En curso"
    ).length;

    return { total, confirmadas, pendientes, realizadas };
  }, [citas]);

  return (
    <div className="main-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Médico</h2>
        </div>
        <nav className="sidebar-nav">
          <span className="sidebar-item active">Citas</span>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="content">
        {/* HEADER + LOGOUT */}
        <header className="content-header header-with-logout">
          <div>
            <h1>Gestión de Citas del Médico</h1>
            <p className="content-subtitle">
              Visualiza tus citas, márcalas como realizadas o gestiona su estado.
            </p>
          </div>

          <button className="logout-btn" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </header>

        {/* TARJETAS RESUMEN */}
        <section className="cards-row">
          <div className="status-card">
            <span className="status-card-number">{resumen.total}</span>
            <span className="status-card-label">Total Citas</span>
          </div>

          <div className="status-card">
            <span className="status-card-number">{resumen.confirmadas}</span>
            <span className="status-card-label">Confirmadas</span>
          </div>

          <div className="status-card">
            <span className="status-card-number">{resumen.pendientes}</span>
            <span className="status-card-label">Pendientes</span>
          </div>

          <div className="status-card">
            <span className="status-card-number">{resumen.realizadas}</span>
            <span className="status-card-label">Realizadas / En curso</span>
          </div>
        </section>

        {/* TABLA DE CITAS */}
        <section className="table-section">
          <h2 className="table-title">Citas registradas</h2>

          {loading ? (
            <p>Cargando citas...</p>
          ) : citas.length === 0 ? (
            <p>No hay citas registradas.</p>
          ) : (
            <div className="table-wrapper">
              <table className="citas-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita, index) => (
                    <tr key={index}>
                      <td>{cita.fecha || "--"}</td>
                      <td>{cita.hora || "--"}</td>
                      <td>{cita.paciente || "--"}</td>
                      <td>{cita.medico || "--"}</td>
                      <td>{cita.motivo || "--"}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            (cita.estado || "Pendiente").toLowerCase()
                          }`}
                        >
                          {cita.estado || "Pendiente"}
                        </span>
                      </td>
                      <td className="acciones-td">
                        <button
                          className="btn-estado btn-confirmada"
                          onClick={() => cambiarEstado(index, "Confirmada")}
                        >
                          Confirmar
                        </button>
                        <button
                          className="btn-estado btn-pendiente"
                          onClick={() => cambiarEstado(index, "Pendiente")}
                        >
                          Pendiente
                        </button>
                        <button
                          className="btn-estado btn-realizada"
                          onClick={() => cambiarEstado(index, "Realizada")}
                        >
                          Realizada
                        </button>
                        <button
                          className="btn-estado btn-borrar"
                          onClick={() => borrarCita(index)}
                        >
                          Borrar
                        </button>
                        <button
                          className="btn-estado btn-encurso"
                          onClick={() => cambiarEstado(index, "En curso")}
                        >
                          En curso
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
