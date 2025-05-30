import { useNavigate, useParams } from "react-router-dom";
import { TaskService } from "../../services/TaskService";
import { Status, TaskPriority } from "../../models/Task";

export function useAddTask() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    name: string;
    description: string;
    priority: TaskPriority;
    estimatedHours: number;
    status: Status; // wymagany od teraz
  }) => {
    if (!storyId) return;

    try {
      await TaskService.addTask({
        ...data,
        storyId,
      });
      navigate(`/stories/${storyId}/tasks`);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    handleSubmit,
    handleCancel,
  };
}
