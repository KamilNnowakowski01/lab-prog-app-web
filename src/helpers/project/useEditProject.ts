
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";

export function useEditProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    ProjectService.getProjectById(projectId)
      .then((data) => {
        if (data) {
          setProject(data);
          setName(data.name);
          setDescription(data.description);
        } else {
          console.warn("Project not found.");
        }
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleUpdate = async () => {
    if (!project) return;

    const updatedProject: Project = {
      ...project,
      name,
      description,
    };

    await ProjectService.updateProject(updatedProject);
    navigate(`/project/${project.id}`);
  };

  const handleCancel = () => {
    if (!projectId) return;
    navigate(`/project/${projectId}`);
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
