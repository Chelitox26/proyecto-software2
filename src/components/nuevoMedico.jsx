import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function NuevoMedico({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [licencia, setLicencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [universidad, setUniversidad] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFin, setHorarioFin] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [dias, setDias] = useState([]);
  const [bio, setBio] = useState("");

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleDias = (e) => {
    const valor = e.target.value;
    setDias((prev) =>
      prev.includes(valor)
        ? prev.filter((d) => d !== valor)
        : [...prev, valor]
    );
  };

  const guardarMedico = async () => {
    await addDoc(collection(db, "medicos"), {
      nombre,
      apellido,
      especialidad,
      licencia,
      telefono,
      email,
      experiencia,
      universidad,
      horarioInicio,
      horarioFin,
      consultorio,
      dias,
      bio,
      estado: "Activo",
    });

    onClose();
  };

  return (
    <div className="modal-medico-overlay">
      <div className="modal-medico-window">

        <h2 className="modal-medico-title">Agregar Nuevo Médico</h2>

        <div className="medico-form-grid">

          {/* Izquierda */}
          <div>
            <label className="medico-label">Nombre *</label>
            <input className="medico-input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <label className="medico-label">Apellido *</label>
            <input className="medico-input" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>

          <div>
            <label className="medico-label">Especialidad *</label>
            <select className="medico-select" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
              <option value="">Seleccionar especialidad</option>
              <option>Cardiología</option>
              <option>Pediatría</option>
              <option>Neurología</option>
            </select>
          </div>

          <div>
            <label className="medico-label">Número de Licencia *</label>
            <input className="medico-input" placeholder="LIC#####" value={licencia} onChange={(e) => setLicencia(e.target.value)} />
          </div>

          <div>
            <label className="medico-label">Teléfono *</label>
            <input className="medico-input" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>

          <div>
            <label className="medico-label">Email *</label>
            <input className="medico-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="medico-label">Años de Experiencia</label>
            <input className="medico-input" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} />
          </div>

          <div>
            <label className="medico-label">Universidad</label>
            <input className="medico-input" value={universidad} onChange={(e) => setUniversidad(e.target.value)} />
          </div>

        </div>

        {/* INFORMACIÓN LABORAL */}
        <h3 className="section-title">Información Laboral</h3>

        <div className="horarios-row">
          <div className="horario-item">
            <label className="medico-label">Horario Inicio</label>
            <input type="time" className="medico-input" value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} />
          </div>

          <div className="horario-item">
            <label className="medico-label">Horario Fin</label>
            <input type="time" className="medico-input" value={horarioFin} onChange={(e) => setHorarioFin(e.target.value)} />
          </div>

          <div className="horario-item">
            <label className="medico-label">Consultorio</label>
            <select className="medico-select" value={consultorio} onChange={(e) => setConsultorio(e.target.value)}>
              <option value="">Seleccionar consultorio</option>
              <option>101</option>
              <option>102</option>
              <option>201</option>
            </select>
          </div>
        </div>

        {/* DÍAS DE TRABAJO */}
        <h3 className="section-title">Días de Trabajo</h3>

        <div className="medico-days">
          {diasSemana.map((dia) => (
            <label key={dia} className="medico-day">
              <input
                type="checkbox"
                value={dia}
                checked={dias.includes(dia)}
                onChange={handleDias}
              />
              <span>{dia}</span>
            </label>
          ))}
        </div>

        {/* BIO */}
        <h3 className="section-title">Biografía Profesional</h3>
        <textarea
          className="medico-textarea"
          placeholder="Breve descripción de experiencia y especialización"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        {/* BOTONES */}
        <div className="modal-footer">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="btn-guardar" onClick={guardarMedico}>Guardar Médico</button>
        </div>

      </div>
    </div>
  );
}