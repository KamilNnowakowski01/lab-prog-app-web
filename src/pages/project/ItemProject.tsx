import { useParams, Link } from "react-router-dom";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";

export default function ItemProject() {
  const { id } = useParams<{ id: string }>();
  const project: Project | undefined = ProjectService.getProjects().find((p) => p.id === id);

  if (!project) return <h2 className="text-danger">Projekt nie znaleziony!</h2>;

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <Link to="/project" className="btn btn-secondary me-2">⬅️ Wróć</Link>
      <Link to={`/project/edit/${project.id}`} className="btn btn-warning me-2">✏️ Edytuj</Link>
      <Link to={`/project/delete/${project.id}`} className="btn btn-danger me-2">🗑️ Usuń</Link>
    </div>
  );
}
