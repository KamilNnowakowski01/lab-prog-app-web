import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { Task, Status } from "../../models/Task";
import { TaskService } from "../../services/TaskService";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useStoryInfo } from "../../helpers/useStoryInfo";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import { useTaskStore } from "../../store/useTaskStore";
import TitleHeader from "../../components/TitleHeader";
import TaskCard from "../../components/tasks/TaskCard";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { project, loadingProject } = useProjectInfo();
  const { story, loading: loadingStory } = useStoryInfo();

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
      .map((task) => <TaskCard key={task.id} task={task} />);

  if (loadingProject || loadingStory) return <p>⏳ Ładowanie danych...</p>;
  if (!project || !story)
    return <p className="text-danger">Brak aktywnego projektu lub historii.</p>;

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
        title="List Tasks"
        rightContent={
          <Link to={`/stories/${story.id}/tasks/add`} className="btn btn-success ms-auto">
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
