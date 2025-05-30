// src/pages/tasks/ItemTasks.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { TaskService } from "../../services/TaskService";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useStoryInfo } from "../../helpers/useStoryInfo";
import { useTaskInfo } from "../../helpers/useTaskInfo";
import { useTaskStore } from "../../store/useTaskStore";
import TitleHeader from "../../components/TitleHeader";
import { Card, Container, Stack } from "react-bootstrap";
import TaskDetailsCard from "../../components/tasks/TaskDetailsCard";

export default function ItemTasks() {
  const { id } = useParams<{ id: string }>();
  const { setActiveTask } = useTaskStore();
  const navigate = useNavigate();

  const { project, loadingProject } = useProjectInfo();
  const { story, loading: loadingStory } = useStoryInfo();
  const { task, loading: loadingTask } = useTaskInfo();

  useEffect(() => {
    if (id) setActiveTask(id);
  }, [id]);

  if (!task) return <div>Ładowanie zadania...</div>;

  return (
    <div>
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
      />
      <TitleHeader title="Task" />

      <Container className="d-flex justify-content-center">
        <TaskDetailsCard task={task} storyId={story?.id} />
      </Container>
    </div>
  );
}
