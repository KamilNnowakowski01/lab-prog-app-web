import { Container } from "react-bootstrap";
import { useEditTask } from "../../helpers/tasks/useEditTask";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import { useAssignTask } from "../../helpers/tasks/useAssignTask";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import TaskForm from "../../components/tasks/TaskForm";

export default function EditTasks() {
  const { project } = useProject();
  const { story } = useStory();
  const { task, loading, handleUpdate, handleCancel } = useEditTask();
  const { usersToAssign } = useAssignTask();

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
        usersToAssign={usersToAssign}
      />
    </Container>
  );
}
