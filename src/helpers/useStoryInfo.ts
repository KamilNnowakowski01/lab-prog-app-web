import { useEffect, useState } from "react";
import { Story } from "../models/Story";
import { StoryService } from "../services/StoryService";
import { useStoryStore } from "../store/useStoryStore";


export function useStoryInfo() {
  const { activeStoryId } = useStoryStore();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (story?.id !== activeStoryId) {
        setLoading(true);
      }
      if (activeStoryId) {
        const fetched = await StoryService.getStoryById(activeStoryId);
        setStory(fetched);
        setLoading(false);
      }
    };

    fetchStory();
  }, [activeStoryId]);

  return {
    story,
    loading,
  };
}
