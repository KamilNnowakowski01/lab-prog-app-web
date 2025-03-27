import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectStore {
  
  activeProjectId: string | null;
  
  setActiveProject: (projectId: string) => void;
  clearActiveProject: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      activeProjectId: null,
      setActiveProject: (projectId) => set({ activeProjectId: projectId }),
      clearActiveProject: () => set({ activeProjectId: null })
    }),
    {
      name: "active-project-store"
    }
  )
);
