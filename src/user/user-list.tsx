import { Link } from "react-router-dom";
import { useGetAllUsers } from "./users-hook";
import { UserCard } from "./user-card";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { LoaderControl } from "../components/loader-control";
import { processRequestError } from "../lib";
import { EmptyContent } from "../components/empty-content";

export const UserList: React.FC = () => {
  const { data, isLoading, error, size, refetch } = useGetAllUsers();

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 border">
      <Card className="!shadow-none">
        <CardHeader>
          <CardTitle>Discover our Publizrs</CardTitle>
        </CardHeader>
        <LoaderControl
          isLoading={isLoading}
          reloadHandler={refetch}
          isError={!!error}
          error={{ title: 'NO CONTENT TO DISPLAY', subtitle: processRequestError(error) }}
        >
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.map(user => (
                <UserCard data={user} key={user.id} />
              ))}
            </div>
            {size === 0 && <EmptyContent message={
              <div className='flex-col gap-4 text-gray-800 text-sm space-y-8'>
                <h1>NO CONTENT TO DISPLAY</h1>
                <Link to="/login" className='bg-blue-600 !text-white px-4 py-2 rounded-md !hover:bg-blue-700'>
                  Be our Guest
                </Link>
              </div>
            } />}
          </CardContent>
        </LoaderControl>
      </Card>
    </div>
  )
}