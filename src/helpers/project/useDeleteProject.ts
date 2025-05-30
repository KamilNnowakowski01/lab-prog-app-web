import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";

export function useDeleteProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const found = await ProjectService.getProjectById(id);
        setProject(found);
      } catch (err) {
        setError("Failed to load project.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      await ProjectService.deleteProject(id);
      navigate("/project");
    } catch (err) {
      setError("Failed to delete the project.");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    project,
    isLoading,
    isDeleting,
    error,
    handleDelete,
  };
}
