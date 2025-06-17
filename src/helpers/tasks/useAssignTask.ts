import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskService } from "../../services/TaskService";
import { useTask } from "./useTask";
import { User } from "../../models/User";
import { UserService } from "../../services/UserService";

export function useAssignTask() {
  const navigate = useNavigate();
  const { task } = useTask();
  const [usersToAssign, setUsersToAssign] = useState<User[]>([]);

  useEffect(() => {
    UserService.getByRoles(["developer", "devops"])
      .then(setUsersToAssign)
      .catch(console.error);
  }, []);

  const handleAssign = async (data: {
    name: string;
    description: string;
    priority: any;
    estimatedHours: number;
    status: any;
    assignedUserId?: string;
  }) => {
    if (!task || !data.assignedUserId) {
      console.warn("Missing task or assigned user.");
      return;
    }

    try {
      await TaskService.assignUser(task.id, data.assignedUserId);
      navigate(-1);
    } catch (err) {
      console.error("Error assigning user to task:", err);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    task,
    handleAssign,
    handleCancel,
    usersToAssign,
  };
}
