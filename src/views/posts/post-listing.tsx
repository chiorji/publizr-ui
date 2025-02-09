import { Link } from 'react-router-dom';
import { useAllQuery } from '../../app/api/post-slice';
import { useMemo } from 'react';
import { useRandomImage } from '../../hooks/use-image';

const PostListing = () => {
  const { data, isLoading } = useAllQuery();

  const posts = useMemo(() => {
    if (!data?.data) return [];
    return data?.data.map(post => ({
      ...post,
      poster_card: useRandomImage()
    }));
  }, [data]);

  if (isLoading) return <div>Loading</div>;
  if (!isLoading && posts.length === 0) return <div>No posts</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ul className="space-y-4 text-gray-600">
        {posts?.filter(post => !post.featured).map(post => (
          <li key={post.post_id} className="p-4 border border-gray-200 rounded-lg">
            <Link to={`/posts/${post.post_id}`} className="flex items-center space-x-4">
              <img src={post.poster_card} alt={post.title} className="w-16 h-16 object-cover rounded-sm" />
              <div>
                <span className="text-lg font-bold">{post.title}</span>
                <p className="text-sm text-gray-500">By {post.username}</p>
                <p className="text-sm">{post.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListing;