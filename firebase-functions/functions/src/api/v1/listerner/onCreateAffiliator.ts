import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {linePushMsg} from "../lib/linePushMsg";
import {AffiliatorData} from "../attribute/types";
import * as consts from "../attribute/consts";
import {info} from "firebase-functions/logger";

// アフィリエイターが登録した後にするLINE処理
export const onCreateAffiliator = onDocumentCreated(
  {
    document: "affiliators/{id}",
    region: "asia-northeast1",
    maxInstances: 10,
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const data = snapshot.data() as AffiliatorData;

    const msg1 = {
      type: "text",
      text: "あなた専用のフィリエイトリンクを生成しました",
    };

    const affurl = data.jobId ?
      `${consts.BASE_URL}/job/${data.jobId}?a=${data.affiliatorId}` :
      `${consts.BASE_URL}?a=${data.affiliatorId}`;
    const msg2 = {type: "text", text: affurl};

    const msg3 = {
      type: "text",
      text: `[報酬制度]
    [LINE交換毎]: 1000円
    [成約毎]: 5000円
    ※本アカウントからPayPay自動送金となります。
    `,
    };

    await linePushMsg({
      to: data.lineId,
      message: [msg1, msg2, msg3],
      channelSecret: consts.AFFILIATOR_LINE_CLIENT_SECRET,
      channelAccessToken: consts.AFFILIATOR_LINE_ACCESS_TOKEN,
    });

    info("LINE送信を完了しました. line id:" + data.lineId);
  }
);
