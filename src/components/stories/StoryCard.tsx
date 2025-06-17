import React from "react";
import { Link } from "react-router-dom";
import { Card, Stack } from "react-bootstrap";
import { Story } from "../../models/Story";

interface StoryCardProps {
  projectId?: string;
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, projectId }) => {
  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">Story Card</div>
          </Stack>
        </Card.Header>

        <Card.Body>
          <Card.Subtitle className="text-secondary fs-6 mb-1">
            name
          </Card.Subtitle>
          <Card.Title className="fs-5 mb-4">{story.name}</Card.Title>

          <Card.Subtitle className="text-secondary fs-6 mb-1">
            description
          </Card.Subtitle>
          <Card.Text className="fs-6 mb-4">{story.description}</Card.Text>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-center">
          <Link
            to={`/project/${projectId}/stories/${story.id}/`}
            className="btn btn-primary"
          >
            Details Story
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
};

export default StoryCard;
