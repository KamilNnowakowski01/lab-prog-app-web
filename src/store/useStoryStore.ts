import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoryStore {
  activeStoryId: string | null;

  setActiveStory: (storyId: string) => void;
  clearActiveStory: () => void;
}

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      activeStoryId: null,
      setActiveStory: (storyId) => set({ activeStoryId: storyId }),
      clearActiveStory: () => set({ activeStoryId: null }),
    }),
    {
      name: "active-story-store"
    }
  )
);
