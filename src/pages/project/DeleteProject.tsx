import { Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TitleHeader from "../../components/TitleHeader";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import { useDeleteProject } from "../../helpers/project/useDeleteProject";

export default function DeleteProject() {
  const {
    project,
    isLoading,
    isDeleting,
    error,
    handleDelete,
  } = useDeleteProject();

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border" role="status" />
        <p className="mt-3">Loading project...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">Project not found!</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <BeltBreadcrumb
        isProjectRoute
        projectId={project.id}
        projectName={project.name}
        isDelete
      />
      <TitleHeader title="Delete Project" />
      <div className="d-flex justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="alert alert-warning">
            <p>
              Are you sure you want to delete the project{" "}
              <strong>{project.name}</strong>?
            </p>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link to={`/project/${project.id}`} className="btn btn-secondary">
              Cancel
            </Link>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Col>
      </div>
    </Container>
  );
}
