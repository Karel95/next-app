import React from "react";
import Image from "next/image";
import { User } from "./page";
import Link from "next/link";

// Define the props for the Users component
interface UsersProps {
  users: User[];
}

// Define the Users component
function Users({ users }: UsersProps) {
  return (
    <ul className="flex flex-col items-center justify-center h-full p-4">
      {users.map((user) => (
        <Link
          href={`/users/${user.id}`}
          key={user.id}
          className="flex items-center gap-4 mb-4 bg-slate-700 p-4 rounded-lg shadow-md w-full max-w-xs"
        >
          <li className="flex flex-row justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-semibold cursor-pointer hover:text-gray-400">{`${user.first_name} ${user.last_name}`}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <Image
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="h-16 rounded-full mt-2"
              width="64"
              height="4"
            />
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default Users;
