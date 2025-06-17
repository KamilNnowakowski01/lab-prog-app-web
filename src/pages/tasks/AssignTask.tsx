import { Container } from "react-bootstrap";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import { useAssignTask } from "../../helpers/tasks/useAssignTask";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import TaskForm from "../../components/tasks/TaskForm";

export default function AssignTask() {
  const { project } = useProject();
  const { story } = useStory();
  const { task, handleAssign, handleCancel, usersToAssign } = useAssignTask();

  if (!task) return <p>Loading...</p>;

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
        isAssign
      />
      <TitleHeader title="Assign Task" />
      <TaskForm
        initialData={task}
        isAssign
        onSubmit={handleAssign}
        onCancel={handleCancel}
        usersToAssign={usersToAssign}
      />
    </Container>
  );
}
