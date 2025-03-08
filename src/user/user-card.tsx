import { User } from "./user-types"
import { Trash } from 'lucide-react'
import { useRoleBasedAccess } from "../rbac/rbac-hook";
import { useDeleteUser } from "./users-hook";

export const UserCard: React.FC<{ data: User }> = ({ data }) => {
  const { handleDeletion, isLoading: isDeletingUser } = useDeleteUser();
  const { hasPermission } = useRoleBasedAccess();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden text-gray-800 hover:shadow-lg py-4">
      <img
        src={'/laptop.jpg'}
        alt={data.username}
        className="w-32 h-32 object-cover rounded-full mx-auto"
      />
      <div className="p-4 flex flex-col gap-1">
        <span className="font-bold">Name: {data.username}</span>
        <span className="text-gray-500">Email: {data.email}</span>
        <span className="text-gray-500">{data.role}</span>
        {data.created_at && <span className="text-gray-500">Joined: {new Date(data.created_at).toLocaleString()}</span>}
        {hasPermission("user.delete") &&
          <>
            <span>Status:{' '}
              <span className={`${data.is_deleted ? 'text-red-400' : 'text-green-400'}`}>
                {data.is_deleted ? 'Deleted' : 'Active'}
              </span>
            </span>
            <button
              onClick={() => handleDeletion(data.id)}
              className="ml-auto"
              disabled={!isDeletingUser}
            >
              <Trash className="text-red-400 hover:text-red-500" />
            </button>
          </>}
      </div>
    </div>
  )
}