import { Container } from "react-bootstrap";
import TitleHeader from "../../components/TitleHeader";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import ProjectForm from "../../components/project/ProjectForm";
import { useAddProject } from "../../helpers/project/useAddProject";

export default function AddProject() {
  const {
    name,
    description,
    setName,
    setDescription,
    handleSubmit,
    handleCancel,
  } = useAddProject();

  return (
    <Container>
      <BeltBreadcrumb isProjectRoute isCreate />
      <TitleHeader title="Create New Project" />

      <ProjectForm
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
