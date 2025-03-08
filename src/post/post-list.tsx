import { Link } from 'react-router-dom';
import { FeaturedPost } from './post-featured';
import PostCard from './post-card';
import { EmptyContent } from '../components/empty-content';
import { useGetRecentPosts } from './posts-hook';

export const PostList: React.FC = () => {
  const { data, isLoading, size } = useGetRecentPosts();

  if (isLoading) return <h1>Loading...</h1>
  if (!data || size === 0) return <EmptyContent message={
    <div className='flex-col gap-4 text-gray-800 text-sm space-y-8'>
      <h1>NO CONTENT TO DISPLAY</h1>
      <Link to="/login" className='bg-blue-600 !text-white px-4 py-2 rounded-md !hover:bg-blue-700'>
      Start Writing</Link>
    </div>
  } />

  const featuredPost = data.find(post => post.featured);
  const nonFeaturedPost = data.filter(post => post.id != featuredPost?.id).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {featuredPost && (
        <FeaturedPost data={featuredPost} />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nonFeaturedPost.map(post => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
};
