import {error, info} from "firebase-functions/logger";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {JobData, getJobData} from "../../v1/lib/jobInfo";
import {linePushMsg} from "../../v1/lib/linePushMsg";
import {AffiliatorData} from "./onCreateAffiliator";
import {getFirestore} from "firebase-admin/firestore";


type InquiryData = {
  jobId?: string;
  affiliatorId: string;
  lineProfile: {
    name: string
    picture: string
    sub: string
  };
};

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

    const inquiryData = snapshot.data() as InquiryData;

    const jobData = await getJobData(inquiryData.jobId ?? "") as JobData;
    if (!jobData) {
      error("ジョブデータがありません jobid:" + inquiryData.jobId);
      return;
    }

    answer({inquiryData, jobData});
    noticeAffiliator({inquiryData, jobData});
  }
);

const answer = async ({
  inquiryData,
  jobData,
}: {
  inquiryData: InquiryData
  jobData: JobData
}) => {
  info(jobData.job.lineFlexMsgCard);

  // todo カードはハングると思うから最後
  const m = `{ "type": "flex", 
    "altText": "【案件詳細】お問い合わせありがとうございます",
     "contents": ${jobData.job.lineFlexMsgCard} }`;
  const cardMsg = JSON.parse(m);

  const msg = {
    type: "text",
    text: `
この度はライチ求人の案件にご応募いただき誠にありがとうございます✨
案件詳細をご確認いただいた上、撮影希望日を第三希望までお送りください🙇‍♂️
また何か気になる点やご質問などありましたらぜひお気軽にご相談ください🤲
`,
  };


  info(msg, inquiryData.lineProfile.sub);

  await linePushMsg({
    to: inquiryData.lineProfile.sub,
    message: [cardMsg, msg],
    channelSecret: process.env.JOBSEEKER_LINE_LOGIN_CLIENT_SECRET ?? "",
    channelAccessToken:
      process.env.JOBSEEKER_MESSAGING_API_ACCESS_TOKEN ?? "",
  });

  info("問い合わせ元へのLINE送信を完了しました. line name:" + inquiryData.lineProfile.name);
};

const noticeAffiliator = async ({
  inquiryData,
  jobData,
}: {
  inquiryData: InquiryData
  jobData: JobData
}) => {
  const {affiliatorId} = inquiryData;
  if (!affiliatorId) return;

  const colRef = getFirestore().collection("affiliators");
  const snapshot = await colRef
    .where("affiliatorId", "==", affiliatorId).limit(1).get();
  if (snapshot.empty) return;

  let affiliatorData: {
    name: string;
    picture: string;
    sub: string;
  } = {
    name: "",
    picture: "",
    sub: "",
  };

  snapshot.forEach((doc) => {
    const d = doc.data() as AffiliatorData;
    affiliatorData = {...d.lineProfile};
    const check = d.lineProfile.name && d.lineProfile.sub;
    if (check) return;
  });

  const msg = {
    type: "text",
    text: `[自動通知]
${affiliatorData.name}さんのアフィリエイトリンクから
"[案件]${jobData.job.title}"へ新規の問い合わせがありました。
`,
  };

  await linePushMsg({
    to: affiliatorData.sub,
    message: [msg],
    channelSecret:
      process.env.AFFILIATOR_LINE_LOGIN_CLIENT_SECRET ?? "",
    channelAccessToken:
      process.env.AFFILIATOR_MESSAGING_API_ACCESS_TOKEN ?? "",
  });
  info("アフィリエイターへのLINE送信を完了しました. line name:" +
    affiliatorData.name);


  //   const db = getDatabase();
  //   const ref = db.ref("affiliators");
  //   ref.on("value", async (snapshot) => {
  //     info("--------");
  //     info("--------");
  //     info(snapshot.val());

  //     const affiliatorData = snapshot.val() as AffiliatorData;
  //     info(affiliatorData);

  //     info("アフィリエイターの情報を取得しました。");
  //     info("data:" + affiliatorData);
  //     info("aa[[ ::" + affiliatorData.lineProfile.sub);

  //     const msg = {
  //       type: "text",
  //       text: `[情報共有] ${affiliatorData.lineProfile.name}さんのアフィリエイトリンクから
  //       "[案件]${jobData.job.title}"へ問い合わせがありました。`,
  //     };

  //     await linePushMsg({
  //       to: affiliatorData.lineProfile.sub,
  //       message: [msg],
  //       channelSecret:
  //         process.env.AFFILIATOR_LINE_LOGIN_CLIENT_SECRET ?? "",
  //       channelAccessToken:
  //         process.env.AFFILIATOR_MESSAGING_API_ACCESS_TOKEN ?? "",
  //     });
  //     info("アフィリエイターへのLINE送信を完了しました. line name:" +
  //       affiliatorData.lineProfile.name);

  //     info("--------");
  //     info("--------");
  //     info("--------");
  //   }, (errorObject) => {
  //     error("The read failed: " + errorObject.name);
  //   });
};
