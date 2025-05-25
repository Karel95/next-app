"use client";
import { useNotes } from "@/context/NoteContext";
import { PrismaNoteModel } from "@/interfaces/NoteInterface";
import { Button } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";

function NotePage({ note }: { note: PrismaNoteModel }) {
  const { deleteNote, setSelectedNote } = useNotes();

  if (!note) {
    return (
      <div className="p-4 border rounded shadow bg-yellow-100 text-yellow-700">
        Note data missing.
      </div>
    );
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {note.title || `Note ID: ${note.id}`}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-100">
        {note.content || "No content."}
      </p>
      <p className="font-extralight text-xs m-2 text-gray-500 dark:text-gray-300">
        Created at: {new Date(note.createdAt).toLocaleString()}
      </p>
      <p className="font-extralight text-xs m-2 text-gray-500 dark:text-gray-300">
        Updated at: {new Date(note.updatedAt).toLocaleString()}
      </p>
      <Button
        onClick={() => setSelectedNote(note)}
        className="inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Edit
        <HiPencil className="w-4 h-4 ml-2" />
      </Button>
      <Button
        onClick={() => {
          if (confirm("Are you sure you want to delete this note?")) {
            deleteNote(note.id.toString());
          }
        }}
        className="inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Delete
        <HiTrash className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

export default NotePage;
