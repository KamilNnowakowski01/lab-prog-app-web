import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryService } from "../../services/StoryService";
import { useProjectStore } from "../../store/useProjectStore";
import { Status } from "../../models/Story";

export default function AddStory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { activeProjectId } = useProjectStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !description || !activeProjectId) return;

    try {
      await StoryService.addStory({
        name,
        description,
        projectId: activeProjectId,
        status: Status.ToDo
      });

      // Reset form after submitting
      setName("");
      setDescription("");

      // Navigate to the project stories page
      navigate(`/project/${activeProjectId}/stories`);
    } catch (error) {
      console.error("Error adding story:", error);
      alert("Coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h2>Dodaj Nową Historyjkę</h2>
      <input
        type="text"
        placeholder="Nazwa"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control mb-2"
      />
      <textarea
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control mb-2"
      ></textarea>
      <button className="btn btn-success" onClick={handleSubmit}>💾 Zapisz</button>
    </div>
  );
}
