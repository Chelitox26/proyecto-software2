import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import "../App.css";

export default function NuevoPaciente({ onClose }) {

  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    genero: "",
    seguro: "",
    direccion: "",
    contactoEmergencia: "",
    telefonoEmergencia: "",
    alergias: "",
    medicamentos: "",
    fechaRegistro: new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const guardarPaciente = async () => {
    if (!data.nombre || !data.apellido || !data.cedula) {
      alert("Los campos obligatorios deben completarse.");
      return;
    }

    await addDoc(collection(db, "pacientes"), data);

    // Cierra el modal después de guardar
    onClose();
  };

  return (
    <div className="paciente-overlay">

      <div className="paciente-modal">

        {/* HEADER */}
        <div className="paciente-header">
          <h2 className="paciente-title">Agregar Nuevo Paciente</h2>

          {/* CERRAR (X) */}
          <button className="paciente-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* FORM GRID */}
        <div className="paciente-grid">

          <div>
            <label className="paciente-label">Nombre *</label>
            <input
              name="nombre"
              className="paciente-input"
              value={data.nombre}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="paciente-label">Apellido *</label>
            <input
              name="apellido"
              className="paciente-input"
              value={data.apellido}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="paciente-label">Cédula *</label>
            <input
              name="cedula"
              className="paciente-input"
              value={data.cedula}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="paciente-label">Teléfono *</label>
            <input
              name="telefono"
              className="paciente-input"
              value={data.telefono}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="paciente-label">Email</label>
            <input
              name="email"
              className="paciente-input"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="paciente-label">Fecha de Nacimiento *</label>
            <input
              type="date"
              name="fechaNacimiento"
              className="paciente-input"
              value={data.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="paciente-label">Género *</label>
            <select
              name="genero"
              className="paciente-select"
              value={data.genero}
              onChange={handleChange}
            >
              <option value="">Seleccionar género</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
            </select>
          </div>

          <div>
            <label className="paciente-label">Seguro Médico</label>
            <input
              name="seguro"
              className="paciente-input"
              value={data.seguro}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* DIRECCION */}
        <label className="paciente-label">Dirección</label>
        <textarea
          name="direccion"
          className="paciente-textarea"
          value={data.direccion}
          onChange={handleChange}
        />

        {/* CONTACTO EMERGENCIA */}
        <div className="paciente-section">Contacto de Emergencia</div>

        <div className="paciente-grid">
          <div>
            <label className="paciente-label">Nombre del Contacto</label>
            <input
              name="contactoEmergencia"
              className="paciente-input"
              value={data.contactoEmergencia}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="paciente-label">Teléfono de Emergencia</label>
            <input
              name="telefonoEmergencia"
              className="paciente-input"
              value={data.telefonoEmergencia}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* INFORMACIÓN MÉDICA */}
        <div className="paciente-section">Información Médica</div>

        <label className="paciente-label">Alergias</label>
        <textarea
          name="alergias"
          className="paciente-textarea"
          value={data.alergias}
          onChange={handleChange}
        />

        <label className="paciente-label">Medicamentos Actuales</label>
        <textarea
          name="medicamentos"
          className="paciente-textarea"
          value={data.medicamentos}
          onChange={handleChange}
        />

        {/* FOOTER */}
        <div className="paciente-footer">

          {/* CANCELAR */}
          <button className="paciente-btn-cancel" onClick={onClose}>
            Cancelar
          </button>

          {/* GUARDAR */}
          <button className="paciente-btn-save" onClick={guardarPaciente}>
            Guardar Paciente
          </button>

        </div>

      </div>
    </div>
  );
}