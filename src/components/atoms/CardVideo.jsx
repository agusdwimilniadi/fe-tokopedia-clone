import { Link } from 'react-router-dom';
import { CiStreamOn } from 'react-icons/ci';
export const CardVideo = ({ item }) => {
  return (
    <div key={item._id} className="group relative">
      <Link
        to={`/watch/${item._id}`}
        className="h-[250px] inline-block  mt-5 rounded-xl relative  overflow-hidden"
      >
        <img
          src={item.thumbnailUrl}
          alt="thumbnail"
          className="h-full object-cover  group-hover:scale-105 transition-all"
        />
      </Link>
      <Link
        to={`/watch/${item._id}`}
        className="my-2 group-hover:underline transition-all line-clamp-1"
      >
        {item.title}
      </Link>
      <div className="absolute flex items-center gap-1 bg-red-600 text-xs text-white top-5 right-5 px-2 rounded-full">
        <CiStreamOn /> Live
      </div>
    </div>
  );
};
