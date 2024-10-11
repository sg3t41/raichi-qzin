import { getFirestore } from "firebase-admin/firestore";
import { error } from "firebase-functions/logger";

// TODO: 構造体で型チェックしたいけどこれ以前変えるのめんどいからとりあえずこのまま。
export const addJobSubbmitHistory = async (
  lineId: string,
  jobid: string,
  supporterid: string
) => {
  try {
    // 応募データ保存(ユーザー認証情報はクライアントで保持しない)
    // TODO: 余裕があれば
    await getFirestore().collection("submit_histries").add({
      lineId: lineId,
      jobId: jobid,
      affiliatorId: supporterid,
      createdAt: new Date().toString(), // TODO: TZ設定
    });
  } catch (e) {
    error("job submit data error.");
    throw new Error("db問い合わせ情報の追加エラー");
  }
};
