"use client";
import { createContext, useContext, useState } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
}

export type NewNote = Omit<Note, 'id'>;

export const NotesContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  addNote: (newNote: NewNote) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  addNote: async () => {},
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
  const [notes, setNotes] = useState<Note[]>([]);

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

  return (
    <NotesContext.Provider value={{ notes, loadNotes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};