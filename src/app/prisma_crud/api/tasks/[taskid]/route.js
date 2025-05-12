import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


////////////////////////////////////
/*  Next.js Route Handlers Params */
////////////////////////////////////

// This is a simple API route that handles GET, POST, PUT, and DELETE requests for example purposes.
// You can replace the logic inside each function with your own implementation as needed, like fetching data from a database or performing other operations.

export async function GET(request, { params }) {

  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.taskid)
    }
  })

  console.log("task:\n", task);

  // // Search params not used in this example, but you can use them if needed.
  // const { searchParams } = new URL(request.url);
  // console.log("searchParams:\n", searchParams);

  return NextResponse.json({ message: `Searching task ${params.taskid}`, task });
}

export async function PUT(request, { params }){

  const data = await request.json();

  const task = await prisma.task.update({
    where: {
      id: Number(params.taskid)
    },
    data: data
  })

  console.log("task:\n", task);

  return NextResponse.json({ message: `Updating task ${params.taskid}`, task });
}

export async function DELETE(request, { params }){

  const task = await prisma.task.delete({
    where: {
      id: Number(params.taskid)
    }
  })

  console.log("task:\n", task);

  // // Search params not used in this example, but you can use them if needed.
  // const { searchParams } = new URL(request.url);
  // console.log("searchParams:\n", searchParams);

  return NextResponse.json({ message: `Deleting task ${params.taskid}`, task });
}
