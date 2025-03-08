import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { useGetPostsByAuthorId } from "./posts-hook";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import PostCard from "./post-card";

export const PostByAuthor: React.FC = () => {
  const { data, size, isLoading } = useGetPostsByAuthorId();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="!shadow-none">
        <CardHeader className="w-full !flex-row justify-between mb-8">
          <div>
            <CardTitle>My Pubs</CardTitle>
            <CardDescription>Manage your publications</CardDescription>
          </div>
          {size != 0 && <Link
            to="/publish"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md ml-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Pub
          </Link>}
        </CardHeader>
        <CardContent>
          {!isLoading && size === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">You have no posts yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first post</p>
              <Link
                to="/publish"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Post
              </Link>
            </div>
          )}

          {(!isLoading && data) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((post) => <PostCard data={post} key={post.id} />)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}