import { useGetAllUsersQuery } from "../app/api/user-slice";

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

export const useDeleteUser = () => {}