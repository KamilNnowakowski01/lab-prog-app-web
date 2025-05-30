import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StoryService } from "../../services/StoryService";
import { Story } from "../../models/Story";

export function useDeleteStory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;
      try {
        const foundStory = await StoryService.getStoryById(id);
        setStory(foundStory);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleDelete = async () => {
    if (!story) return;
    await StoryService.deleteStory(story.id);
    navigate(`/project/${story.projectId}/stories`);
  };

  return {
    story,
    loading,
    handleDelete,
  };
}
