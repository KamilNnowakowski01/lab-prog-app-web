import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";

export function useProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    if (!projectId) return;
    setLoadingProject(true);
    ProjectService.getProjectById(projectId)
      .then(setProject)
      .finally(() => setLoadingProject(false));
  }, [projectId]);

  return { project, loadingProject };
}
