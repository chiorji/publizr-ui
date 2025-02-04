import { Calendar, Clock, User } from 'lucide-react';
import { Post, posts } from '../../types/post-types';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { slug } = useParams();

  const post: Post = posts.find((post) => post.post_id === Number(slug)) as Post;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative h-96 mb-8">
        <img
          src={post.poster_card}
          alt={post.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="prose lg:prose-xl max-w-none">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">{post.title}</h1>

        <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            {post.author_id}
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            {new Date(post.posted_on).toLocaleDateString()}
          </div>
          {post.read_time && <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            {post.read_time}
          </div>}
        </div>

        <div className="mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {post.category}
          </span>
        </div>

        <div className="mt-8 text-gray-800">
          {post.content}
        </div>

        <div className="mt-8 flex gap-2">
          {post.tags.split(',').map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;