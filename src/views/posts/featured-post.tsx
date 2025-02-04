import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../../types/post-types';

const FeaturedPost = ({ post }: { post: Post }) => (
  <div className="relative rounded-lg overflow-hidden bg-white shadow-lg mb-8">
    <div className="md:flex">
      <div className="md:w-2/3">
        <img
          src={post.poster_card}
          alt={post.title}
          className="h-48 w-full object-cover md:h-full"
        />
      </div>
      <div className="md:w-1/3 p-6">
        <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
          {post.category}
        </div>
        <Link
          to={`/posts/${post.post_id}`}
          className="block mt-2 text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
        <p className="mt-3 text-gray-500">{post.excerpt}</p>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2" />
            {post.author_id}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(post.posted_on).toLocaleDateString()}
          </div>
          {post.read_time && <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="h-4 w-4 mr-2" />
            {post.read_time}
          </div>}
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedPost;