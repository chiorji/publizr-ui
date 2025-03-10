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
        className="size-24 object-cover rounded-full mx-auto mb-8"
      />
      <div className="p-4 flex flex-col gap-1 items-center">
        <span className="font-bold">{data.username}</span>
        <span className="text-gray-500">{data.email}</span>
        {hasPermission("user.delete") &&
          <>
            {<span className="text-gray-500">{new Date(data.created_at).toLocaleString()}</span>}

            <div className="flex items-center justify-between mt-4 w-full">
              <span className="font-bold">
                #{data.id}{' '}
                <span className={`!text-sm font-normal ${data.is_deleted ? 'text-red-400' : 'text-green-400'}`}>
                  {data.is_deleted ? 'Inactive' : 'Active'}
                </span>
              </span>
              <button
                onClick={() => handleDeletion(data.id)}
                className="ml-auto"
                disabled={isDeletingUser}
              >
                <Trash className="text-red-400 hover:text-red-500" />
              </button>
            </div>
          </>}
      </div>
    </div>
  )
}