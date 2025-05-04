"use client"
// Importa el componente PostCard y la interfaz Post
import { Post } from '@/app/projects/posts/page'

// 1. Define las props que espera el componente PostCard
interface PostCardProps {
  post: Post;
}


// 2. Define el componente PostCard como una función de React
// RCC (React Client Component) - Este componente se ejecuta en el cliente
// y puede interactuar con el DOM, manejar eventos, etc.
const PostCard: React.FC<PostCardProps> = ({post}) => {
  return (
    <div key={post.id} className='m-4 p-4 md:m-8 lg:m-16'>
      <h2 className='text-xl font-bold mb-2'>{post.id}. {post.title}</h2>
      <p className='text-gray-300'>{post.body}</p>
      <div className='flex justify-end'>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => alert(`Editing post ${post.id}`)}>
          Edit
        </button>
        <button 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
          onClick={() => alert(`Deleting post ${post.id}`)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default PostCard