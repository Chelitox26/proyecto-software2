import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Citas from "./pages/citas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
