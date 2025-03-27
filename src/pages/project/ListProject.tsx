import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";
import { useProjectStore } from "../../store/useProjectStore";

export default function ListProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { activeProjectId, setActiveProject, clearActiveProject } = useProjectStore();

  useEffect(() => {
    setProjects(ProjectService.getProjects());
  }, []);

  const handleSelectProject = (projectId: string) => {
    if (activeProjectId === projectId) {
      clearActiveProject();
    } else {
      setActiveProject(projectId);
    }
  };

  return (
    <div>
      <h2 className="mb-3">📋 Lista projektów</h2>
      <Link to="/project/add" className="btn btn-success mb-3">➕ Dodaj projekt</Link>
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 mb-3">
            <div 
              className={`card shadow-sm ${activeProjectId === project.id ? "border-primary" : ""}`} 
              onClick={() => handleSelectProject(project.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <Link to={`/project/${project.id}`} className="btn btn-primary me-2">📄 Szczegóły</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
