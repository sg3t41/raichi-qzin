import { getFirestore } from "firebase-admin/firestore";
import { error } from "firebase-functions/logger";

// TODO: 構造体で型チェックしたいけどこれ以前変えるのめんどいからとりあえずこのまま。
export const addAffiliator = async (
  lineId: string,
  affiliatorId: string,
  jobId?: string
) => {
  try {
    await getFirestore()
      .collection("affiliators")
      .add({
        lineId,
        affiliatorId,
        jobId: jobId ?? "",
        createdAt: new Date().toString(), // TODO: TZ設定
      });
  } catch (e) {
    error("job submit data error.");
    throw new Error("db問い合わせ情報の追加エラー");
  }
};
