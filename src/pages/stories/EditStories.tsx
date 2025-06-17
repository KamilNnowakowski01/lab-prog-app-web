import { Container, Spinner } from "react-bootstrap";
import { useEditStory } from "../../helpers/stories/useEditStory";
import { useProject } from "../../helpers/project/useProject";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import StoryForm from "../../components/stories/StoryForm";

export default function EditStories() {
  const {
    story,
    name,
    description,
    status,
    loading,
    setName,
    setDescription,
    setStatus,
    handleUpdate,
    handleCancel,
  } = useEditStory();
  const { project } = useProject();

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <div className="mt-3">Ładowanie danych historyjki...</div>
      </Container>
    );
  }

  if (!story) {
    return (
      <div className="text-danger text-center mt-4">
        Nie znaleziono historyjki!
      </div>
    );
  }

  return (
    <Container>
      <BeltBreadcrumb
        isProjectRoute
        projectId={project?.id}
        projectName={project?.name}
        isStoryRoute
        storyId={story.id}
        storyName={story.name}
        isEdit
      />
      <TitleHeader title="Edit Story" />

      <StoryForm
        name={name}
        description={description}
        status={status}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onStatusChange={setStatus}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
        isEdit={true}
      />
    </Container>
  );
}
