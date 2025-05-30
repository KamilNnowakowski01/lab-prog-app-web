import React from "react";
import { Card, Button, CardFooter } from "react-bootstrap";
import { Project } from "../models/Project";
import { Link, useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card>
      <Card.Header>Project Card</Card.Header>

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
        <Link to={`/project/${project.id}`} className="btn btn-primary me-2">
          Details Project
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
