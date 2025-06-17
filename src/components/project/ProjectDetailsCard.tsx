import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Stack } from "react-bootstrap";
import { Project } from "../../models/Project";

interface ProjectDetailsCardProps {
  project: Project;
}

const ProjectDetailsCard: React.FC<ProjectDetailsCardProps> = ({ project }) => {
  return (
    <Card style={{ maxWidth: "600px" }}>
      <Card.Header>
        <Stack direction="horizontal" gap={3} className="">
          <div>Details Project Card</div>
          <div className="ms-auto d-flex flex-wrap gap-2">
            <Link to={`/project/edit/${project.id}`}>
              <Button variant="warning">Edite</Button>
            </Link>
            <Link to={`/project/delete/${project.id}`}>
              <Button variant="danger">Delete</Button>
            </Link>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="text-secondary fs-6 mb-1">name</Card.Subtitle>
        <Card.Title className="fs-5 mb-4">{project.name}</Card.Title>
        <Card.Subtitle className="text-secondary fs-6 mb-1">
          description
        </Card.Subtitle>
        <Card.Text className="fs-6 mb-4" style={{ minHeight: 50 }}>
          {project.description}
        </Card.Text>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-center">
        <div className="d-flex flex-wrap gap-2">
          <Link to={`/project/`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/project/${project.id}/stories`}>
            <Button variant="primary">Open Stories</Button>
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProjectDetailsCard;
