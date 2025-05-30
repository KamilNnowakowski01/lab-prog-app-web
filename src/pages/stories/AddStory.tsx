import { Container } from "react-bootstrap";
import TitleHeader from "../../components/TitleHeader";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import StoryForm from "../../components/stories/StoryForm";
import { useProjectInfo } from "../../helpers/useProjectInfo";
import { useAddStory } from "../../helpers/stories/useAddStory";

export default function AddStory() {
  const {
    name,
    description,
    setName,
    setDescription,
    handleSubmit,
    handleCancel,
    activeProjectId,
  } = useAddStory();

  const { project } = useProjectInfo();

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
