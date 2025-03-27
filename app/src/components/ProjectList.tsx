import { useState, useEffect } from "react";
import { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import { v4 as uuidv4 } from "uuid";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  useEffect(() => {
    setProjects(ProjectService.getProjects());
  }, []);

  const handleAddProject = () => {
    if (!newProject.name.trim() || !newProject.description.trim()) return;
    const project = { id: uuidv4(), ...newProject };
    ProjectService.addProject(project);
    setProjects([...projects, project]);
    setNewProject({ name: "", description: "" });
  };

  const handleDeleteProject = (id: string) => {
    ProjectService.deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📌 Zarządzanie Projektami</h2>

      {/* Formularz dodawania projektu */}
      <div className="card p-3 mb-4">
        <h4 className="mb-3">Dodaj nowy projekt</h4>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Nazwa projektu"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Opis projektu"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={handleAddProject}>
              ➕ Dodaj
            </button>
          </div>
        </div>
      </div>

      {/* Lista projektów */}
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteProject(project.id)}>
                  🗑️ Usuń
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
