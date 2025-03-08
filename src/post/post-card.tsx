import { Calendar, Clock, Star, User, Tags, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from './post-types';
import { checkIfPostIsEdited } from '../lib';
import { useGetLikeCount } from '../like/like-hook';

const PostCard = ({ data }: { data: Post }) => {
  const isPostEdited = checkIfPostIsEdited(data.posted_on, data.last_updated);
  const { likes } = useGetLikeCount(data.id);

  return (
    <Link to={`/posts/${data.id}`} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg">
      <img
        src={data.url}
        alt={data.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="uppercase flex justify-between tracking-wide text-sm text-blue-600 font-semibold">
          <span>{data.category}</span>
          {data.featured ? <Star className="text-yellow-500" /> : null}
        </div>
        <h4
          className="block mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {data.title}
        </h4>
        <p className="mt-3 text-gray-500">{data.excerpt}</p>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500 uppercase">
            <User className="h-4 w-4 mr-2" />
            {data.username}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(data.posted_on).toLocaleString()}
          </div>
          {isPostEdited && <div className="flex items-center text-sm text-gray-500 mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            Edited on
            {new Date(data.last_updated).toLocaleDateString()}
          </div>}
          {<div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="h-4 w-4 mr-2" />
            {data.read_time}{" "} min{data.read_time > 1 ? "s" : ""}
          </div>}

          <span className="flex items-center text-sm text-gray-500 mt-2">
            <Heart className="size-4 mr-2" /> {likes}
          </span>

          <div className="flex items-center text-sm text-gray-800 mt-2"></div>
          {data.tags &&
            <div className='flex gap-2 items-center'>
              <Tags className='text-sm text-gray-500' />
              <>{
                data.tags.split(',').map((tag, index) => (
                  <span key={data.id + index} className="mr-2 bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-sm">
                    {"#"}{tag.trim()}
                  </span>
                ))
              }</>
            </div>
          }
        </div>
      </div>
    </Link>
  );
}

export default PostCard;