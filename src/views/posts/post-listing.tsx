import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAllQuery } from '../../app/api/post-slice';
import { getRandomImagePlaceholder } from '../../lib';
import { EmptyContent } from '../../components/ui/empty-content';

const PostListing = () => {
  const { data, isLoading } = useAllQuery(null, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const posts = useMemo(() => {
    if (!data?.data) return null;
    return data?.data.map(post => ({
      ...post,
      poster_card: getRandomImagePlaceholder()
    }));
  }, [data]);

  if (isLoading) return <div>Loading</div>;
  if (!posts) return <EmptyContent />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ul className="space-y-4 text-gray-600">
        {posts.map(post => (
          <li key={post.id} className="p-4 border border-gray-200 rounded-lg">
            <Link to={`/posts/${post.id}`} className="flex items-center space-x-4">
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