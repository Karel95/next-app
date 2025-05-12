"use client";
import { Task } from "./page";
import { useRouter } from "next/navigation";

// Define the props for the Users component
interface TasksProps {
  tasks: Task[];
}

// Define the Users component
function Tasks({ tasks }: TasksProps) {
  const router = useRouter();
  
  return (
    <ul className="flex flex-col md:flex-wrap gap-4 justify-center items-center m-4 p-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center h-full w-full cursor-pointer"
          onClick={() => {
            router.push(`prisma_crud/edit/${task.id}`);
          }}
        >
          <div className="max-w-md mx-auto p-6 bg-slate-700 shadow-md rounded-lg h-80 w-60 flex flex-col">
            <h1 className="text-2xl font-bold mb-4 text-gray-100">
              {task.title}
            </h1>
            <p className="text-gray-100 mb-6">ID: {task.id}</p>
            <p className="text-gray-100 mb-6">{task.description}</p>
            <p className="text-gray-100 mb-6">
              Created at:{" "}
              {new Date(task.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="text-gray-100 mb-6">
              Status: {task.completed ? "Completed" : "Pending"}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
