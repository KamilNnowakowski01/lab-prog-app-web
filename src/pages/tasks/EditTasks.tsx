import { Container } from "react-bootstrap";
import TitleHeader from "../../components/TitleHeader";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TaskForm from "../../components/tasks/TaskForm";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useStoryInfo } from "../../helpers/useStoryInfo";
import { useEditTask } from "../../helpers/tasks/useEditTask";
;

export default function EditTasks() {
  const { project } = useProjectInfo();
  const { story } = useStoryInfo();
  const { task, loading, handleUpdate, handleCancel } = useEditTask();

  if (loading || !task) return <div>Ładowanie danych zadania...</div>;

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
        isEdit
      />
      <TitleHeader title="Edit Task" />

      <TaskForm
        isEdit
        initialData={task}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </Container>
  );
}
