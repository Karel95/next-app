import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


////////////////////////////////////
/*  Next.js Route Handlers Params */
////////////////////////////////////
interface Params {
  params: {
    noteid: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  // Search Params
  const { searchParams } = new URL(request.url);
  console.log("Search Params: ", searchParams);
  
  const noteid = Number(params.noteid);
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: noteid,
      },
    });

    if (!note) {
      return NextResponse.json({ 
        message: `Note with id: ${noteid} not found`,
        status: 404 
       });
    }
    
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ 
      message: `Error retrieving note with id: ${noteid}`,
      error: error,
      status: 500 
     });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { title, content } = await request.json();

  try {
    const updateNote = await prisma.note.update({
      where: {
        id: Number(params.noteid),
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updateNote);
  } catch (error) {
    return NextResponse.json({
      message: `Error updating note!\nError:\n${error}`,
      status: 500,
      error: true,
    });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const noteid = Number(params.noteid);

  try {
    const note = await prisma.note.delete({
      where: {
        id: noteid,
      },
    });

    if (!note) {
      return NextResponse.json({ 
        message: `Note with id: ${noteid} not found`,
        status: 404 
       });
    }
    
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ 
      message: `Error retrieving note with id: ${noteid}`,
      error: error,
      status: 500 
     });
  }
}
