import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Task } from "../../models/Task";
import { TaskService } from "../../services/TaskService";

export function useDeleteTask() {
  const { projectId, storyId, tasksId } = useParams<{
    projectId: string;
    storyId: string;
    tasksId: string;
  }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tasksId) return;

    setLoading(true);
    TaskService.getTaskById(tasksId)
      .then((data) => {
        if (data) setTask(data);
        else console.warn("Task not found");
      })
      .finally(() => setLoading(false));
  }, [tasksId]);

  const handleDelete = async () => {
    if (!tasksId || !projectId || !storyId) return;
    await TaskService.deleteTask(tasksId);
    navigate(`/project/${projectId}/stories/${storyId}/tasks`);
  };

  return {
    task,
    loading,
    handleDelete,
  };
}
