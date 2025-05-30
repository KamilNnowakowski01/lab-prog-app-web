import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  isProjectRoute?: boolean;
  projectId?: string | null;
  projectName?: string | null;

  isStoryRoute?: boolean;
  storyId?: string | null;
  storyName?: string | null;

  isTaskRoute?: boolean;
  taskId?: string | null;
  taskName?: string | null;

  isCreate?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
};

const BeltBreadcrumb: React.FC<Props> = ({
  isProjectRoute,
  projectId,
  projectName,
  isStoryRoute,
  storyId,
  storyName,
  isTaskRoute,
  taskId,
  taskName,
  isCreate,
  isEdit,
  isDelete
}) => {
  return (
    <Breadcrumb className="mb-3">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        🏠 Home
      </Breadcrumb.Item>

      {/* Projects */}
      {isProjectRoute && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/project/` }}>
          📁 Projects
        </Breadcrumb.Item>
      )}
      {projectId && projectName && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/project/${projectId}` }}>
          📁 {projectName}
        </Breadcrumb.Item>
      )}

      {/* Stories */}
      {isStoryRoute && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/stories/` }}>
          📚 Stories
        </Breadcrumb.Item>
      )}
      {storyId && storyName && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/stories/${storyId}` }}>
          📚 {storyName}
        </Breadcrumb.Item>
      )}

      {/* Tasks */}
      {isTaskRoute && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/stories/${storyId}/tasks/` }}>
          ✅ Tasks
        </Breadcrumb.Item>
      )}
      {taskId && taskName && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/tasks/${taskId}` }}>
          ✅ {taskName}
        </Breadcrumb.Item>
      )}

      {/* Optional Action */}
      {isEdit && (
        <Breadcrumb.Item active>
          ✏️ Edit
        </Breadcrumb.Item>
      )}
      {isDelete && (
        <Breadcrumb.Item active>
          🗑️ Delete
        </Breadcrumb.Item>
      )}
      {isCreate && (
        <Breadcrumb.Item active>
          📄 Create
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default BeltBreadcrumb;
