"use client";
import { useNotes } from "@/context/NoteContext";
import { useEffect, useRef, useState } from "react";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");

  const titleRef = useRef<HTMLInputElement>(null);

  const { addNote, selectedNote, setSelectedNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <form
      className="max-w-sm mx-auto"
      onSubmit={(e) => {
        e.preventDefault();

        addNote({
          title,
          content,
        });

        setTitle("");
        setContent("");

        titleRef.current?.focus();
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
          value={title}
          ref={titleRef}
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
          value={content}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
        {selectedNote && (
          <button
            type="button"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
              titleRef.current?.focus();
            }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
