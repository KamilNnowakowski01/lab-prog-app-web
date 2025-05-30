import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import TitleHeader from "../../components/TitleHeader";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useDeleteStory } from "../../helpers/stories/useDeleteStory";

export default function DeleteStories() {
  const { story, loading, handleDelete } = useDeleteStory();
  const { project } = useProjectInfo();

  if (loading) return <div>Ładowanie danych historyjki...</div>;

  if (!story)
    return <div className="text-danger">Nie znaleziono historyjki!</div>;

  return (
    <div>
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
            Are you sure you want to delete the story
            <p>
              <strong>{story.name}</strong>?
            </p>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link to={`/stories/${story.projectId}`} className="btn btn-secondary">
              Cancel
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </Col>
      </div>
    </div>
  );
}
