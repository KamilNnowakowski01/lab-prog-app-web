import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { Task, Status } from "../../models/Task";
import { TaskService } from "../../services/TaskService";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import TaskCard from "../../components/tasks/TaskCard";

export default function ListTasks() {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();

  const [tasks, setTasks] = useState<Task[]>([]);
  const { project, loadingProject } = useProject();
  const { story, loading: loadingStory } = useStory();

  const refreshTasks = async () => {
    if (!story?.id) return;
    const data = await TaskService.getTasksByStoryId(story.id);
    setTasks(data);
  };

  useEffect(() => {
    refreshTasks();
  }, [story?.id]);

  const renderTasks = (status: Status) =>
    tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <TaskCard
          key={task.id}
          projectId={projectId}
          storyId={storyId}
          task={task}
        />
      ));

  if (loadingProject || loadingStory) return <p>Loading...</p>;
  if (!project || !story)
    return (
      <p className="text-danger text-center mt-4">
        Project or story is not available.
      </p>
    );

  return (
    <div>
      <BeltBreadcrumb
        isProjectRoute
        projectId={project.id}
        projectName={project.name}
        isStoryRoute
        storyId={story.id}
        storyName={story.name}
        isTaskRoute
      />
      <TitleHeader
        title="Tasks List"
        rightContent={
          <Link
            to={`/project/${projectId}/stories/${story.id}/tasks/add`}
            className="btn btn-success ms-auto"
          >
            New Task
          </Link>
        }
      />

      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">📝 To Do</Card.Header>
            <Card.Body>{renderTasks(Status.ToDo)}</Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">🔨 Doing</Card.Header>
            <Card.Body>{renderTasks(Status.Doing)}</Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">✅ Done</Card.Header>
            <Card.Body>{renderTasks(Status.Done)}</Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
