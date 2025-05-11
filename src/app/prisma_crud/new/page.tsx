"use client";
import { useRouter } from "next/navigation";
import React from "react";


function NewPage() {

  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");
    const description = formData.get("description");

    // Here you can add your logic to handle the form submission,
    // such as sending the data to an API or updating the state.
    // For example, you can use fetch to send a POST request to your server.
    const resp = await fetch('api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (resp.ok) {
      const data = await resp.json();
      // Optionally, you can redirect the user or show a success message.
      console.log('Task created successfully:', data);
      router.push('/prisma_crud');
    } else {
      // Handle error case
      console.error('Error creating task:', resp.statusText);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-700 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">New Task</h1>
      <p className="text-gray-100 mb-6">
        This is the new task page for creating a new task.
      </p>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title:
          </label>
          <input
            placeholder="Enter task title"
            id="title"
            autoComplete="off"
            required
            minLength={3}
            type="text"
            name="title"
            className="w-full px-4 py-2 border bg-slate-500 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            placeholder="Enter task description"
            id="description"
            autoComplete="off"
            rows={3}
            name="description"
            className="w-full px-4 py-2 border bg-slate-500 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default NewPage;
