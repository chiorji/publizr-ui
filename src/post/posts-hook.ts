import { useSelector } from "react-redux";
import { useAllQuery, useByIdQuery, useRecentQuery, useByAuthorIdQuery, useDeletePostMutation, useFeaturePostMutation } from "./post-slice";
import { RootState } from "../api-store/store";
import { DeletePostParams } from "./post-types";
import { processRequestError } from "../lib";
import { useToast } from "../components/toast/toast-context";

export const useGetAllPosts = () => {
  const { data, isLoading, error, refetch } = useAllQuery(null, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return {
    data: data && data.data,
    size: data?.size ?? 0,
    isLoading,
    error,
    refetch
  };
}

export const useGetPostById = (id: number) => {
  const { data, isLoading, error, refetch } = useByIdQuery(id, {
    skip: !id,
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
  const { id } = useSelector((state: RootState) => state.authStateSlice);
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

export const useDeletePost = () => {
  const toast = useToast();
  const [handler, { isLoading, error }] = useDeletePostMutation();

  const handlePostDeletion = (props: DeletePostParams) => {
    handler(props).unwrap().then(() => {
      toast.open({
        message: 'Post deleted successfully',
        variant: "success",
      })
    }).catch((error) => {
      toast.open({
        message: processRequestError(error, 'Error deleting post'),
        variant: "destructive",
      });
    });
  }

  return { isLoading, error, handlePostDeletion };
}

export const useFeaturePost = () => {
  const toast = useToast();
  const [handler, { isLoading, error }] = useFeaturePostMutation();

  const handlePostFeaturing = (postId: number) => {
    handler(postId).unwrap().then(() => {
      toast.open({
        message: 'Post feature status updated successfully',
        variant: "success",
      })
    }).catch((error) => {
      toast.open({
        message: processRequestError(error, 'Error updating post feature status'),
        variant: "warning",
      });
    });
  }

  return { isLoading, error, handlePostFeaturing };
}

export const transformPostTags = (tags: string) => [...new Set([tags])].map((v) => v).join(', ');