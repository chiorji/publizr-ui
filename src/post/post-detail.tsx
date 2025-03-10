import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, Edit2, Heart, HeartOff, Trash2, User, Star, StarOff, Tags } from 'lucide-react';
import { useDeletePost, useFeaturePost, useGetPostById } from './posts-hook';
import { checkIfUserLikedPost, useGetLikeCount, useLikePost } from '../like/like-hook';
import { useSelector } from 'react-redux';
import { RootState } from '../api-store/store';
import { checkIfPostIsEdited } from '../lib';
import { useRoleBasedAccess } from '../rbac/rbac-hook';
import { Post } from './post-types';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { handlePostDeletion } = useDeletePost();
  const { handlePostFeaturing } = useFeaturePost();
  const { id: user_id } = useSelector((state: RootState) => state.authStateSlice);
  const { data, isLoading } = useGetPostById(Number(slug));
  const { handleLikes, liked, isLoading: isLiking } = useLikePost();
  const { likes } = useGetLikeCount(Number(slug));
  const { liked: alreadyLiked, isLoading: isLoadingLikeCheck } = checkIfUserLikedPost({
    post_id: Number(slug),
    user_id
  });

  const { hasPermission } = useRoleBasedAccess();
  const isPostAuthor = data?.author_id === user_id;
  const canLikePost = hasPermission('post.edit');
  const canDeletePost = hasPermission('post.delete');
  const canDeleteAllPost = hasPermission('post.all.delete');
  const canFeaturePost = hasPermission("post.feature");

  const canLikeAndEditPost = canLikePost && data?.author_id === user_id;
  const canLikeAndDeletePost = canDeletePost && (isPostAuthor || canDeleteAllPost);

  const handleLikeToggle = () => {
    if (!data) return;
    handleLikes({ post_id: Number(slug), user_id });
  };

  const goToPostEditor = (post: Post) => {
    navigate('/update', { state: { post } })
  }

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <Navigate to="/404" />;
  const isPostEdited = checkIfPostIsEdited(data.posted_on, data.last_updated);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={data.url}
        alt={data.title}
        className="w-full h-[350px] object-cover rounded-xl"
      />

      <div className="prose lg:prose-xl max-w-none">
        <h1 className="text-4xl font-bold my-4 text-blue-600">{data.title}</h1>

        <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
          <div className="flex items-center uppercase">
            <User className="h-5 w-5 mr-2" />
            {data.username}
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            {new Date(data.posted_on).toLocaleString()}
          </div>
          {isPostEdited && <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Edited{' '}{new Date(data.last_updated).toLocaleString()}
          </div>}
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            {data.read_time} {" "} min{data.read_time > 1 ? "s" : ""}
          </div>
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            {likes}
          </div>
        </div>

        <div className="mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {data.category}
          </span>
        </div>

        <div className="mt-8 text-gray-800">
          {data.content}
        </div>
        {data?.tags &&
          <div className="mt-8 flex gap-2">
            <Tags className='text-sm text-gray-500' />
            {data.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        }

        {canLikePost && <div className='flex gap-8 items-center'>
          <button onClick={handleLikeToggle} className="focus:outline-none mt-8 flex items-center gap-2 text-gray-800" disabled={isLiking || isLoadingLikeCheck}>
            {(liked || alreadyLiked) ? (
              <Heart className="text-red-400" />
            ) : (
              <HeartOff className="text-red-400" />
            )}
            {(liked || alreadyLiked) ? 'Liked' : 'Like'}
          </button>

          <div className="flex space-x-2 text-white gap-4 ml-auto">
            {canFeaturePost && <button
              className={`${data.featured ? 'text-yellow-400 hover:text-yellow-600' : 'text-red-400 hover:text-red-600'}`}
              onClick={() => handlePostFeaturing(data.id)}
            >
              {data.featured ? <Star /> : <StarOff />}
            </button>}
            {
              canLikeAndEditPost &&
              <button
                className="p-2 bg-gray-400 text-white hover:bg-gray-800 rounded-sm"
                onClick={() => {
                  goToPostEditor(data);
                }}
              >
                <Edit2 className="size-4" />
              </button>
            }

            {canLikeAndDeletePost &&
              <button
                disabled={isLoading}
                className="p-2 bg-red-400 hover:bg-red-600 rounded-sm"
                onClick={(e) => {
                  e.preventDefault()
                  handlePostDeletion({
                    author_id: data.author_id,
                    id: data.id
                  })
                }}
              >
                <Trash2 className="size-4" />
              </button>
            }
          </div>
        </div>
        }
      </div>
    </article>
  );
};

export default BlogDetail;