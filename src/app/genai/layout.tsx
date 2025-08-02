import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "GenAI",
  description: "GenAI page",
};

const ProjectsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <nav className="flex items-center justify-between m-4 p-4 bg-gray-900 text-white rounded-lg">
        <ul className="flex list-none">
          <li className="flex">
            <Link
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              href="genai/img-gen"
            >
              Generate Image
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export default ProjectsLayout;
