import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { Story, Status } from "../../models/Story";
import { StoryService } from "../../services/StoryService";
import { useProject } from "../../helpers/project/useProject";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import StoryCard from "../../components/stories/StoryCard";

export default function ListStories() {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const { project, loadingProject } = useProject();

  useEffect(() => {
    if (!project?.id) return;
    const fetchStories = async () => {
      const data = await StoryService.getStoriesByProjectId(project.id);
      setStories(data);
    };
    fetchStories();
  }, [project?.id]);

  const renderStories = (status: Status) =>
    stories
      .filter((story) => story.status === status)
      .map((story) => (
        <StoryCard key={story.id} projectId={projectId} story={story} />
      ));

  if (loadingProject) return <p>Loading project...</p>;

  if (!project) {
    return (
      <div className="text-danger text-center mt-4">
        Please select a project to see its stories.
      </div>
    );
  }

  return (
    <div>
      <BeltBreadcrumb
        isProjectRoute
        projectId={project.id}
        projectName={project.name}
        isStoryRoute
      />
      <TitleHeader
        title="Stories List"
        rightContent={
          <Link
            to={`/project/${project.id}/stories/add`}
            className="btn btn-success ms-auto"
          >
            New Story
          </Link>
        }
      />

      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">📝 To Do</Card.Header>
            <Card.Body>{renderStories(Status.ToDo)}</Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">🔨 Doing</Card.Header>
            <Card.Body>{renderStories(Status.Doing)}</Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">✅ Done</Card.Header>
            <Card.Body>{renderStories(Status.Done)}</Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
