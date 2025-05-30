import React from "react";
import { Card, Button, CardFooter, Stack } from "react-bootstrap";
import { Project } from "../models/Project";
import { Link, useNavigate } from "react-router-dom";
import { Status, Story } from "../../models/Story";
import { useStoryStore } from "../../store/useStoryStore";
import StoryDetailsCard from "./StoryDetailsCard";
import { useStoryInfo } from "../../helpers/useStoryInfo";

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const { setActiveStory } = useStoryStore();


  const handleSelect = () => {
    setActiveStory(story.id);
  };

  return (
    <>
     <Card className="mb-3">
      <Card.Header>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">Story Card</div>
        </Stack>
      </Card.Header>

      <Card.Body>
        <Card.Subtitle className="text-secondary fs-6 mb-1">name</Card.Subtitle>
        <Card.Title className="fs-5 mb-4">{story.name}</Card.Title>

        <Card.Subtitle className="text-secondary fs-6 mb-1">
          description
        </Card.Subtitle>
        <Card.Text className="fs-6 mb-4">
          {story.description}
        </Card.Text>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-center">
        <Link
            to={`/stories/${story.id}`}
            className="btn btn-primary"
            onClick={handleSelect}
          >
          Details Story
        </Link>
      </Card.Footer>
    </Card>

    </>
  );
};

export default StoryCard;
