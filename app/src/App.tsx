import ProjectList from "./components/ProjectList";
import { seedProjects } from "./data/seedProjects";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    seedProjects(); // Inicjalizacja przykładowych danych
  }, []);

  return (
    <div className="container">
      <div className="text-center mt-4">
        <h1 className="display-5 fw-bold text-primary">ManagMe - Projekty</h1>
        <p className="lead">Zarządzaj swoimi projektami w prosty sposób</p>
      </div>
      <ProjectList />
    </div>
  );
}

export default App;
