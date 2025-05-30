import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useProjectStore } from "../../store/useProjectStore";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container, Stack } from "react-bootstrap";
import TitleHeader from "../../components/TitleHeader";
import ProjectDetailsCard from "../../components/project/ProjectDetailsCard";

export default function ItemProject() {
  const { id } = useParams<{ id: string }>();
  const { setActiveProject } = useProjectStore();
  const { project, loadingProject } = useProjectInfo();

  useEffect(() => {
    if (id) {
      setActiveProject(id);
    }
  }, [id, setActiveProject]);

  if (loadingProject) return <p>Ładowanie projektu...</p>;
  if (!project) return <h2 className="text-danger">Projekt nie znaleziony!</h2>;

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
