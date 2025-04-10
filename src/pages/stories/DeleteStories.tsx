import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StoryService } from "../../services/StoryService";
import { Story } from "../../models/Story";

export default function DeleteStories() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;
      const foundStory = await StoryService.getStoryById(id);
      setStory(foundStory);
      setLoading(false);
    };

    fetchStory();
  }, [id]);

  const handleDelete = async () => {
    if (story) {
      await StoryService.deleteStory(story.id);
      navigate(`/project/${story.projectId}/stories`);
    }
  };

  if (loading) return <div>Ładowanie danych historyjki...</div>;

  if (!story) return <div className="text-danger">Nie znaleziono historyjki!</div>;

  return (
    <div>
      <h2>🗑️ Usuń Historyjkę</h2>
      <div className="alert alert-warning">
        Czy na pewno chcesz usunąć historyjkę?
        <p><strong>{story.name}</strong></p>
      </div>
      <button className="btn btn-danger me-2" onClick={handleDelete}>🗑️ Usuń</button>
      <button className="btn btn-secondary" onClick={() => navigate(`/project/${story.projectId}/stories`)}>Anuluj</button>
    </div>
  );
}
