import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryService } from "../../services/StoryService";
import { useProjectStore } from "../../store/useProjectStore";
import { Status } from "../../models/Story";

export function useAddStory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { activeProjectId } = useProjectStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !activeProjectId) return;

    try {
      await StoryService.addStory({
        name,
        description,
        projectId: activeProjectId,
        status: Status.ToDo,
      });

      setName("");
      setDescription("");
      navigate(`/project/${activeProjectId}/stories`);
    } catch (error) {
      console.error("Error adding story:", error);
      alert("Coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  const handleCancel = () => {
    navigate("/stories");
  };

  return {
    name,
    description,
    setName,
    setDescription,
    handleSubmit,
    handleCancel,
    activeProjectId,
  };
}
