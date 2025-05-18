import React from "react";
import { prisma } from "@/libs/prisma";
import Tasks from "./Tasks";

// Define the type for a task
export type Task = {
  id: number;
  title: string;
  description: string | null;
  createdAt: Date; // or Date, depending on how Prisma returns it
  completed: boolean;
};

async function getTasks(): Promise<Task[]> {
  // Using Next.js with Prisma we have 2 options for fetching data:
  // 1. fetch data through the API
  // 2. fetch data directly to the DB

  // // Example 1: API route to fetch data
  // const resp = await fetch('http://localhost:3000/prisma_crud/api/tasks', {
  //   method: 'GET',
  //   cache: 'no-store',
  // });
  // const data = await resp.json();

  // // Example 2: Directly to the DB (recommended)
  const data = await prisma.task.findMany();

  // In both cases, we can use the data in the same way
  return data;
}

async function PrismaCrudPage() {
  const tasks = await getTasks();
  return (
    <>
      <Tasks tasks={tasks} />
      <footer className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-100">
          Total tasks: {tasks.length}
        </h1>
      </footer>
    </>
  );
}

export default PrismaCrudPage;
