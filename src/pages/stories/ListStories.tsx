import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Story, Status } from "../../models/Story";
import { StoryService } from "../../services/StoryService";
import { useProjectStore } from "../../store/useProjectStore";
import { ProjectService } from "../../services/ProjectService";
import StoryItem from "../../components/StoryItem";

export default function ListStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [projectName, setProjectName] = useState<string | null>(null);
  const { activeProjectId } = useProjectStore();

  const refreshStories = async () => {
    if (activeProjectId) {
      const allStories = await StoryService.getStories();
      const filteredStories = allStories.filter(story => story.projectId === activeProjectId);
      setStories(filteredStories);

      const allProjects = await ProjectService.getProjects();
      const activeProject = allProjects.find(p => p.id === activeProjectId);
      if (activeProject) {
        setProjectName(activeProject.name);
      }
    }
  };

  useEffect(() => {
    refreshStories();
  }, [activeProjectId]);

  const renderStories = (status: Status) => (
    stories
      .filter(story => story.status === status)
      .map(story => (
        <StoryItem key={story.id} story={story} refreshStories={refreshStories} />
      ))
  );

  if (!activeProjectId) return <div className="text-danger">Wybierz projekt, aby zobaczyć historyjki!</div>;

  return (
    <div>
      <h1 className="mb-4 text-primary">📁 {projectName}</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Kanban - Historyjki</h2>
        <Link to={`/project/${activeProjectId}/stories/add`} className="btn btn-success">➕ Dodaj historyjkę</Link>
      </div>

      <div className="row">
        <div className="col">
          <h3>📝 To Do</h3>
          {renderStories(Status.ToDo)}
        </div>
        <div className="col">
          <h3>🔨 Doing</h3>
          {renderStories(Status.Doing)}
        </div>
        <div className="col">
          <h3>✅ Done</h3>
          {renderStories(Status.Done)}
        </div>
      </div>
    </div>
  );
}
