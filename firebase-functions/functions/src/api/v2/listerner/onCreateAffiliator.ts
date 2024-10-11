import {onDocumentCreated} from "firebase-functions/v2/firestore";

import {info} from "firebase-functions/logger";
import {linePushMsg} from "../../v1/lib/linePushMsg";

export type AffiliatorData = {
  affiliatorId: string;
  lineId: string;
  jobId?: string;
  lineProfile: {
    name: string
    picture: string
    sub: string
  }
};

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
      text: "アフィリエイトリンクを生成しました",
    };

    const affurl = !data.jobId || data.jobId === "/" ?
      `${process.env.BASE_URL}?a=${data.affiliatorId}` :
      `${process.env.BASE_URL}/job/${data.jobId}?a=${data.affiliatorId}`;

    const msg2 = {type: "text", text: affurl};

    const to = data.lineProfile.sub;
    await linePushMsg({
      to,
      message: [msg1, msg2],
      channelSecret: process.env.AFFILIATOR_LINE_LOGIN_CLIENT_SECRET!,
      channelAccessToken: process.env.AFFILIATOR_MESSAGING_API_ACCESS_TOKEN!,
    });

    info("likeid: " + to);
    info("secret: " + process.env.AFFILIATOR_LINE_LOGIN_CLIENT_SECRET!);
    info("channelAccessToken: " +
      process.env.AFFILIATOR_MESSAGING_API_ACCESS_TOKEN!);
    info("af url : " + affurl);

    info(`[アフィリエイトURLを発行しました] アカウント名: ${data.lineProfile.name}`);
  }
);
