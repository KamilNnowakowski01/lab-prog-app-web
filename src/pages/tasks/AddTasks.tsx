import { Container } from "react-bootstrap";
import TitleHeader from "../../components/TitleHeader";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TaskForm from "../../components/tasks/TaskForm";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useStoryInfo } from "../../helpers/useStoryInfo";
import { useAddTask } from "../../helpers/tasks/useAddTask";

export default function AddTasks() {
  const { project } = useProjectInfo();
  const { story } = useStoryInfo();
  const { handleSubmit, handleCancel } = useAddTask();

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
        isCreate
      />
      <TitleHeader title="New Task" />

      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Container>
  );
}
