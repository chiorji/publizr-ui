import { useSelector } from "react-redux";
import { useAllQuery, useByIdQuery, useRecentQuery, useByAuthorIdQuery } from "../app/api/post-slice";
import { RootState } from "../app/store";

export const useGetAllPosts = () => {
  const { data, isLoading, error, refetch } = useAllQuery(null, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return {
    data: data && data.data,
    isLoading,
    error,
    refetch
  };
}

export const useGetPostById = (id: number) => {
  const { data, isLoading, error, refetch } = useByIdQuery(id, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  return {
    data: data && data.data,
    isLoading,
    error,
    refetch
  }
}

export const useGetRecentPosts = () => {
  const { data, isLoading, error, refetch } = useRecentQuery(null, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return {
    data: data && data.data,
    isLoading,
    error,
    refetch,
    size: data?.size ?? 0
  };
}

export const useGetPostsByAuthorId = () => {
  const { id } = useSelector((state: RootState) => state.users.user);
  const { data, isLoading, error, refetch } = useByAuthorIdQuery(id, {
    skip: !id,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return {
    data: data && data.data,
    isLoading,
    error,
    refetch,
    size: data?.size ?? 0
  };
}