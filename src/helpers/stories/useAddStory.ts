import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Status } from "../../models/Story";
import { StoryService } from "../../services/StoryService";

export function useAddStory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !projectId) return;

    try {
      await StoryService.addStory({
        name,
        description,
        projectId: projectId,
        status: Status.ToDo,
      });

      setName("");
      setDescription("");
      navigate(`/project/${projectId}/stories`);
    } catch (error) {
      console.error("Error adding story:", error);
      alert("Coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  const handleCancel = () => {
    navigate(`/project/${projectId}/stories`);
  };

  return {
    name,
    description,
    setName,
    setDescription,
    handleSubmit,
    handleCancel,
    projectId,
  };
}
