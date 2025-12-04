import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Citas from "./pages/citas";
import NuevaCita from "./components/nuevaCita";   

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/nueva-cita" element={<NuevaCita />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;