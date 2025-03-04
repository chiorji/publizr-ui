import { Calendar, Clock, User } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetPostById } from '../../hooks/posts';

const BlogDetail = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetPostById(Number(slug));

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
          {data.tags?.split(',').map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;