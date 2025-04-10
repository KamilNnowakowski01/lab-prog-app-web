import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ProjectService } from "../../services/ProjectService";
import { Project } from "../../models/Project";

export default function DeleteProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const foundProject = await ProjectService.getProjectById(id);
        setProject(foundProject);
      } catch (err) {
        setError("Nie udało się załadować projektu");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await ProjectService.deleteProject(id);
      navigate("/project");
    } catch (err) {
      setError("Nie udało się usunąć projektu");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center">Ładowanie...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!project) {
    return <div className="alert alert-danger">Projekt nie został znaleziony!</div>;
  }

  return (
    <div className="container mt-4">
      <h2>🗑️ Usuń Projekt</h2>
      <p>Czy na pewno chcesz usunąć projekt <strong>{project.name}</strong>?</p>
      
      <div className="d-flex gap-2">
        <button 
          className="btn btn-danger" 
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Usuwanie...' : '✅ Tak, usuń'}
        </button>
        
        <Link to={`/project/${project.id}`} className="btn btn-secondary">
          ❌ Anuluj
        </Link>
      </div>
    </div>
  );
}