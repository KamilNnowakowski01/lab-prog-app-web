import React from "react";
import { Stack } from "react-bootstrap";

interface TitleHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
  className?: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({
  title,
  rightContent,
  className = "",
}) => {
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className={`pb-2 mt-5  ${className}`}
      >
        <h2 className="m-0">{title}</h2>
        {rightContent && <>{rightContent}</>}
      </Stack>
      <hr className="mt-3 mb-5" />
    </>
  );
};

export default TitleHeader;
