import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


/////////////////////////////
/*  Next.js Route Handlers */
/////////////////////////////

export async function GET() {
  try {
    const notes = await prisma.note.findMany();

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({
      message: `Error retrieving notes!\nError:\n${error}`,
      status: 500,
      error: true
    });
  }
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  
  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json({
      message: `Error creating note!\nError:\n${error}`,
      status: 500,
      error: true,
    });
  }
}
