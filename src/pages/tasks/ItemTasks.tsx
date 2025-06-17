import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import { useTask } from "../../helpers/tasks/useTask";
import { useUser } from "../../helpers/useUser";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import TaskDetailsCard from "../../components/tasks/TaskDetailsCard";

export default function ItemTasks() {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();

  const { project, loadingProject } = useProject();
  const { story, loading: loadingStory } = useStory();
  const { task, loading: loadingTask } = useTask();

  const { user: assignedUser } = useUser(task?.assignedUserId ?? undefined);

  if (loadingProject || loadingStory || loadingTask) {
    return <div>Loading task...</div>;
  }

  if (!project || !story || !task) {
    return (
      <div className="text-danger text-center mt-4">
        Task, story, or project not found!
      </div>
    );
  }

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
        taskId={task.id}
        taskName={task.name}
      />
      <TitleHeader title="Task" />

      <Container className="d-flex justify-content-center">
        <TaskDetailsCard
          task={task}
          storyId={storyId}
          projectId={projectId}
          assignedUser={assignedUser}
        />
      </Container>
    </div>
  );
}
