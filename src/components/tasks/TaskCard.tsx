import { Link } from "react-router-dom";
import { Card, Stack } from "react-bootstrap";
import { Task, TaskPriority } from "../../models/Task";
import { Status } from "../../models/Story";


interface TaskCardProps {
  projectId?: string;
  storyId?: string;
  task: Task;
}

export default function TaskCard({projectId, storyId, task}: TaskCardProps) {

  const getStatusColor = (status: Status): string => {
    switch (status) {
      case Status.ToDo:
        return "secondary";
      case Status.Doing:
        return "warning";
      case Status.Done:
        return "success";
      default:
        return "light";
    }
  };

  const getPriorityLabel = (priority: TaskPriority): string => {
    switch (priority) {
      case TaskPriority.Low:
        return "🟢 Niski";
      case TaskPriority.Medium:
        return "🟡 Średni";
      case TaskPriority.High:
        return "🔴 Wysoki";
      default:
        return "⚪ Nieznany";
    }
  };

  return (
      <Card className="mb-3">
        <Card.Header>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">Task Card</div>
          </Stack>
        </Card.Header>

        <Card.Body>
          <Card.Subtitle className="text-secondary fs-6 mb-1">
            name
          </Card.Subtitle>
          <Card.Title className="fs-5 mb-4">{task.name}</Card.Title>

          <Card.Subtitle className="text-secondary fs-6 mb-1">
            description
          </Card.Subtitle>
          <Card.Text className="fs-6 mb-4">{task.description}</Card.Text>

          <p className="mb-1">
            <strong>Priorytet:</strong> {getPriorityLabel(task.priority)}
          </p>
          <p className="mb-3">
            <strong>Estymacja:</strong> {task.estimatedHours} godz.
          </p>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-center">
          <Link
            to={`/project/${projectId}/stories/${storyId}/tasks/${task.id}`}
            className="btn btn-primary"
          >
            Details Task
          </Link>
        </Card.Footer>
      </Card>
  );
}
