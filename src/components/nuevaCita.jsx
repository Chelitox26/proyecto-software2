import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Firebase
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

export default function NuevaCita() {
  const navigate = useNavigate();

  // 🔹 Campos del formulario
  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [duracion, setDuracion] = useState("30 minutos");
  const [motivo, setMotivo] = useState("");

  // 🔹 Listas de Firebase
  const [pacientesList, setPacientesList] = useState([]);
  const [medicosList, setMedicosList] = useState([]);

  // 📌 Cargar pacientes desde Firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pacientes"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        apellido: doc.data().apellido
      }));

      setPacientesList(data);
    });

    return () => unsub();
  }, []);

  // 📌 Cargar médicos desde Firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "medicos"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre
      }));

      setMedicosList(data);
    });

    return () => unsub();
  }, []);

  // 📌 Guardar cita
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "citas"), {
        paciente,
        medico,
        fecha,
        hora,
        tipoConsulta,
        duracion,
        motivo,
        estado: "Agendada",
        fechaCreacion: serverTimestamp()
      });

      navigate("/citas");

    } catch (error) {
      console.error("Error al guardar cita:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">

        <div className="modal-header">
          <h2>Agendar Nueva Cita</h2>
          <button className="modal-close" onClick={() => navigate("/citas")}>✕</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>

          {/* PACIENTE */}
          <label>Paciente *</label>
          <select value={paciente} onChange={(e) => setPaciente(e.target.value)} required>
            <option value="">Seleccionar paciente</option>
            {pacientesList.map((p) => (
              <option key={p.id} value={`${p.nombre} ${p.apellido}`}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>

          {/* MÉDICO */}
          <label>Médico *</label>
          <select value={medico} onChange={(e) => setMedico(e.target.value)} required>
            <option value="">Seleccionar médico</option>
            {medicosList.map((m) => (
              <option key={m.id} value={m.nombre}>
                {m.nombre}
              </option>
            ))}
          </select>

          {/* FECHA & HORA */}
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

          {/* TIPO CONSULTA */}
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

          {/* MOTIVO */}
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