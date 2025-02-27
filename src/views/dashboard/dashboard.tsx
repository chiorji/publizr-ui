import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useByAuthorIdQuery, useDeletePostMutation } from '../../app/api/post-slice';
import { getRandomImagePlaceholder, processRequestError } from '../../lib';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Post } from '../../types/post-types';
import { useToast } from '../../components/ui/toast/toast-context';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const toast = useToast();
  const [deleteHandler] = useDeletePostMutation();
  const { data, isLoading } = useByAuthorIdQuery(user.id, {
    skip: !user.id,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true
  });

  const posts = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((post: Post) => ({
      ...post,
      poster_card: getRandomImagePlaceholder()
    }));
  }, [data?.data])

  const handlerPostDeletion = (id: string | number) => {
    deleteHandler(id).unwrap().then(() => {
      toast.open({
        message: 'Post deleted successfully',
        variant: "success",
      })
    }).catch((error) => {
      toast.open({
        message: processRequestError(error, 'Error deleting post'),
        variant: "destructive",
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Publications</h1>
          <p className="text-gray-500">Manage your publications</p>
        </div>
        {posts.length != 0 && <Link
          to="/dashboard/publish"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Pub
        </Link>}
      </div>

      {isLoading && <div className="text-center py-12 text-red-400">Loading...</div>}

      {!isLoading && posts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first post</p>
          <Link
            to="/dashboard/publish"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Post
          </Link>
        </div>
      )}

      {(!isLoading && posts) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {post.poster_card && (
                <img
                  src={post.poster_card}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${/published/i.test(post.status)
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
                      disabled={isLoading}
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
                  {new Date(post.posted_on).toLocaleDateString()}
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