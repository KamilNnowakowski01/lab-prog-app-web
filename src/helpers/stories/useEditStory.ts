import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Story, Status } from "../../models/Story";
import { StoryService } from "../../services/StoryService";

export function useEditStory() {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<Story | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      try {
        const foundStory = await StoryService.getStoryById(storyId);
        if (foundStory) {
          setStory(foundStory);
          setName(foundStory.name);
          setDescription(foundStory.description);
          setStatus(foundStory.status);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  const handleUpdate = async () => {
    if (!story || !projectId || !name.trim() || !description.trim()) return;

    const updatedStory: Story = {
      ...story,
      name,
      description,
      status,
    };

    await StoryService.updateStory(updatedStory);
    navigate(`/project/${projectId}/stories/${story.id}`);
  };

  const handleCancel = () => {
    if (story && projectId) {
      navigate(`/project/${projectId}/stories/${story.id}`);
    }
  };

  return {
    story,
    name,
    description,
    status,
    loading,
    setName,
    setDescription,
    setStatus,
    handleUpdate,
    handleCancel,
  };
}
