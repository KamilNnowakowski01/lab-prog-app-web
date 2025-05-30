import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskStore {
  activeTaskId: string | null;

  setActiveTask: (taskId: string) => void;
  clearActiveTask: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      activeTaskId: null,
      setActiveTask: (taskId) => set({ activeTaskId: taskId }),
      clearActiveTask: () => set({ activeTaskId: null }),
    }),
    {
      name: "active-task-store"
    }
  )
);
