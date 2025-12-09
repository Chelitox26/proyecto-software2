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

// Componentes
import NuevaCita from "./components/nuevaCita";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* REGISTRO */}
        <Route path="/registro" element={<Register />} />

        {/* CITAS */}
        <Route path="/citas" element={<Citas />} />
        <Route path="/nueva-cita" element={<NuevaCita />} />

        {/* MEDICO (AGENDAR / VER CITAS DEL MÉDICO) */}
        <Route path="/medico" element={<MedicoCitas />} />

        {/* OTRAS SECCIONES */}
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/reportes" element={<Reportes />} />

      </Routes>
    </BrowserRouter>
  );
}
