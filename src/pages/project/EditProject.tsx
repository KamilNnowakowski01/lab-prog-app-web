import { Container, Spinner } from "react-bootstrap";
import { useEditProject } from "../../helpers/project/useEditProject";
import BeltBreadcrumb from "../../components/ProjectBreadcrumb";
import TitleHeader from "../../components/TitleHeader";
import ProjectForm from "../../components/project/ProjectForm";

export default function EditProject() {
  const {
    name,
    description,
    projectId,
    loading,
    setName,
    setDescription,
    handleUpdate,
    handleCancel,
  } = useEditProject();

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <div className="mt-3">Loading project data...</div>
      </Container>
    );
  }

  return (
    <Container>
      <BeltBreadcrumb
        isProjectRoute
        projectId={projectId}
        projectName={name}
        isEdit
      />
      <TitleHeader title="Edit Project" />
      <ProjectForm
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
        isEdit
      />
    </Container>
  );
}
