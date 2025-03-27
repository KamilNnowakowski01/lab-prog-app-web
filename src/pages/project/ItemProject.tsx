import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";
import { useProjectStore } from "../../store/useProjectStore";

export default function ItemProject() {
  const { id } = useParams<{ id: string }>();
  const { activeProjectId, setActiveProject } = useProjectStore();
  const project: Project | undefined = ProjectService.getProjects().find((p) => p.id === id);

  useEffect(() => {
    if (project && activeProjectId !== project.id) {
      setActiveProject(project.id);
    }
  }, [project, activeProjectId, setActiveProject]);

  if (!project) return <h2 className="text-danger">Projekt nie znaleziony!</h2>;

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      
      <div className="mt-3">
        <Link to="/project" className="btn btn-secondary me-2">⬅️ Wróć</Link>
        <Link to={`/project/${project.id}/stories`} className="btn btn-primary me-2">📌 Zarządzaj Historyjkami</Link>
        <Link to={`/project/edit/${project.id}`} className="btn btn-warning me-2">✏️ Edytuj</Link>
        <Link to={`/project/delete/${project.id}`} className="btn btn-danger me-2">🗑️ Usuń</Link>
        
      </div>
    </div>
  );
}
