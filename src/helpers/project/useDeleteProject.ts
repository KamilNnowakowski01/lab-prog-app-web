import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";

export function useDeleteProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    ProjectService.getProjectById(projectId)
      .then((data) => {
        if (data) {
          setProject(data);
        } else {
          console.warn("Project not found.");
        }
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleDelete = async () => {
    if (!projectId) return;
    await ProjectService.deleteProject(projectId);
    navigate("/project");
  };

  const handleCancel = () => {
    if (!projectId) return;
    navigate(`/project/${projectId}`);
  };

  return {
    project,
    loading,
    handleDelete,
    handleCancel,
  };
}
