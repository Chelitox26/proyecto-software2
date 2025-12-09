import React, { useEffect, useState } from "react";
import "../App.css";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaUserMd,
  FaFileInvoice,
  FaChartBar,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Firebase
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

// Modal Nueva Factura
import NuevaFactura from "../components/nuevaFactura";

export default function Facturacion() {
  const navigate = useNavigate();

  const [facturas, setFacturas] = useState([]);
  const [filtradas, setFiltradas] = useState([]); // ← LISTA FILTRADA
  const [busqueda, setBusqueda] = useState(""); // ← TEXTO BUSCADOR
  const [mostrarNuevaFactura, setMostrarNuevaFactura] = useState(false);

  const [totales, setTotales] = useState({
    totalFacturado: 0,
    totalPagado: 0,
    totalPendiente: 0,
    cantidad: 0,
  });

  // 🔥 Escuchar facturas en tiempo real
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "facturas"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFacturas(lista);
      aplicarFiltro(busqueda); // actualiza filtro al recibir datos

      // Cálculos automáticos
      const totalFacturado = lista.reduce((acc, f) => acc + (f.monto || 0), 0);
      const totalPagado = lista
        .filter((f) => f.estado === "Pagada")
        .reduce((acc, f) => acc + (f.monto || 0), 0);
      const totalPendiente = lista
        .filter((f) => f.estado === "Pendiente")
        .reduce((acc, f) => acc + (f.monto || 0), 0);

      setTotales({
        totalFacturado,
        totalPagado,
        totalPendiente,
        cantidad: lista.length,
      });
    });

    return () => unsub();
  }, []);

  // 🔍 Aplicar filtro cuando cambia búsqueda o facturas
  useEffect(() => {
    aplicarFiltro(busqueda);
  }, [busqueda, facturas]);

  // 🔥 Función de búsqueda
  const aplicarFiltro = (texto) => {
    texto = texto.toLowerCase();

    const resultado = facturas.filter((f) => {
      return (
        (f.numero || "").toLowerCase().includes(texto) ||
        (f.paciente || "").toLowerCase().includes(texto) ||
        (f.servicio || "").toLowerCase().includes(texto) ||
        (f.fecha || "").toLowerCase().includes(texto)
      );
    });

    setFiltradas(resultado);
  };

  // Marcar como pagada
  const marcarPagada = async (id) => {
    await updateDoc(doc(db, "facturas", id), {
      estado: "Pagada",
    });
  };

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUser /> Usuario
        </div>

        <ul>
          <li onClick={() => navigate("/pacientes")}>
            <FaUsers /> Pacientes
          </li>
          <li onClick={() => navigate("/citas")}>
            <FaCalendarAlt /> Citas
          </li>
          <li onClick={() => navigate("/medicos")}>
            <FaUserMd /> Médicos
          </li>
          <li className="active" onClick={() => navigate("/facturacion")}>
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
        <header className="header">
          <h1>Gestión de Facturación</h1>

          <button
            className="btn-new-invoice"
            onClick={() => setMostrarNuevaFactura(true)}
          >
            Nueva Factura
          </button>

          <button className="logout-btn" onClick={() => navigate("/")}>
            Cerrar sesión
          </button>
        </header>

        {/* BUSCADOR */}
        <input
          className="invoice-search"
          placeholder="Buscar facturas por número, paciente o servicio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* TARJETAS */}
        <div className="invoice-cards">
          <div className="invoice-card">
            <FaDollarSign className="icon-money" />
            <p className="card-title">Total Facturado</p>
            <h2 className="card-value">${totales.totalFacturado.toFixed(2)}</h2>
          </div>

          <div className="invoice-card">
            <FaDollarSign className="icon-money" />
            <p className="card-title">Total Pagado</p>
            <h2 className="card-value green">
              ${totales.totalPagado.toFixed(2)}
            </h2>
          </div>

          <div className="invoice-card">
            <FaDollarSign className="icon-money" />
            <p className="card-title">Pendiente</p>
            <h2 className="card-value yellow">
              ${totales.totalPendiente.toFixed(2)}
            </h2>
          </div>

          <div className="invoice-card">
            <h2 className="card-value blue">{totales.cantidad}</h2>
            <p className="card-title">Total Facturas</p>
          </div>
        </div>

        {/* TABLA */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Paciente</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtradas.map((f) => (
              <tr key={f.id}>
                <td>{f.numero || "(sin número)"}</td>
                <td>{f.paciente}</td>
                <td>{f.servicio}</td>
                <td>{f.fecha}</td>
                <td>${(f.monto || 0).toFixed(2)}</td>

                <td>
                  <span className={`estado-tag ${f.estado?.toLowerCase()}`}>
                    {f.estado}
                  </span>
                </td>

                <td>
                  {f.estado === "Pendiente" && (
                    <button
                      className="btn-pay"
                      onClick={() => marcarPagada(f.id)}
                    >
                      Marcar Pagada
                    </button>
                  )}

                  <button className="btn-view">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* MODAL NUEVA FACTURA */}
      {mostrarNuevaFactura && (
        <NuevaFactura onClose={() => setMostrarNuevaFactura(false)} />
      )}
    </div>
  );
}