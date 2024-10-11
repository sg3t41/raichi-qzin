import {error, info} from "firebase-functions/logger";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {HistoryData} from "../attribute/types";
import {getJobData} from "../lib/jobInfo";
import {linePushMsg} from "../lib/linePushMsg";
import * as consts from "../attribute/consts";

/* 女の子が登録した後に送るLINE処理 */
export const onCreateInquery = onDocumentCreated(
  {
    document: "submit_histries/{id}",
    region: "asia-northeast1",
    maxInstances: 10,
  },
  async (event) => {
    info("問い合わせDBリスナー作動");
    const snapshot = event.data;
    if (!snapshot) return;

    const data = snapshot.data() as HistoryData;
    const jobData = await getJobData(data.jobId);
    if (!jobData) {
      error("ジョブデータがありません jobid:" + data.jobId);
      return;
    }
    info(jobData.job.lineFlexMsgCard);
    const msg1 = JSON.parse(jobData.job.lineFlexMsgCard);
    const msg2 = {
      type: "text",
      text: `
この度はライチ求人の案件にご応募いただき誠にありがとうございます✨
案件詳細をご確認いただいた上、撮影希望日を第三希望までお送りください🙇‍♂️
また何か気になる点やご質問などありましたらぜひお気軽にご相談ください🤲
`,
    };

    info(msg1, msg2, data.lineId);

    await linePushMsg({
      to: data.lineId,
      message: [msg1, msg2],
      channelSecret: consts.JOB_SEEKER_LINE_CLIENT_SECRET,
      channelAccessToken: consts.JOB_SEEKER_LINE_ACCESS_TOKEN,
    });

    info("LINE送信を完了しました. line id:" + data.lineId);
  }
);
