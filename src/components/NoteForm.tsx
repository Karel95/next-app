"use client";
import { useNotes } from "@/context/NoteContext";
import { useState } from "react";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { addNote } = useNotes();

  return (
    <form
      className="max-w-sm mx-auto"
      onSubmit={(e) => {
        e.preventDefault();

        addNote({
          title,
          content,
        });
      }}
    >
      <div className="mb-5"></div>
      <div>
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Content
        </label>
        <textarea
          rows={3}
          id="content"
          name="content"
          placeholder="Content"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Create Note
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
      </button>
    </form>
  );
}

export default NoteForm;
