import { useDeletePost, useFeaturePost, useGetAllPosts } from "../post/posts-hook"
import { Link } from "react-router-dom";
import { EmptyContent } from "../components/ui/empty-content";
import { Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const AdminPostView: React.FC = () => {
  const { data, isLoading, error } = useGetAllPosts();
  const { handlePostDeletion } = useDeletePost();
  const { handlePostFeaturing } = useFeaturePost();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (!data?.length) return <EmptyContent />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <Card className="w-full max-w-7xl mt-8 !shadow-none !rounded-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Publications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-gray-600">
            {data.map(post => (
              <li key={post.id} className="p-2 border-b border-t border-gray-100 hover:bg-gray-100">
                <div className="grid grid-cols-6 items-center space-x-4">
                  <div className="col-span-2 flex items-center gap-4">
                    <img src={post.url} alt={post.title} className="size-[40px] object-cover rounded-sm" />
                    <div>
                      <span className="text-lg font-bold">{post.title}</span>
                      <p className="text-sm text-gray-500">By {post.username} on {new Date(post.posted_on).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span>ID: {post.id}</span>
                  <button onClick={() => handlePostFeaturing(post.id)}>
                    {post.featured ? 'Featured' : 'Feature this post'}
                  </button>
                  <Link to={`/admin/post/${post.id}`} className="text-blue-300">Open this post</Link>
                  <button className="ml-auto" onClick={() => handlePostDeletion({
                    author_id: post.author_id,
                    id: post.id
                  })}>
                    <Trash className="text-red-400 hover:text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}