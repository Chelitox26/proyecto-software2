import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Login from "./pages/login";
import Register from "./pages/registro";
import Citas from "./pages/citas";
import Pacientes from "./pages/pacientes.jsx";
import Medicos from "./pages/medicos.jsx";
import Facturacion from "./pages/facturacion.jsx";
import Reportes from "./pages/reportes.jsx";
import MedicoCitas from "./pages/MedicoCitas";
import NuevoPaciente from "./components/nuevoPaciente.jsx";   
import NuevaCita from "./components/nuevaCita";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route path="/citas" element={<Citas />} />
        <Route path="/nueva-cita" element={<NuevaCita />} />

        <Route path="/medico" element={<MedicoCitas />} />

        {/* PACIENTES */}
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/nuevo-paciente" element={<NuevoPaciente />} /> {/* ✅ LISTO */}

        <Route path="/medicos" element={<Medicos />} />
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </BrowserRouter>
  );
}