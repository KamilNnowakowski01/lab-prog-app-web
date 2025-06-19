import React from "react";
import { Link } from "react-router-dom";
import { Card, Stack } from "react-bootstrap";
import { Story } from "../../models/Story";

interface StoryDetailsCardProps {
  projectId: string;
  story: Story;
}

const StoryDetailsCard: React.FC<StoryDetailsCardProps> = ({
  story,
  projectId,
}) => {
  return (
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3} className="">
          <div>Details Story Card</div>
          <div className="ms-auto d-flex flex-wrap gap-2">
            <Link
              to={`/project/${projectId}/stories/edit/${story.id}`}
              className="btn btn-warning"
            >
              Edit
            </Link>
            <Link
              to={`/project/${projectId}/stories/delete/${story.id}`}
              className="btn btn-danger"
            >
              Delete
            </Link>
          </div>
        </Stack>
      </Card.Header>

      <Card.Body>
        <Card.Subtitle className="text-secondary fs-6 mb-1">
          status
        </Card.Subtitle>
        <Card.Title className="fs-5 mb-4">{story.status}</Card.Title>

        <Card.Subtitle className="text-secondary fs-6 mb-1">name</Card.Subtitle>
        <Card.Title className="fs-5 mb-4">{story.name}</Card.Title>

        <Card.Subtitle className="text-secondary fs-6 mb-1">
          description
        </Card.Subtitle>
        <Card.Text style={{ minHeight: 50 }}>{story.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        <div className="d-flex flex-wrap gap-2">
          <Link
            to={`/project/${projectId}/stories`}
            className="btn btn-secondary"
          >
            Cancel
          </Link>
          <Link
            to={`/project/${projectId}/stories/${story.id}/tasks/`}
            className="btn btn-primary"
          >
            Open Tasks
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StoryDetailsCard;
