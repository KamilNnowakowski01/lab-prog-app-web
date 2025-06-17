import { Container } from "react-bootstrap";
import { useAddStory } from "../../helpers/stories/useAddStory";
import { useProject } from "../../helpers/project/useProject";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import StoryForm from "../../components/stories/StoryForm";

export default function AddStory() {
  const {
    name,
    description,
    setName,
    setDescription,
    handleSubmit,
    handleCancel,
  } = useAddStory();

  const { project } = useProject();

  return (
    <Container>
      <BeltBreadcrumb
        isProjectRoute
        projectId={project?.id}
        projectName={project?.name}
        isStoryRoute
        isCreate
      />
      <TitleHeader title="New Story" />

      <StoryForm
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit={false}
      />
    </Container>
  );
}
