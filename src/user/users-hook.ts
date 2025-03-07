import { useGetAllUsersQuery, useDeleteUserMutation } from "./user-slice";
import { useToast } from "../components/ui/toast/toast-context";
import { processRequestError } from "../lib";

export const useGetAllUsers = () => {
  const { data, isLoading, refetch, error } = useGetAllUsersQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  });

  return {
    error,
    refetch,
    isLoading,
    data: data?.data ?? [],
    size: data?.size ?? 0
  }
}

export const useDeleteUser = () => {
  const toast = useToast();
  const [handler, { isLoading }] = useDeleteUserMutation();

  const handleDeletion = (userId: number) => {
    handler(userId).unwrap().then(() => {
      toast.open({
        message: 'User deleted successfully',
        variant: "success",
      })
    }).catch((error) => {
      toast.open({
        message: processRequestError(error, 'Error deleting user'),
        variant: "destructive",
      });
    });
  }

  return { handleDeletion, isLoading }
}