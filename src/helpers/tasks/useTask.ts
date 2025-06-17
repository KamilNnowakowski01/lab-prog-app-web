import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "../../models/Task";
import { TaskService } from "../../services/TaskService";

export function useTask() {
  const { tasksId } = useParams<{ tasksId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tasksId) return;
    setLoading(true);
    TaskService.getTaskById(tasksId)
      .then(setTask)
      .finally(() => setLoading(false));
  }, [tasksId]);

  return { task, loading };
}
