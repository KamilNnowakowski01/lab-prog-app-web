import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "../../services/ProjectService";
import { v4 as uuidv4 } from "uuid";

export default function AddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) return;
    ProjectService.addProject({ name, description });
    navigate("/project");
  };

  return (
    <div>
      <h2>Dodaj Projekt</h2>
      <input className="form-control mb-2" type="text" placeholder="Nazwa" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="form-control mb-2" type="text" placeholder="Opis" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button className="btn btn-success" onClick={handleSubmit}>💾 Zapisz</button>
    </div>
  );
}
