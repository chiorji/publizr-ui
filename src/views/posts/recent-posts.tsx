import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import FeaturedPost from './featured-post';
import PostCard from './post-card';
import { useRecentQuery } from '../../app/api/post-slice';
import { useMemo } from 'react';
import { getRandomImagePlaceholder } from '../../lib';

const RecentPosts = () => {
  const { data } = useRecentQuery();

  const posts = useMemo(() => {
    if (!data?.data) return [];
    return data?.data.map(post => ({
      ...post,
      poster_card: getRandomImagePlaceholder()
    }));
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {posts?.filter(post => post.featured).map(post => (
        <FeaturedPost key={post.id} post={post} />
      ))}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.filter(post => !post.featured).map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts && posts?.length > 9 && <div className="mt-12 text-center">
        <Link to="/posts/all" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Load More Posts
          <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </div>}
    </div>
  );
};

export default RecentPosts;