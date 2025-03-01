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
      <Link to="/project" className="btn btn-secondary">⬅️ Wróć</Link>
      <Link to={`/project/edit/${project.id}`} className="btn btn-warning ms-2">✏️ Edytuj</Link>
    </div>
  );
}
