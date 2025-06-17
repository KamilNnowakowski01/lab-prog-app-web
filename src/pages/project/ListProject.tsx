import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import ProjectCard from "../../components/project/ProjectCard";

export default function ListProject() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await ProjectService.getProjects();
      setProjects(allProjects);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <BeltBreadcrumb isProjectRoute />
      <TitleHeader
        title="Projects List"
        rightContent={
          <Link to="/project/add" className="btn btn-success ms-auto">
            New Project
          </Link>
        }
      />
      {projects.length === 0 ? (
        <p className="text-muted">No projects to display.</p>
      ) : (
        <Row className="g-4">
          {projects.map((project) => (
            <Col key={project.id} xs={12} md={6} lg={4}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
