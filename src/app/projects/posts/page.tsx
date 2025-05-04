import PostCard from '@/components/PostCard';
import React from 'react'


// 1. Define an interface for the Post object
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 2. Specify the return type of getPosts using the Post interface
async function getPosts(): Promise<Post[]> {
  // It's good practice to add error handling for fetch requests
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch posts');
  }

  // Although res.json() technically returns Promise<any>,
  // we trust the API structure here and type the result.
  const data = await res.json();

  // Simulate a delay for demonstration purposes
  // This is not necessary in production code, but can be useful for testing loading states
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Return the data as an array of Post objects
  // TypeScript will infer the type of 'data' as 'any', so we need to assert it as Post[].
  return data as Post[]; // You might use 'as Post[]' if TS can't infer directly
}

// 3. Use the Post interface in the component props
// RSC (React Server Component) - This function is executed on the server
// and can fetch data directly from the server
const PostsPage = async () => {

  const posts = await getPosts()

  return (
    <div>
      <div className="flex m-10 text-xl font-semibold">Posts Page</div>
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostsPage
