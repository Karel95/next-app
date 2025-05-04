import Link from "next/link";

const ProjectsPage = () => {
  return (
    <>
      <div className="flex m-10">ProjectsPage</div>
      <ul className="flex flex-col list-none m-12">
        <li className="">
          <Link
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            href="/projects/music-player"
          >
            Music Player
          </Link>
        </li>
        <li className="">
          <Link
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            href="/projects/posts"
          >
            Posts
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ProjectsPage;
