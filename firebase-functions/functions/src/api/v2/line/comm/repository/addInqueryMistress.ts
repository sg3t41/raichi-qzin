// import { getFirestore } from "firebase-admin/firestore";
import {error, info} from "firebase-functions/logger";
import {LineProfile} from "../line-login-api/verifyLineToken";
import {FieldValue, getFirestore} from "firebase-admin/firestore";

export const addInqueryMistress = async ({
  profile,
  jobId,
  affiliatorId,
}: {
  profile: LineProfile;
  jobId: string;
  affiliatorId: string;
}) => {
  try {
    info(`[開始] db登録処理 profile: ${profile} 
      jobId: ${jobId} affiliatorId: ${affiliatorId}`);
    await getFirestore().collection("submit_histries").add({
      jobId,
      affiliatorId,
      lineProfile: {...profile},
      createdAt: FieldValue.serverTimestamp(), // TODO: TZ設定
    });
    info("終わったよー保" + JSON.stringify(profile) +"||"+ jobId +"||"+ affiliatorId);
  } catch (e) {
    error("job submit data error.", e);
    throw new Error("db問い合わせ情報の追加エラー");
  }
};
