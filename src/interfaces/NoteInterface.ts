export interface Note {
  id: string;
  title: string;
  content: string;
}

export type NewNote = Omit<Note, 'id'>;
