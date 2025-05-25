"use client";
import { useContext, useEffect } from "react";
import { NotesContext, Note } from "@/context/NoteContext";
import NotePage from "./[noteid]/page";
import NoteForm from "@/components/NoteForm";


function NotesPage() {
  const { notes, loadNotes } = useContext(NotesContext);
  
  useEffect(() => {
    loadNotes();
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
