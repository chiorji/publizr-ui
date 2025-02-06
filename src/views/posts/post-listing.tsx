import PostCard from './post-card';
import { useGetAllPostsQuery } from '../../app/api/post-slice';
import { useMemo } from 'react';
import { useRandomImage } from '../../hooks/use-image';

const BlogListing = () => {
  const { data } = useGetAllPostsQuery();

  const posts = useMemo(() => {
    if (!data) return [];
    return data.map(post => ({
      ...post,
      poster_card: useRandomImage()
    }));
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.filter(post => !post.featured).map(post => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogListing;