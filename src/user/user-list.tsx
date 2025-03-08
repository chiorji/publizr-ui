import { useGetAllUsers } from "./users-hook";
import { EmptyContent } from "../components/empty-content";
import { UserCard } from "./user-card";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";

export const UserList: React.FC = () => {
  const { data, isLoading, error } = useGetAllUsers();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (!data) return <EmptyContent />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 border">
      <Card className="!shadow-none">
        <CardHeader>
          <CardTitle>Discover our Publizrs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map(user => (
              <UserCard data={user} key={user.id} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}