import { Link } from 'react-router-dom';
import { FeaturedPost } from './post-featured';
import PostCard from './post-card';
import { EmptyContent } from '../components/empty-content';
import { useGetAllPosts } from './posts-hook';
import { useRoleBasedAccess } from '../rbac/rbac-hook';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { processRequestError } from '../lib';
import { LoaderControl } from '../components/loader-control';

export const PostList: React.FC = () => {
  const { data, isLoading, size, error, refetch } = useGetAllPosts();
  const { hasPermission } = useRoleBasedAccess();

  const featuredPost = data.find(post => post.featured);
  const nonFeaturedPost = data.filter(post => post.id != featuredPost?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="!shadow-none">
        <CardHeader>
          <CardTitle>Discover Pubs</CardTitle>
        </CardHeader>
        <LoaderControl
          isLoading={isLoading}
          reloadHandler={refetch}
          isError={!!error}
          error={{ title: 'NO CONTENT TO DISPLAY', subtitle: processRequestError(error) }}
        >
          <CardContent>
            {featuredPost && <FeaturedPost data={featuredPost} />}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nonFeaturedPost.map(post => (
                <PostCard key={post.id} data={post} />
              ))}
            </div>
            {size === 0 && <EmptyContent message={
              <div className='flex-col gap-4 text-gray-800 text-sm space-y-8'>
                <h1>NO CONTENT TO DISPLAY</h1>
                {hasPermission('post.edit')
                  ? <Link to="/publish" className='bg-blue-600 !text-white px-4 py-2 rounded-md !hover:bg-blue-700'>
                    Start Writing</Link>
                  : <Link to="/login" className='bg-blue-600 !text-white px-4 py-2 rounded-md !hover:bg-blue-700'>
                    Login to Start Writing</Link>
                }
              </div>
            } />}
          </CardContent>
        </LoaderControl>
      </Card>
    </div>
  );
};
