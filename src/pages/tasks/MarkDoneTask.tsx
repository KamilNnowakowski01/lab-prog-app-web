import { Container } from "react-bootstrap";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import { useMarkDoneTask } from "../../helpers/tasks/useMarkDoneTask";
import { useAssignTask } from "../../helpers/tasks/useAssignTask";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import TaskForm from "../../components/tasks/TaskForm";

export default function MarkDoneTask() {
  const { project } = useProject();
  const { story } = useStory();
  const { usersToAssign } = useAssignTask();
  const { task, handleMarkDone, handleCancel } = useMarkDoneTask();

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
        isMarkAsDone
      />
      <TitleHeader title="Mark Task as Done" />
      <TaskForm
        initialData={task}
        isMarkDone
        onSubmit={() => handleMarkDone()}
        onCancel={handleCancel}
        usersToAssign={usersToAssign}
      />
    </Container>
  );
}
