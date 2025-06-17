import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Story } from "../../models/Story";
import { StoryService } from "../../services/StoryService";

export function useDeleteStory() {
  const { storyId, projectId } = useParams<{
    storyId: string;
    projectId: string;
  }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storyId) return;

    setLoading(true);
    StoryService.getStoryById(storyId)
      .then((data) => {
        if (data) setStory(data);
        else console.warn("Story not found");
      })
      .finally(() => setLoading(false));
  }, [storyId]);

  const handleDelete = async () => {
    if (!storyId || !projectId) return;
    await StoryService.deleteStory(storyId);
    navigate(`/project/${projectId}/stories`);
  };

  return {
    story,
    loading,
    handleDelete,
  };
}
