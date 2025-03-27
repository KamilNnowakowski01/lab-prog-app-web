import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ProjectService } from "../../services/ProjectService";
import { Project } from "../../models/Project";

export default function DeleteProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const foundProject = ProjectService.getProjects().find((p) => p.id === id);
      if (foundProject) setProject(foundProject);
    }
  }, [id]);

  const handleDelete = () => {
    if (id) {
      ProjectService.deleteProject(id);
      navigate("/project");
    }
  };

  if (!project) {
    return <div className="text-danger">Projekt nie został znaleziony!</div>;
  }

  return (
    <div className="container mt-4">
      <h2>🗑️ Usuń Projekt</h2>
      <p>Czy na pewno chcesz usunąć projekt <strong>{project.name}</strong>?</p>
      
      <button className="btn btn-danger me-2" onClick={handleDelete}>
        ✅ Tak, usuń
      </button>
      
      <Link to={`/project/${project.id}`} className="btn btn-secondary">
        ❌ Anuluj
      </Link>
    </div>
  );
}
