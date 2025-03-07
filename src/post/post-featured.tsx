import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from './post-types';

const FeaturedPost = ({ data }: { data: Post }) => (
  <div className="relative rounded-lg overflow-hidden bg-white shadow-lg mb-8">
    <div className="md:flex">
      <div className="md:w-2/3 max-h-[500px]">
        <img
          src={data.url}
          alt={data.title}
          className="h-48 w-full object-cover md:h-full"
        />
      </div>
      <div className="md:w-1/3 p-6">
        <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
          {data.category}
        </div>
        <Link
          to={`/posts/${data.id}`}
          className="block mt-2 text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {data.title}
        </Link>
        <p className="mt-3 text-gray-500">{data.excerpt}</p>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500 uppercase">
            <User className="h-4 w-4 mr-2" />
            {data.username}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(data.posted_on).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="h-4 w-4 mr-2" />
            {data.read_time} {" "} min{data.read_time > 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedPost;