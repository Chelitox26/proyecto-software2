import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../App.css";

export default function EditarCita({ cita, onClose }) {
  const [paciente, setPaciente] = useState(cita.paciente);
  const [medico, setMedico] = useState(cita.medico);
  const [fecha, setFecha] = useState(cita.fecha);
  const [hora, setHora] = useState(cita.hora);
  const [estado, setEstado] = useState(cita.estado);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "citas", cita.id), {
      paciente,
      medico,
      fecha,
      hora,
      estado
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">

        <div className="modal-header">
          <h2>Editar Cita</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-body" onSubmit={handleUpdate}>

          <label>Paciente</label>
          <input
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
          />

          <label>Médico</label>
          <input
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
          />

          <div className="modal-row">
            <div>
              <label>Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div>
              <label>Hora</label>
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </div>
          </div>

          <label>Estado</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option>Agendada</option>
            <option>Pendiente</option>
            <option>Confirmada</option>
            <option>Cancelada</option>
          </select>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cerrar
            </button>
            <button type="submit" className="btn-add">
              Guardar Cambios
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}