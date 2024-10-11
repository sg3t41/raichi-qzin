import { getFirestore } from "firebase-admin/firestore";
import { error } from "firebase-functions/logger";

export type JobData = {
  job: {
    /* 案件見出し */
    title: string;
    /* サブタイトル */
    subtitle: string;
    /* 案件イメージ画像 */
    imageUrl: string;
    /* LINE Flex MessageのJSON文字列 */
    lineFlexMsgCard: string;

    /* フォーマット */
    format: string;
    /* 仕事条件・内容等 */
    details: {
      /* 顔出し範囲 */
      facialExposure: string;
      /* 撮影場所 */
      location: string;
      /* 拘束時間 */
      hours: string;
      /* スキン(S着・外出し可など) */
      skin: string;
      /* 報酬受け渡しのタイミング */
      paymentTiming: string;
      /* 撮影内容 */
      scenes: string[];
      /* 備考 */
      notes: string[];
      /* ギャラ目安 */
      guarantee: string;
    };
    /* 募集要項 */
    recruitment: {
      /* 年齢採用基準 */
      age: string;
      /* スペ採用基準 */
      spe: string;
      /* 必須項目 */
      required: string[];
      /* 歓迎項目 */
      welcome: string[];
      /* 備考 */
      notes: string[];
    };
    tags?: string[];
  };
};

export const getJobData = async (jobId: string): Promise<JobData | undefined> => {
  const doc = await getFirestore().collection("jobs").doc(jobId).get();
  if (!doc.exists) {
    error("ジョブデータがありません jobid:" + jobId);

    return undefined;
  }
  const data = doc.data();
  return data as JobData;
};
