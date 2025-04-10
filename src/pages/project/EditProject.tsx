import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectService } from "../../services/ProjectService";

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const project = await ProjectService.getProjectById(id);
      if (project) {
        setName(project.name);
        setDescription(project.description);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async () => {
    if (!name.trim() || !description.trim() || !id) return;
    await ProjectService.updateProject({ id, name, description });
    navigate("/project");
  };

  if (loading) {
    return <div>Ładowanie danych projektu...</div>;
  }

  return (
    <div>
      <h2>Edytuj Projekt</h2>
      <input
        className="form-control mb-2"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control mb-2"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleUpdate}>
        💾 Zapisz zmiany
      </button>
    </div>
  );
}
