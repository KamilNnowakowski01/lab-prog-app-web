import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "../../services/ProjectService";

export function useAddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) return;
    await ProjectService.addProject({ name, description });
    navigate("/project");
  };

  const handleCancel = () => {
    navigate("/project");
  };

  return {
    name,
    description,
    setName,
    setDescription,
    handleSubmit,
    handleCancel,
  };
}
