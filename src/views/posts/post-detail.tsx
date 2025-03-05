import { Navigate, useParams } from 'react-router-dom';
import { Calendar, Clock, Heart, HeartOff, User } from 'lucide-react';
import { useGetPostById } from '../../hooks/posts';
import { checkIfUserLikedPost, useGetLikeCount, useLikePost } from '../../hooks/like-hook';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const BlogDetail = () => {
  const { slug } = useParams();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.userSlice);
  const { data, isLoading } = useGetPostById(Number(slug));
  const { handleLikes, liked, isLoading: isLiking } = useLikePost();
  const { likes } = useGetLikeCount(Number(slug));
  const { liked: alreadyLiked, isLoading: isLoadingLikeCheck } = checkIfUserLikedPost({
    post_id: Number(slug),
    user_id: user.id
  });

  const handleLikeToggle = () => {
    if (!data) return;
    handleLikes({ post_id: Number(slug), user_id: user.id });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <Navigate to="/404" />;

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
            {new Date(data.posted_on).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            {data.read_time} {" "} min{data.read_time > 1 ? "s" : ""}
          </div>
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
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

        <div className="mt-8 flex gap-2">
          {data?.tags && data.tags.split(',').map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        {isAuthenticated && <button onClick={handleLikeToggle} className="focus:outline-none mt-8 flex items-center gap-2 text-gray-800" disabled={isLiking || isLoadingLikeCheck}>
          {(liked || alreadyLiked) ? (
            <Heart className="text-red-500" />
          ) : (
            <HeartOff className="text-red-500" />
          )}
          {(liked || alreadyLiked) ? 'You liked this post' : 'Like this post'}
        </button>
        }
      </div>
    </article>
  );
};

export default BlogDetail;