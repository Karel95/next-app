import { Note as PrismaNoteModel } from "@/generated/prisma";


export type { PrismaNoteModel };

export type NewNote = Omit<PrismaNoteModel, 'id' | 'createdAt' | 'updatedAt'>;
