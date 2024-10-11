"use server";

import { cookies } from "next/headers";

export const like = ({ id }: { id: string }) => {
  const liked = getLikedJobIds();
  liked.push(id);
  cookies().set("likedJobs", liked.join(","));
};

export const unlike = ({ id }: { id: string }) => {
  const liked = getLikedJobIds();
  const updatedLiked = liked.filter((likedId) => likedId !== id);
  cookies().set("likedJobs", updatedLiked.join(","));
};

export const isLiked = ({ id }: { id: string }) => {
  const likedJobIds = getLikedJobIds();

  return likedJobIds.includes(id);
};

export const getLikedJobIds = () => {
  const cookieStore = cookies();
  const idsStr = cookieStore.get("likedJobs");
  const ids: string[] = idsStr?.value.split(",").filter(Boolean) || [];
  return ids;
};

export const likedCount = () => {
  const count = getLikedJobIds.length;
  return count;
};
