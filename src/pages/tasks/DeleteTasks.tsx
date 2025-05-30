import { Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TitleHeader from "../../components/TitleHeader";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useStoryInfo } from "../../helpers/useStoryInfo";
import { useDeleteTask } from "../../helpers/tasks/useDeleteTask";

export default function DeleteTasks() {
  const { project } = useProjectInfo();
  const { story } = useStoryInfo();
  const { task, loading, handleDelete } = useDeleteTask();

  if (loading) return <div>Ładowanie danych zadania...</div>;
  if (!task) return <div className="text-danger">Zadanie nie znalezione!</div>;

  return (
    <Container>
      <BeltBreadcrumb
        isProjectRoute
        projectId={project?.id}
        projectName={project?.name}
        isStoryRoute
        storyId={story?.id}
        storyName={story?.name}
        isTaskRoute
        taskId={task.id}
        taskName={task.name}
        isDelete
      />
      <TitleHeader title="Delete Task" />

      <div className="d-flex justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="alert alert-warning">
            Are you sure you want to delete the task
            <p>
              <strong>{task.name}</strong>?
            </p>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link to={`/tasks/${task.id}`} className="btn btn-secondary">
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
