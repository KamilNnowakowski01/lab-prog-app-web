import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Status, Task, TaskPriority } from "../../models/Task";
import { User } from "../../models/User";

type TaskFormProps = {
  initialData?: Partial<Task>;
  onSubmit: (data: {
    name: string;
    description: string;
    priority: TaskPriority;
    estimatedHours: number;
    status: Status;
    assignedUserId?: string;
  }) => void;
  isEdit?: boolean;
  isAssign?: boolean;
  isMarkDone?: boolean;
  usersToAssign?: User[];
  onCancel: () => void;
};

export default function TaskForm({
  initialData = {},
  onSubmit,
  isEdit = false,
  isAssign = false,
  isMarkDone = false,
  usersToAssign = [],
  onCancel,
}: TaskFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [priority, setPriority] = useState(
    initialData.priority || TaskPriority.Medium
  );
  const [estimatedHours, setEstimatedHours] = useState(
    initialData.estimatedHours || 0
  );
  const [status, setStatus] = useState<Status>(
    initialData.status || Status.ToDo
  );
  const [assignedUserId, setAssignedUserId] = useState(
    initialData.assignedUserId || ""
  );

  const isReadOnly = isAssign || isMarkDone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allowAssigneeEdit = isAssign || (isEdit && (status === Status.Doing || status === Status.Done));

    onSubmit({
      name,
      description,
      priority,
      estimatedHours,
      status,
      assignedUserId: allowAssigneeEdit ? assignedUserId : undefined,
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTaskName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isReadOnly}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isReadOnly}
            />
          </Form.Group>

          {isEdit && (
            <Form.Group className="mb-3" controlId="formTaskStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                disabled={isReadOnly}
              >
                {Object.values(Status).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formTaskPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              disabled={isReadOnly}
            >
              {Object.values(TaskPriority).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formEstimatedHours">
            <Form.Label>Estimated Hours</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(Number(e.target.value))}
              disabled={isReadOnly}
            />
          </Form.Group>

          {(isMarkDone ||
            isAssign ||
            (isEdit &&
              (status === Status.Doing || status === Status.Done))) && (
            <Form.Group className="mb-4" controlId="formAssignedUser">
              <Form.Label>Assign to</Form.Label>
              <Form.Select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                disabled={isMarkDone}
              >
                <option value="">-- Select User --</option>

                {assignedUserId &&
                  !usersToAssign.find((u) => u.id === assignedUserId) && (
                    <option value={assignedUserId}>
                      {assignedUserId} (not in list)
                    </option>
                  )}

                {usersToAssign.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={
                isMarkDone
                  ? false
                  : (isAssign && !assignedUserId) ||
                    !name.trim() ||
                    !description.trim()
              }
            >
              {isEdit
                ? "Save"
                : isAssign
                ? "Assign"
                : isMarkDone
                ? "Mark as Done"
                : "Create"}
            </Button>
          </div>
        </Form>
      </Col>
    </div>
  );
}
