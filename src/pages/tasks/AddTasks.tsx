import { Container } from "react-bootstrap";
import { useAddTask } from "../../helpers/tasks/useAddTask";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import TaskForm from "../../components/tasks/TaskForm";

export default function AddTasks() {
  const { project } = useProject();
  const { story } = useStory();
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
