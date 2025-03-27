import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { StoryService } from "../../services/StoryService";
import { Story, Status } from "../../models/Story";

export default function ItemStories() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    if (id) {
      const foundStory = StoryService.getStories().find(story => story.id === id);
      if (foundStory) {
        setStory(foundStory);
      }
    }
  }, [id]);

  if (!story) return <div className="text-danger">Nie znaleziono historyjki!</div>;

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case Status.ToDo: return "badge bg-secondary";
      case Status.Doing: return "badge bg-warning text-dark";
      case Status.Done: return "badge bg-success";
      default: return "badge bg-secondary";
    }
  };

  return (
    <div>
      <h2>📄 Szczegóły Historyjki</h2>

      <div className="card mt-3 mb-3">
        <div className="card-body">
          <h4>{story.name}</h4>
          <span className={getStatusBadge(story.status)}>{story.status}</span>
          <hr />
          <p>{story.description}</p>
          <hr />
          <p><strong>Data utworzenia:</strong> {new Date(story.createdAt).toLocaleString()}</p>
          <p><strong>ID Projektu:</strong> {story.projectId}</p>
          <p><strong>ID Właściciela:</strong> {story.ownerId}</p>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>⬅️ Wróć</button>
        <Link to={`/stories/edit/${story.id}`} className="btn btn-warning">✏️ Edytuj</Link>
        <Link to={`/stories/delete/${story.id}`} className="btn btn-danger">🗑️ Usuń</Link>
      </div>
    </div>
  );
}
