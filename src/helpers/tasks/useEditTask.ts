import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskService } from "../../services/TaskService";
import { useTaskStore } from "../../store/useTaskStore";
import { useTaskInfo } from "../../helpers/useTaskInfo";
import { Task } from "../../models/Task";

export function useEditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { setActiveTask } = useTaskStore();
  const { task, loading } = useTaskInfo();

  useEffect(() => {
    if (id) {
      setActiveTask(id);
    }
  }, [id, setActiveTask]);

  const handleUpdate = async (updatedData: Partial<Task>) => {
    if (!task) return;

    try {
      await TaskService.updateTask({
        ...task,
        ...updatedData,
      });

      navigate(`/stories/${task.storyId}/tasks`);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Błąd zapisu. Spróbuj ponownie.");
    }
  };

  const handleCancel = () => {
    if (task) navigate(`/stories/${task.storyId}/tasks`);
    else navigate(-1);
  };

  return {
    task,
    loading,
    handleUpdate,
    handleCancel,
  };
}
