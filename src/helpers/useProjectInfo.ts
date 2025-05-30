import { useEffect, useState } from "react";
import { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import { useProjectStore } from "../store/useProjectStore";


export function useProjectInfo() {
  const { activeProjectId, setActiveProject } = useProjectStore();

  const [project, setProject] = useState<Project | null>(null);
  const [loadingProject, setLoading] = useState(true);

  useEffect(() => {

    const fetchProject = async () => {
      if(project?.id !== activeProjectId){
        setLoading(true);
      }
      if(activeProjectId){
        const fetched = await ProjectService.getProjectById(activeProjectId);
        setProject(fetched);
        setLoading(false);
      }
    };

    fetchProject();
  }, [activeProjectId, setActiveProject]);

  return {
    project,
    loadingProject,
  };
}
