import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

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
  isAssign?: boolean;
  isMarkAsDone?: boolean;
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
  isDelete,
  isAssign,
  isMarkAsDone,
}) => {
  return (
    <Breadcrumb className="mb-3">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        🏠 Home
      </Breadcrumb.Item>

      {/* Projects */}
      {isProjectRoute && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/project/" }}>
          📁 Projects
        </Breadcrumb.Item>
      )}
      {projectId && projectName && (
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/project/${projectId}` }}
        >
          📁 {projectName}
        </Breadcrumb.Item>
      )}

      {/* Stories */}
      {isStoryRoute && projectId && (
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/project/${projectId}/stories` }}
        >
          📚 Stories
        </Breadcrumb.Item>
      )}
      {storyId && storyName && projectId && (
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/project/${projectId}/stories/${storyId}` }}
        >
          📚 {storyName}
        </Breadcrumb.Item>
      )}

      {/* Tasks */}
      {isTaskRoute && projectId && storyId && (
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/project/${projectId}/stories/${storyId}/tasks` }}
        >
          ✅ Tasks
        </Breadcrumb.Item>
      )}
      {taskId && taskName && projectId && storyId && (
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{
            to: `/project/${projectId}/stories/${storyId}/tasks/${taskId}`,
          }}
        >
          ✅ {taskName}
        </Breadcrumb.Item>
      )}

      {/* Optional Action */}
      {isMarkAsDone && <Breadcrumb.Item active>✅ Mark as Done</Breadcrumb.Item>}
      {isAssign && <Breadcrumb.Item active>✏️ Assign</Breadcrumb.Item>}
      {isEdit && <Breadcrumb.Item active>✏️ Edit</Breadcrumb.Item>}
      {isDelete && <Breadcrumb.Item active>🗑️ Delete</Breadcrumb.Item>}
      {isCreate && <Breadcrumb.Item active>📄 Create</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default BeltBreadcrumb;
