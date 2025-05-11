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
    <ul className="flex flex-col md:flex-row gap-4 justify-center items-center m-4 p-4">
      {tasks.map((task) => (
        <Link
          href={`/prisma_crud/edit/${task.id}`}
          key={task.id}
          className="flex items-center gap-4 mb-4 bg-slate-700 p-4 rounded-lg shadow-md w-full max-w-xs"
        >
          <li className="flex flex-row justify-between items-center h-full w-full">
            <div className="max-w-md mx-auto p-6 bg-slate-700 shadow-md rounded-lg h-80 flex flex-col">
              <h1 className="text-2xl font-bold mb-4 text-gray-100">
                {task.title}
              </h1>
              <p className="text-gray-100 mb-6">
                ID: {task.id}
              </p>
              <p className="text-gray-100 mb-6">{task.description}</p>
              <p className="text-gray-100 mb-6">
                Created at: {new Date(task.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-100 mb-6">
                Status: {task.completed ? "Completed" : "Pending"}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default Tasks;
