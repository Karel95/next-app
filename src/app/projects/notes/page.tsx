import React from "react";
import NotePage from "./[noteid]/page";
import NoteForm from "@/components/NoteForm";


interface Note {
  id: string;
  title: string;
  content: string;
}

async function loadNotes(): Promise<Note[]> {
  const res = await fetch("http://localhost:3000/api/notes");
  const notes = await res.json();
  return Array.isArray(notes) ? notes : [];
}
async function NotesPage() {
  const notes = await loadNotes();
  console.log(notes);

  return (
    <>
      <NoteForm />
      <br />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
        {notes.map((note) => {
          return <NotePage key={note.id} id={note.id} />;
        })}
      </div>
    </>
  );
}

export default NotesPage;
