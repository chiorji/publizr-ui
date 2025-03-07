import { useEffect, useState } from "react";
import { useCheckIfUserLikedPostQuery, useGetLikesCountQuery, useLikePostMutation } from "./like-slice"
import { Like } from "./like-types";

export const useLikePost = () => {
  const [liked, setLiked] = useState(false);
  const [likeHandler, { isLoading }] = useLikePostMutation();

  const handleLikes = (payload: Like) => {
    setLiked(() => !liked);
    likeHandler(payload).unwrap().then((response) => {
      setLiked(response);
    }).catch(() => {
      setLiked(() => !liked);
    });
  }

  return { handleLikes, isLoading, liked };
}

export const useGetLikeCount = (postId: number) => {
  const { data, isLoading } = useGetLikesCountQuery(postId, {
    skip: !postId,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  return { isLoading, likes: data ?? 0 };
}

export const checkIfUserLikedPost = (like: Like) => {
  const { data, isLoading } = useCheckIfUserLikedPostQuery(like, {
    skip: !(like.post_id && like.user_id),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  useEffect(() => {
    console.log({data, isLoading})
  }, [data, isLoading])
  return { isLoading, liked: data ?? false };
}