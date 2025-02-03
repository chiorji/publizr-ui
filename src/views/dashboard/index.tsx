import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { posts } from '../../types/post-types';
import { useDeletePostMutation } from '../../app/api/post-slice';

const Dashboard = () => {

  const [deleteHandler, { isLoading }] = useDeletePostMutation();

  const handlerPostDeletion = (id: string | number) => {
    deleteHandler(id).then((response) => {
      if (response && response.data) {
        console.log('Post deleted successfully');
      }
    }).catch((error) => {
      console.log('Failed to delete post');
      console.error(error);
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
          <p className="text-gray-500">Manage your blog posts</p>
        </div>
        <Link
          to="/dashboard/new-post"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Post
        </Link>
      </div>

      {isLoading && <div className="text-center py-12 text-red-400">Loading...</div>}

      {!isLoading && posts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first post</p>
          <Link
            to="/posts/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Post
          </Link>
        </div>
      )}

      {!isLoading && !!posts.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {post.image_url && (
                <img
                  src={post.image_url as string}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${post.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {post.status}
                  </span>
                  <div className="flex space-x-2 text-white">
                    <button
                      disabled
                      className="p-2 bg-gray-400 text-white hover:bg-gray-800 rounded-sm"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 bg-red-400 hover:bg-red-600 rounded-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        handlerPostDeletion(post.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;