"use client";

import { parseCookies, setCookie } from "nookies";
import { useEffect, useContext } from "react";
import { FavoriteContext } from "../providers/FavoriteProvider/FavoriteProvider";

export const useFavorite = () => {
  const { likedJobIds, setLikedJobIds } = useContext(FavoriteContext);
  const cookies = parseCookies();

  useEffect(() => {
    const v = cookies.likedJobs;
    if (!v) return;
    const likes = v.split(",");
    setLikedJobIds(likes);
  }, [cookies.likedJobs, setLikedJobIds]);

  const isLiked = (jobId: string) => {
    return likedJobIds.includes(jobId);
  };

  const like = (jobId: string) => {
    if (!likedJobIds.includes(jobId)) {
      const updatedLikes = [...likedJobIds, jobId];
      setLikedJobIds(updatedLikes);
      setCookie(null, "likedJobs", updatedLikes.join(","), {
        maxAge: 2147483647,
        secure: true,
        httpOnly: false,
        sameSite: "strict",
      });
    }
  };

  const unlike = (jobId: string) => {
    const updatedLikes = likedJobIds.filter((id) => id !== jobId);
    setLikedJobIds(updatedLikes);
    setCookie(null, "likedJobs", updatedLikes.join(","), {
      maxAge: 2147483647,
      secure: true,
      httpOnly: false,
      sameSite: "strict",
    });
  };

  return {
    jobIds: likedJobIds,
    like,
    unlike,
    isLiked,
    count: likedJobIds.length,
  };
};
