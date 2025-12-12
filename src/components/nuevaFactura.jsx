import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import "../App.css";

export default function NuevaFactura({ onClose }) {
  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [listaPacientes, setListaPacientes] = useState([]);
  const [listaMedicos, setListaMedicos] = useState([]);

  // 🔥 Cargar pacientes desde /pacientes
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pacientes"), (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListaPacientes(datos);
    });

    return () => unsub();
  }, []);

  // 🔥 Cargar médicos desde /medicos
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "medicos"), (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListaMedicos(datos);
    });

    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const numeroFactura =
        "FAC-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      await addDoc(collection(db, "facturas"), {
        numero: numeroFactura,
        paciente,
        medico,
        servicio,
        fecha,
        monto: Number(monto),
        metodoPago,
        descripcion,
        estado: "Pendiente",
        fechaCreacion: serverTimestamp(),
      });

      onClose();
    } catch (error) {
      console.error("Error guardando factura:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-header">
          <h2>Nueva Factura</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {/* PACIENTE */}
          <label>Paciente *</label>
          <select
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            required
          >
            <option value="">Seleccionar paciente</option>
            {listaPacientes.map((p) => (
              <option key={p.id} value={p.nombre}>
                {p.nombre}
              </option>
            ))}
          </select>

          {/* MÉDICO */}
          <label>Médico *</label>
          <select
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            required
          >
            <option value="">Seleccionar médico</option>
            {listaMedicos.map((m) => (
              <option key={m.id} value={m.nombre}>
                {m.nombre}
              </option>
            ))}
          </select>

          {/* SERVICIO */}
          <label>Servicio *</label>
          <select
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            required
          >
            <option value="">Seleccionar servicio</option>
            <option>Consulta General</option>
            <option>Laboratorio</option>
            <option>Radiografía</option>
          </select>

          <div className="modal-row">
            <div>
              <label>Fecha *</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Monto ($) *</label>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
              />
            </div>
          </div>

          {/* MÉTODO DE PAGO */}
          <label>Método de Pago *</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            required
          >
            <option value="">Seleccionar método</option>
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
          </select>

          {/* DESCRIPCIÓN */}
          <label>Descripción</label>
          <textarea
            placeholder="Detalles adicionales del servicio"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-add">
              Crear Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}