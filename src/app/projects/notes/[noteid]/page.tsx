import React from "react";


interface NotePageProps {
  // Accept ID as string, as it comes from URL params
  id: string;
}

async function loadNote(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      cache: "no-store", // Or 'force-cache' or revalidate options depending on needs
    });

    if (!res.ok) {
      console.error(`Failed to fetch note ${id}: ${res.status}`);
      return null; // Or throw new Error(...)
    }
    const note = await res.json();
    return note;
  } catch (error) {
    console.error("Error in loadNote:", error);
    return null; // Or throw error
  }
}

async function NotePage({ id }: NotePageProps) {
  const note = await loadNote(id);
  console.log("NotePage:", note);

  if (!note) {
    return (
      <div className="p-4 border rounded shadow bg-red-100 text-red-700">
        Note with ID {id} not found or failed to load.
      </div>
    );
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {note.title || `Note ID: ${note.id}`}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {note.content || "No content."}
      </p>
      <a
        href="#"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}

export default NotePage;
