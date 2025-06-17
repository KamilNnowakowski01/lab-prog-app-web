import { Container } from "react-bootstrap";
import { useAddProject } from "../../helpers/project/useAddProject";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import ProjectForm from "../../components/project/ProjectForm";

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
