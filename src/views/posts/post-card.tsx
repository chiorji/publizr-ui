import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../../types/post-types';

const PostCard = ({ post }: { post: Post }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <img
      src={post.poster_card}
      alt={post.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
        {post.category}
      </div>
      <Link
        to={`/posts/${post.post_id}`}
        className="block mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
      >
        {post.title}
      </Link>
      <p className="mt-3 text-gray-500">{post.excerpt}</p>
      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-500 uppercase">
          <User className="h-4 w-4 mr-2" />
          {post.username}
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(post.posted_on).toLocaleDateString()}
        </div>
        {post.read_time && <div className="flex items-center text-sm text-gray-500 mt-2">
          <Clock className="h-4 w-4 mr-2" />
          {post.read_time}
        </div>}
        <div className="flex items-center text-sm text-gray-800 mt-2"></div>
          {post?.tags.split(',').map((tag, index) => (
            <span key={index} className="mr-2 bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-sm">
              {"#"}{tag.trim()}
            </span>
          ))}
        </div>
      </div>
  </div>
);

export default PostCard;