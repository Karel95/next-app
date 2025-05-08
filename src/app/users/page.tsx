import React from 'react'
import Users from './Users'


export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const reqresApiKey = process.env.REQRES_API_KEY

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('https://reqres.in/api/users', { 
    cache: 'no-store',
    headers: reqresApiKey
      ? { 'x-api-key': reqresApiKey }
      : undefined, })
  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return data.data
}

export default async function UsersPage() {
  const users = await fetchUsers()

  if (users.length === 0) {
    return <div className='flex justify-center items-center h-full'>No users found</div>
  }

  return (
    <Users users={users} />
  )
}
