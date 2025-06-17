import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../models/Story";
import { StoryService } from "../../services/StoryService";

export function useStory() {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storyId) return;
    setLoading(true);
    StoryService.getStoryById(storyId)
      .then(setStory)
      .finally(() => setLoading(false));
  }, [storyId]);

  return { story, loading };
}
