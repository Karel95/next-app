import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


/////////////////////////////
/*  Next.js Route Handlers */
/////////////////////////////

// This is a simple API route that handles GET, POST, PUT, and DELETE requests for example purposes.
// You can replace the logic inside each function with your own implementation as needed, like fetching data from a database or performing other operations.

export async function GET() {

  const tasks = await prisma.task.findMany()

  console.log("tasks:\n", tasks);

  return NextResponse.json({ message: `All tasks`, tasks });
}

export async function POST(request) {

  const data = await request.json();

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description
    }
  });

  console.log("task:\n", task);  

  return NextResponse.json({ message: `New task created succesfully!`, task });
}
