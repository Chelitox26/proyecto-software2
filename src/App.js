import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/registro"; 
import Citas from "./pages/citas";
import NuevaCita from "./components/nuevaCita";   

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/nueva-cita" element={<NuevaCita />} />  
        <Route path="/registro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;