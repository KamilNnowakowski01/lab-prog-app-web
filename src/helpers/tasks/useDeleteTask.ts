import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { TaskService } from "../../services/TaskService";

export function useDeleteTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      const data = await TaskService.getTaskById(id);
      setTask(data);
      setLoading(false);
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (task) {
      await TaskService.deleteTask(task.id);
      navigate("/tasks");
    }
  };

  return {
    task,
    loading,
    handleDelete,
  };
}
