import Image from 'next/image';
import React from 'react'


// The 'params' prop containing route segments is automatically passed
interface UserPageProps {
  params: {
    userid: number; // Matches the folder name [postid]
  };
}

// This function is called on the server side and can be used to fetch data
// You can also use it to perform any server-side logic you need
async function loadUser(id: number) {
  const res = await fetch(`https://reqres.in/api/users/${id}`, { 
    cache: 'no-store',
    headers: {
      'x-api-key': 'reqres-free-v1',
      // 'Content-Type': 'application/json'
    }, });
  const data = await res.json();

  return data.data;
}

// The UserPage component is an async function that fetches user data based on the user ID from the URL
const UserPage = async ({ params }: UserPageProps) => {
  const user = await loadUser(params.userid)

  return (
    <div className="m-4 p-4">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <div className="flex flex-col md:flex-row justify-between items-center w-full bg-gray-800 m-12 p-6 rounded-lg max-w-md shadow-md text-white">
        <div>
          <h2 className="text-xl font-semibold mb-2">{`${user.first_name} ${user.last_name}`}</h2>
          <p className="text-gray-300">{user.email}</p>
          <p className="text-sm text-gray-500 mt-4">The requested User ID is: <strong className="text-xl">{user.id}</strong></p>
        </div>
        <Image src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="h-16 rounded-full mt-2" width="64" height="4" />
      </div>
    </div>
  )
}

export default UserPage