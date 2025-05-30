import { Form, Button, Col } from "react-bootstrap";

type ProjectFormProps = {
  name: string;
  description: string;
  onNameChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
};

export default function ProjectForm({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
  isEdit = false,
}: ProjectFormProps) {
  return (
    <div className="d-flex justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <Form>
          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formProjectDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
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
