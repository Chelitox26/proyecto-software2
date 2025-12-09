import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../App.css";

export default function NuevaFactura({ onClose }) {
  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      //  GENERAR NÚMERO DE FACTURA AUTOMÁTICO
      const numeroFactura =
        "FAC-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      //  GUARDAR FACTURA EN FIREBASE
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
        fechaCreacion: serverTimestamp()
      });

      onClose();

    } catch (error) {
      console.log("Error guardando factura:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">

        <div className="modal-header">
          <h2>Nueva Factura</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>

          <label>Paciente *</label>
          <select value={paciente} onChange={(e) => setPaciente(e.target.value)} required>
            <option value="">Seleccionar paciente</option>
            <option>Ana García</option>
            <option>Carlos López</option>
          </select>

          <label>Médico *</label>
          <select value={medico} onChange={(e) => setMedico(e.target.value)} required>
            <option value="">Seleccionar médico</option>
            <option>Dr. Ramírez</option>
            <option>Dra. Santos</option>
          </select>

          <label>Servicio *</label>
          <select value={servicio} onChange={(e) => setServicio(e.target.value)} required>
            <option value="">Seleccionar servicio</option>
            <option>Consulta General</option>
            <option>Laboratorio</option>
            <option>Radiografía</option>
          </select>

          <div className="modal-row">
            <div>
              <label>Fecha *</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
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

          <label>Método de Pago *</label>
          <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} required>
            <option value="">Seleccionar método</option>
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
          </select>

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