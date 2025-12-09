import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/registro";
import Citas from "./pages/citas";
import MedicoCitas from "./pages/MedicoCitas";
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
      </Routes>
    </BrowserRouter>
  );
}
  