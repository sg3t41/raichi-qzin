import { cookies } from "next/headers";

export const getLikedJobIds = (): string[] => {
  const cookieStore = cookies();
  const ids = String(cookieStore.get("likedJobs"))?.split(",") || [];
  return ids;
};
