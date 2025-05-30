import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectService } from "../../services/ProjectService";

export function useEditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const project = await ProjectService.getProjectById(id);
        if (project) {
          setName(project.name);
          setDescription(project.description);
          setProjectId(project.id);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async () => {
    if (!name.trim() || !description.trim() || !projectId) return;
    await ProjectService.updateProject({ id: projectId, name, description });
    navigate(`/project/${projectId}`);
  };

  const handleCancel = () => {
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };

  return {
    name,
    description,
    projectId,
    loading,
    setName,
    setDescription,
    handleUpdate,
    handleCancel,
  };
}
