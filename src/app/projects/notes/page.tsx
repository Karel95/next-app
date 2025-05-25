"use client";
import { useEffect } from "react";
import { useNotes } from "@/context/NoteContext";
import { Note } from "@/interfaces/NoteInterface";
import NotePage from "./[noteid]/page";
import NoteForm from "@/components/NoteForm";


function NotesPage() {
  const { notes, loadNotes } = useNotes();
  
  useEffect(() => {
    loadNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NoteForm />
      <br />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
        {notes.map((note: Note) => {
          return <NotePage key={note.id} note={note} />;
        })}
      </div>
    </>
  );
}

export default NotesPage;
