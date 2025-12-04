import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function NuevaCita() {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [duracion, setDuracion] = useState("30 minutos");
  const [motivo, setMotivo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCita = {
      id: Date.now(),
      paciente,
      medico,
      fecha,
      hora,
      tipoConsulta,
      duracion,
      motivo,
      estado: "Agendada"
    };

    const stored = JSON.parse(localStorage.getItem("citas")) || [];
    stored.push(nuevaCita);
    localStorage.setItem("citas", JSON.stringify(stored));

    navigate("/citas");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">

        <div className="modal-header">
          <h2>Agendar Nueva Cita</h2>
          <button className="modal-close" onClick={() => navigate("/citas")}>✕</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>

          <label>Paciente *</label>
          <select value={paciente} onChange={(e) => setPaciente(e.target.value)} required>
            <option value="">Seleccionar paciente</option>
            <option>Juan Pérez</option>
            <option>María López</option>
          </select>

          <label>Médico *</label>
          <select value={medico} onChange={(e) => setMedico(e.target.value)} required>
            <option value="">Seleccionar médico</option>
            <option>Dr. Ramírez</option>
            <option>Dra. Santos</option>
          </select>

          <div className="modal-row">
            <div>
              <label>Fecha *</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            </div>

            <div>
              <label>Hora *</label>
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
            </div>
          </div>

          <div className="modal-row">
            <div>
              <label>Tipo de Consulta *</label>
              <select value={tipoConsulta} onChange={(e) => setTipoConsulta(e.target.value)} required>
                <option value="">Tipo de consulta</option>
                <option>General</option>
                <option>Emergencia</option>
                <option>Control</option>
              </select>
            </div>

            <div>
              <label>Duración</label>
              <select value={duracion} onChange={(e) => setDuracion(e.target.value)}>
                <option>15 minutos</option>
                <option>30 minutos</option>
                <option>45 minutos</option>
                <option>60 minutos</option>
              </select>
            </div>
          </div>

          <label>Motivo de la Consulta</label>
          <textarea
            placeholder="Describir el motivo de la consulta"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={() => navigate("/citas")}>
              Cancelar
            </button>
            <button type="submit" className="btn-add">
              Agendar Cita
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}