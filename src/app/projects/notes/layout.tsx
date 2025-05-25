import type { Metadata } from "next";
import { NotesContextProvider } from "@/context/NoteContext";
import React from "react";

export const metadata: Metadata = {
  title: "Notes Project",
  description: "Notes Project page",
};

const ProjectsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NotesContextProvider>{children}</NotesContextProvider>
    </>
  );
};

export default ProjectsLayout;
