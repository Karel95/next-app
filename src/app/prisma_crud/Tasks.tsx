import React from "react";
import { Task } from "./page";
import Link from "next/link";

// Define the props for the Users component
interface TasksProps {
  tasks: Task[];
}

// Define the Users component
function Tasks({ tasks }: TasksProps) {
  return (
    <ul className="flex flex-col items-center justify-center h-full p-4">
      {tasks.map((task) => (
        <Link
          href={`/prisma_crud/${task.id}`}
          key={task.id}
          className="flex items-center gap-4 mb-4 bg-slate-700 p-4 rounded-lg shadow-md w-full max-w-xs"
        >
          <li className="flex flex-row justify-between items-center w-full">
            <div
              key={task.id}
              className="max-w-md mx-auto mt-10 p-6 bg-slate-700 shadow-md rounded-lg"
            >
              <h1 className="text-2xl font-bold mb-4 text-gray-100">
                {task.title}
              </h1>
              <p className="text-gray-100 mb-6">{task.description}</p>
              <p className="text-gray-100 mb-6">
                Created at: {new Date(task.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-100 mb-6">Status: {task.completed}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default Tasks;
