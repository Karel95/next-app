"use client";
import { NewNote, PrismaNoteModel, UpdateNote } from "@/interfaces/NoteInterface";
import { createContext, useContext, useState } from "react";


export const NotesContext = createContext<{
  notes: PrismaNoteModel[];
  loadNotes: () => Promise<void>;
  addNote: (newNote: NewNote) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  selectedNote: PrismaNoteModel | null;
  setSelectedNote: (note: PrismaNoteModel | null) => void;
  updateNote: (id: number, updatedNote: UpdateNote) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  addNote: async () => {},
  deleteNote: async () => {},
  selectedNote: null,
  setSelectedNote: () => {},
  updateNote: async () => {},
});

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesContextProvider");
  }
  return context;
};

export const NotesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notes, setNotes] = useState<PrismaNoteModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<PrismaNoteModel|null>(null)

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function addNote(newNote: NewNote) {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    setNotes([...notes, data]);
  };

  async function deleteNote(id: string) {
    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);

    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      console.error("Error: Invalid ID:", id);
      return;
    }
    setNotes(notes.filter((note) => note.id !== numericId));
  };

  async function updateNote(id: number, updatedNote: UpdateNote) {
    const response = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });
    const data = await response.json();
    setNotes(notes.map((note) => (note.id === id ? data : note)));
  };

  return (
    <NotesContext.Provider value={{ notes, loadNotes, addNote, deleteNote, selectedNote, setSelectedNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};