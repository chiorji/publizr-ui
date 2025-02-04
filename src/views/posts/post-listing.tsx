import { ChevronRight } from 'lucide-react';
import { posts } from '../../types/post-types';
import FeaturedPost from './featured-post';
import PostCard from './post-card';

const BlogListing = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {posts.filter(post => post.featured).map(post => (
        <FeaturedPost key={post.post_id} post={post} />
      ))}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 9).filter(post => !post.featured).map(post => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>

      {posts.length > 9 && <div className="mt-12 text-center">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Load More Posts
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>}
    </div>
  );
};

export default BlogListing;