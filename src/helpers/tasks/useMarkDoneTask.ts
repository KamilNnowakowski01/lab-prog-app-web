import { useNavigate } from "react-router-dom";
import { TaskService } from "../../services/TaskService";
import { useTask } from "./useTask";

export function useMarkDoneTask() {
  const navigate = useNavigate();
  const { task } = useTask();

  const handleMarkDone = async () => {
    if (!task) {
      console.warn("Missing task.");
      return;
    }

    try {
      await TaskService.markDone(task.id);
      navigate(-1);
    } catch (err) {
      console.error("Error marking task as done:", err);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    task,
    handleMarkDone,
    handleCancel,
  };
}
