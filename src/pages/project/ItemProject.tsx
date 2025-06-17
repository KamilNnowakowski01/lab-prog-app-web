import { Container } from "react-bootstrap";
import { useProject } from "../../helpers/project/useProject";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import ProjectDetailsCard from "../../components/project/ProjectDetailsCard";

export default function ItemProject() {
  const { project, loadingProject } = useProject();

  if (loadingProject) {
    return <p>⏳ Loading project...</p>;
  }

  if (!project) {
    return <h2 className="text-danger">❌ Project not found!</h2>;
  }

  return (
    <div>
      <BeltBreadcrumb
        isProjectRoute
        projectId={project.id}
        projectName={project.name}
      />
      <TitleHeader title="Project" />
      <Container className="d-flex justify-content-center">
        <ProjectDetailsCard project={project} />
      </Container>
    </div>
  );
}
