import { useDeleteUser, useGetAllUsers } from "./users-hook";
import { EmptyContent } from "../components/ui/empty-content";
import { Trash } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const AdminUserView: React.FC = () => {
  const { data, isLoading, error } = useGetAllUsers();
  const { handleDeletion, isLoading: isDeletingUser } = useDeleteUser();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (!data) return <EmptyContent />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <Card className="w-full max-w-7xl mt-8 !shadow-none !rounded-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-gray-600">
            {data.map(user => (
              <li key={user.id} className="p-2 border-gray-100 border-t border-b hover:bg-gray-100 grid grid-cols-7 text-sm">
                <span className="font-bold">{user.username}</span>
                <span className="text-gray-500">{user.email}</span>
                <span className="lowercase">{user.role}</span>
                <span>Joined on {new Date(user.created_at).toLocaleDateString()}</span>
                <span>ID: {user.id}</span>
                <span className={`${user.is_deleted ? 'text-red-400' : 'text-green-400'}`}>{user.is_deleted ? 'Deleted' : 'Active'}</span>
                {!/admin/i.test(user.role) &&
                  <button
                    onClick={() => handleDeletion(user.id)}
                    className="ml-auto"
                    disabled={isDeletingUser}
                  >
                    <Trash className="text-red-400 hover:text-red-500" />
                  </button>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}