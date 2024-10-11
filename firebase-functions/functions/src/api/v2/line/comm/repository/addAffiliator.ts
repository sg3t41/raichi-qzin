// import { getFirestore } from "firebase-admin/firestore";
import {error, info} from "firebase-functions/logger";
import {LineProfile} from "../line-login-api/verifyLineToken";
import {FieldValue, getFirestore} from "firebase-admin/firestore";
import {encryptSha256} from "../sha256";

export const addAffiliaotrs = async ({
  profile,
  jobId,
}: {
  profile: LineProfile;
  jobId: string;
}) => {
  try {
    info(`[開始] db登録処理 profile: ${profile} jobId: ${jobId}`);
    await getFirestore().collection("affiliators").add({
      affiliatorId: encryptSha256(profile.sub),
      jobId,
      lineProfile: {...profile},
      createdAt: FieldValue.serverTimestamp(), // TODO: TZ設定
    });
    info("db登録終了" + JSON.stringify(profile) + "|" + jobId + "|");
  } catch (e) {
    error("job submit data error.", e);
    throw new Error("db問い合わせ情報の追加エラー");
  }
};
