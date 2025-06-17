// src/components/StoryTaskCard.tsx
import { Link } from "react-router-dom";
import { Card, Stack } from "react-bootstrap";
import { Task } from "../../models/Task";
import { Status } from "../../models/Story";
import { User } from "../../models/User";

interface TaskDetailsCardProps {
  task: Task;
  projectId?: string;
  storyId?: string;
  assignedUser?: User;
}

export default function TaskDetailsCard({
  task,
  projectId,
  storyId,
  assignedUser,
}: TaskDetailsCardProps) {
  return (
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3} className="">
          <div>Details Task Card</div>
          <div className="ms-auto d-flex flex-wrap gap-2">
            <Link
              to={`/project/${projectId}/stories/${storyId}/tasks/edit/${task.id}`}
              className="btn btn-warning"
            >
              Edite
            </Link>
            <Link
              to={`/project/${projectId}/stories/${storyId}/tasks/delete/${task.id}`}
              className="btn btn-danger"
            >
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

        {assignedUser && (
          <>
            <Card.Subtitle className="text-secondary fs-6 mb-1">assigned user</Card.Subtitle>
            <Card.Text>
              {assignedUser.name} ({assignedUser.role})
            </Card.Text>
          </>
        )}

        {task.startDate && (
          <>
            <Card.Subtitle className="text-secondary fs-6 mb-1">
              start date
            </Card.Subtitle>
            <Card.Text>{new Date(task.startDate).toLocaleString()}</Card.Text>
          </>
        )}

        {task.endDate && (
          <>
            <Card.Subtitle className="text-secondary fs-6 mb-1">
              end date
            </Card.Subtitle>
            <Card.Text>{new Date(task.endDate).toLocaleString()}</Card.Text>
          </>
        )}
      </Card.Body>

      <Card.Footer className="d-flex justify-content-center">
        <div className="d-flex gap-2">
          <Link
            to={`/project/${projectId}/stories/${storyId}/tasks/`}
            className="btn btn-secondary"
          >
            Cancel
          </Link>

          {task.status === Status.ToDo && (
            <Link
              to={`/project/${projectId}/stories/${storyId}/tasks/${task.id}/assign/`}
              className="btn btn-primary"
            >
              Assign
            </Link>
          )}

          {task.status === Status.Doing && (
            <Link
              to={`/project/${projectId}/stories/${storyId}/tasks/${task.id}/done/`}
              className="btn btn-primary"
            >
              Mark as Done
            </Link>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}
