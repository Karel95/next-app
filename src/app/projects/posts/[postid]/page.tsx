import React from 'react';


// The 'params' prop containing route segments is automatically passed
interface PostPageProps {
  params: {
    postid: string; // Matches the folder name [postid]
  };
}

// 
const PostPage = async ({ params }: PostPageProps) => {

  const { postid } = params;

  console.log('Post ID from URL:', postid); // Debugging log

  return (
    <div className="m-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
      {/* <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
        <h2 className="text-xl font-semibold mb-2">{post.title} (ID: {post.id})</h2>
        <p className="text-gray-300">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">User ID: {post.userId}</p>
        <p className="text-sm text-gray-500 mt-1">Requested Post ID (from URL): {postid}</p>
      </div> */}
    </div>
  );
};

export default PostPage;
