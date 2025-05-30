import { useNavigate, Link } from "react-router-dom";
import { Status } from "../../models/Story";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useStoryInfo } from "../../helpers/useStoryInfo";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import StoryDetailsCard from "../../components/stories/StoryDetailsCard";
import { Container } from "react-bootstrap";

export default function ItemStories() {
  const { project, loadingProject } = useProjectInfo();
  const { story, loading: loadingStory } = useStoryInfo();

  if (loadingProject || loadingStory) return <div>Ładowanie danych...</div>;

  if (!story)
    return <div className="text-danger">Nie znaleziono historyjki!</div>;
  if (!project) return <div className="text-danger">Brak danych projektu.</div>;

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
      <StoryDetailsCard story={story}/>
      </Container>
    </div>
  );
}
