import {Response} from "express";
import {onRequest, Request} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";

export type Job = {
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
    tags?: string[]
  };
};

export const mock = onRequest(
  {region: "asia-northeast1", maxInstances: 10, memory: "1GiB"},
  async (request: Request, response: Response) => {
    const j: Job = {
      job: {
        title: "【都内】個撮AV案件",
        subtitle: `拘束6h 手当10~ 最短当日受け入れ、現場ギャラ決めOK!
        やりたくないことやれないことは一切強要いたしません。下記の「LINE応募」から質問や相談からご連絡お待ちしております。`,
        imageUrl: "/tmp4.jpeg",
        lineFlexMsgCard: "///",
        format: "tmp",
        details: {
          facialExposure: "マスク着用可",
          location: "東京都新宿区",
          hours: "最大6時間",
          skin: "ゴム着可",
          paymentTiming: "撮影日現金手渡し",
          scenes: ["デート風の外撮り1時間(最寄りのゲームセンター・猫カフェなどでデートシーンの外撮りを1時間程度)",
            "絡み×2回", "アフピル支給"],
          notes: ["顔の露出エリア・NGプレイなど柔軟にご対応いたしますのでお気軽にご相談ください。",
            "※適法粒度のモザイク・映像送信型性風俗特殊営業届届出済み"],
          guarantee: "最低8~30万円以上も可",
        },
        recruitment: {
          age: "18~35歳(目安)",
          spe: "スペ95~",
          required: ["満18歳以上", "顔写真付き身分証明書"],
          welcome: ["未経験の方", "清楚・ロリ・素人系の方"],
          notes: ["※採用基準はあくまでも目安になりますので、気になった方はぜひお気軽にご応募・お問い合わせください。"],
        },
        tags: ["即日即金", "S着", "マスク"],
      },
    };


    await getFirestore().collection("jobs").add({...j});
    response.json("送信完了しました。");
  }
);


