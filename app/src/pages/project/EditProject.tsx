import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectService } from "../../services/ProjectService";

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const project = ProjectService.getProjects().find((p) => p.id === id);
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [id]);

  const handleUpdate = () => {
    if (!name.trim() || !description.trim()) return;
    ProjectService.updateProject({ id: id!, name, description });
    navigate("/project");
  };

  return (
    <div>
      <h2>Edytuj Projekt</h2>
      <input className="form-control mb-2" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="form-control mb-2" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button className="btn btn-primary" onClick={handleUpdate}>💾 Zapisz zmiany</button>
    </div>
  );
}
