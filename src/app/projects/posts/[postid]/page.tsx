import React, { Suspense } from 'react';
import PostsPage from '../page';


// The 'params' prop containing route segments is automatically passed
interface PostPageProps {
  params: {
    postid: number; // Matches the folder name [postid]
  };
}

async function loadPost(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();
  
  return data;
}

// 
const PostPage = async ({ params }: PostPageProps) => {

  const post = await loadPost(params.postid)

  return (
    <div className="m-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
      <div className="bg-gray-800 m-12 p-6 rounded-lg shadow-md text-white">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-300">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">The requested Post ID is: <strong className="text-xl">{post.id}</strong></p>
      </div>

      <hr className="my-4" />
      <h2 className="text-xl font-semibold my-4">Other Posts</h2>
      {/* Render the PostsPage component to show other posts */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* You can also use a loading spinner or skeleton loader here */}
        <PostsPage />
      </Suspense>
    </div>
  );
};

export default PostPage;
