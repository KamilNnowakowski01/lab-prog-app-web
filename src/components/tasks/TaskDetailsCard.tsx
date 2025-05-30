// src/components/StoryTaskCard.tsx
import { Card, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Task } from "../../models/Task";

interface TaskDetailsCardProps {
  task: Task;
  storyId?: string;
}

export default function TaskDetailsCard({ task, storyId }: TaskDetailsCardProps) {
  return (
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3} className="">
          <div>Details Task Card</div>
          <div className="ms-auto d-flex flex-wrap gap-2">
            <Link to={`/tasks/edit/${task.id}`} className="btn btn-warning">
              Edite
            </Link>
            <Link to={`/tasks/delete/${task.id}`} className="btn btn-danger">
              Delete
            </Link>
          </div>
        </Stack>
      </Card.Header>

      <Card.Body>
        <Card.Subtitle className="text-secondary fs-6 mb-1">name</Card.Subtitle>
        <Card.Title className="fs-5 mb-4">{task.name}</Card.Title>

        <Card.Subtitle className="text-secondary fs-6 mb-1">
          description
        </Card.Subtitle>
        <Card.Text>{task.description}</Card.Text>

        <Card.Subtitle className="text-secondary fs-6 mb-1">
          status
        </Card.Subtitle>
        <Card.Text>{task.status}</Card.Text>

        <Card.Subtitle className="text-secondary fs-6 mb-1">
          priorytet
        </Card.Subtitle>
        <Card.Text>{task.priority}</Card.Text>

        <Card.Subtitle className="text-secondary fs-6 mb-1">
          estimated hours
        </Card.Subtitle>
        <Card.Text>{task.estimatedHours}</Card.Text>

        <Card.Subtitle className="text-secondary fs-6 mb-1">
          created
        </Card.Subtitle>
        <Card.Text>{new Date(task.createdAt).toLocaleString()}</Card.Text>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-center">
        <div className="d-flex gap-2">
          <Link
            to={`/stories/${storyId}/tasks/`}
            className="btn btn-secondary"
          >
            Cancel
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}
