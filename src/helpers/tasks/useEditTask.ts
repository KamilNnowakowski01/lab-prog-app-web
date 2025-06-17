import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Task } from "../../models/Task";
import { TaskService } from "../../services/TaskService";

export function useEditTask() {
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
      .then(setTask)
      .finally(() => setLoading(false));
  }, [tasksId]);

  const handleUpdate = async (updatedData: Partial<Task>) => {
    if (!task || !projectId || !storyId) return;

    const updatedTask: Task = {
      ...task,
      ...updatedData,
    };

    await TaskService.updateTask(updatedTask);
    navigate(`/project/${projectId}/stories/${storyId}/tasks/`);
  };

  const handleCancel = () => {
    if (!projectId || !storyId) return;
    navigate(`/project/${projectId}/stories/${storyId}/tasks/${tasksId}`);
  };

  return {
    task,
    loading,
    handleUpdate,
    handleCancel,
  };
}
