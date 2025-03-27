import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { seedProjects } from "./data/seedProjects";

import Home from "./pages/Home";
import AddProject from "./pages/project/AddProject";
import ListProject from "./pages/project/ListProject";
import ItemProject from "./pages/project/ItemProject";
import EditProject from "./pages/project/EditProject";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap

function App() {
  useEffect(() => {
    seedProjects(); // ✅ Inicjalizacja przykładowych danych
  }, []);

  return (
    <Router> {/* ✅ Naprawiony błąd - dodano <Router> */}
      <div className="container">
        <div className="text-center mt-4">
          <h1 className="display-5 fw-bold text-primary">ManagMe - Projekty</h1>
          <p className="lead">Zarządzaj swoimi projektami w prosty sposób</p>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/add" element={<AddProject />} />
          <Route path="/project" element={<ListProject />} />
          <Route path="/project/:id" element={<ItemProject />} />
          <Route path="/project/edit/:id" element={<EditProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
