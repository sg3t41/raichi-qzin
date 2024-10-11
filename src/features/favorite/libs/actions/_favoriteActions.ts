// "use server";
// import { cookies } from "next/headers";
// import { getLikedJobIds } from "../_favorite";
// import { revalidatePath } from "next/cache";

// export const unlike = async (jobId: string, e: FormData) => {
//   const liked = getLikedJobIds();
//   const updatedLiked = liked.filter((likedId) => likedId !== jobId);
//   cookies().set("likedJobs", updatedLiked.join(","));
//   console.log(jobId + "きたよ");
//   revalidatePath("/");
// };

// export const like = async (jobId: string, e: FormData) => {
//   const liked = getLikedJobIds();
//   liked.push(jobId);
//   cookies().set("likedJobs", liked.join(","));
//   console.log(jobId + "こいつが呼ばれるはずなんだよな");
//   revalidatePath("/");
// };
