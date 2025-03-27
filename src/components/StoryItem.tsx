import { Story, Status } from "../models/Story";
import { StoryService } from "../services/StoryService";
import { Link } from "react-router-dom";

interface StoryItemProps {
  story: Story;
  refreshStories: () => void;
}

export default function StoryItem({ story, refreshStories }: StoryItemProps) {

  const handleStatusChange = (newStatus: Status) => {
    if (story.status === newStatus) return;

    const updatedStory = { ...story, status: newStatus };
    StoryService.updateStory(updatedStory);
    refreshStories();
  };

  const getStatusButtonClass = (status: Status) => {
    return story.status === status 
      ? "btn btn-" + getButtonColor(status) 
      : "btn btn-outline-" + getButtonColor(status);
  };

  const getButtonColor = (status: Status) => {
    switch (status) {
      case Status.ToDo: return "secondary";
      case Status.Doing: return "warning";
      case Status.Done: return "success";
      default: return "secondary";
    }
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        
        <div className="card-header">
          <h5>{story.name}</h5>
        </div>
        <div className="card-body mb-3">
          <p className="card-text mb-3">{story.description}</p>
        </div>

        <hr />

        <div className="d-flex gap-2 mb-2 justify-content-center">
          <button 
            className={getStatusButtonClass(Status.ToDo)} 
            onClick={() => handleStatusChange(Status.ToDo)}
          >
            To Do
          </button>
          <button 
            className={getStatusButtonClass(Status.Doing)} 
            onClick={() => handleStatusChange(Status.Doing)}
          >
            Doing
          </button>
          <button 
            className={getStatusButtonClass(Status.Done)} 
            onClick={() => handleStatusChange(Status.Done)}
          >
            Done
          </button>
        </div>

        <div className="d-flex justify-content-center gap-2">
          <Link to={`/stories/${story.id}`} className="btn btn-primary">📄 Szczegóły</Link>
        </div>
      </div>
    </div>
  );
}
