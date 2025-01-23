import type { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Projects",
  description: "Projects page",
};

const ProjectsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div>Projects:</div>
      {children}
    </>
  );
};

export default ProjectsLayout;
