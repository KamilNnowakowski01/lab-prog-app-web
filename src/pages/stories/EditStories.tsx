import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoryService } from "../../services/StoryService";
import { Story } from "../../models/Story";
import { Status } from "../../models/Story";

export default function EditStories() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);

  useEffect(() => {
    if (id) {
      const foundStory = StoryService.getStories().find(story => story.id === id);
      if (foundStory) {
        setStory(foundStory);
        setName(foundStory.name);
        setDescription(foundStory.description);
        setStatus(foundStory.status);
      }
    }
  }, [id]);

  const handleSave = () => {
    if (story && name.trim() && description.trim()) {
      const updatedStory = { ...story, name, description, status };
      StoryService.updateStory(updatedStory);
      navigate(`/project/${story.projectId}/stories`);
      
    }
  };

  if (!story) return <div className="text-danger">Nie znaleziono historyjki!</div>;

  return (
    <div>
      <h2>✏️ Edytuj Historyjkę</h2>
      <div>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          className="form-control mb-2" 
          placeholder="Nazwa"
        />
        <textarea 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          className="form-control mb-2" 
          placeholder="Opis"
        />
        <select 
          className="form-select mb-2" 
          value={status} 
          onChange={e => setStatus(e.target.value as Status)}
        >
          <option value={Status.ToDo}>To Do</option>
          <option value={Status.Doing}>Doing</option>
          <option value={Status.Done}>Done</option>
        </select>
        <button className="btn btn-success" onClick={handleSave}>💾 Zapisz</button>
      </div>
    </div>
  );
}
