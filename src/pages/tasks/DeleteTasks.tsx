import { Container, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDeleteTask } from "../../helpers/tasks/useDeleteTask";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";

export default function DeleteTasks() {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();
  const { project } = useProject();
  const { story } = useStory();
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
            <Link to={`/project/${projectId}/stories/${storyId}/tasks/${task.id}`} className="btn btn-secondary">
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
