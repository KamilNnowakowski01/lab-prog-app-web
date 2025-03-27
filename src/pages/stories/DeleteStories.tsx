import { useParams, useNavigate } from "react-router-dom";
import { StoryService } from "../../services/StoryService";
import { Story } from "../../models/Story";

export default function DeleteStories() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story: Story | undefined = StoryService.getStories().find(story => story.id === id);

  const handleDelete = () => {
    if (story) {
      StoryService.deleteStory(story.id);
      navigate(`/project/${story.projectId}/stories`);
    }
  };

  if (!story) return <div className="text-danger">Nie znaleziono historyjki!</div>;

  return (
    <div>
      <h2>🗑️ Usuń Historyjkę</h2>
      <div className="alert alert-warning">
        Czy na pewno chcesz usunąć historyjkę?<p><strong>{story.name}</strong></p>
      </div>
      <button className="btn btn-danger me-2" onClick={handleDelete}>🗑️ Usuń</button>
      <button className="btn btn-secondary" onClick={() => navigate(`/project/${story.projectId}/stories`)}>Anuluj</button>
    </div>
  );
}
