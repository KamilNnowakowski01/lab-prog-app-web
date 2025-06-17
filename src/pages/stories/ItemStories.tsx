import { Container } from "react-bootstrap";
import { useProject } from "../../helpers/project/useProject";
import { useStory } from "../../helpers/stories/useStory";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import StoryDetailsCard from "../../components/stories/StoryDetailsCard";

export default function ItemStories() {
  const { project, loadingProject } = useProject();
  const { story, loading } = useStory();

  if (loadingProject || loading) return <div>Loading...</div>;

  if (!project || !story) {
    return (
      <div className="text-danger text-center mt-4">
        Story or project not found!
      </div>
    );
  }

  return (
    <div>
      <BeltBreadcrumb
        isProjectRoute
        projectId={project.id}
        projectName={project.name}
        isStoryRoute
        storyId={story.id}
        storyName={story.name}
      />
      <TitleHeader title="Story" />

      <Container className="d-flex justify-content-center">
        <StoryDetailsCard projectId={project.id} story={story} />
      </Container>
    </div>
  );
}
