import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";
import { useTaskStore } from "../store/useTaskStore";

export function useTaskInfo() {
  const { id } = useParams<{ id: string }>();
  const { activeTaskId } = useTaskStore();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const taskIdToLoad = id || activeTaskId;
      if (!taskIdToLoad) return;

      setLoading(true);
      const fetched = await TaskService.getTaskById(taskIdToLoad);
      setTask(fetched);
      setLoading(false);
    };

    fetchTask();
  }, [id, activeTaskId]);

  return {
    task,
    loading,
  };
}
