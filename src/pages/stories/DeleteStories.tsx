import { Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { useDeleteStory } from "../../helpers/stories/useDeleteStory";
import { useProject } from "../../helpers/project/useProject";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";

export default function DeleteStories() {
  const { story, loading, handleDelete } = useDeleteStory();
  const { project, loadingProject } = useProject();

  if (loading || loadingProject) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border" role="status" />
        <p className="mt-3">Loading story...</p>
      </Container>
    );
  }

  if (!story) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">Story not found!</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <BeltBreadcrumb
        isProjectRoute
        projectId={project?.id}
        projectName={project?.name}
        isStoryRoute
        storyId={story.id}
        storyName={story.name}
        isDelete
      />
      <TitleHeader title="Delete Story" />
      <div className="d-flex justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="alert alert-warning">
            <p>
              Are you sure you want to delete the story{" "}
              <strong>{story.name}</strong>?
            </p>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link
              to={`/project/${story.projectId}/stories`}
              className="btn btn-secondary"
            >
              Cancel
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </Col>
      </div>
    </Container>
  );
}
