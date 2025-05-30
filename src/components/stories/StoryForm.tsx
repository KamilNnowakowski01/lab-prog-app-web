import { Form, Button, Col } from "react-bootstrap";
import { Status } from "../../models/Story";

type StoryFormProps = {
  name: string;
  description: string;
  status?: Status;
  onNameChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onStatusChange?: (val: Status) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
};

export default function StoryForm({
  name,
  description,
  status,
  onNameChange,
  onDescriptionChange,
  onStatusChange,
  onSubmit,
  onCancel,
  isEdit = false,
}: StoryFormProps) {
  return (
    <div className="d-flex justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <Form>
          {isEdit && status !== undefined && onStatusChange && (
            <Form.Group className="mb-4" controlId="formStoryStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => onStatusChange(e.target.value as Status)}
              >
                {Object.values(Status).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formStoryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter story name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formStoryDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant={isEdit ? "primary" : "success"} onClick={onSubmit}>
              {isEdit ? "Save" : "Create"}
            </Button>
          </div>
        </Form>
      </Col>
    </div>
  );
}
