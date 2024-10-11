import {Response} from "express";
import {onRequest, Request} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {error} from "firebase-functions/logger";

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
    info: {
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
      /* 顔出し範囲 */
      facialExposure: string;
      /* 備考 */
      note: string[];
      /* ギャラ目安 */
      garantee: string;
    };
    /* 募集要項 */
    recruit: {
      /* 年齢採用基準 */
      age: string;
      /* スペ採用基準 */
      spe: string;
      /* 必須項目 */
      required: string[];
      /* 歓迎項目 */
      optional: string[];
      /* 備考 */
      note: string[];
    };
  };
};

const _TEST_DATA_: Job = {
  job: {
    title:
      "【アダルトVTuber】Youtubeライブ/週4自宅配信🏠アダルト撮影/月1都内🏨 月収32万円~💴 |" +
      " おしゃべり好き・歌や絵などクリエイター的な趣味のある方大歓迎✨【月払い】",
    subtitle: `
主に自宅でのライブ配信・TwitterなどSNS運用がメインのお仕事となりますが、アダルトシーンの撮影で月に1度は都内。
インフルエンサー業・アダルトVTuberのお仕事にご興味ある方、まずは気軽にお問い合わせください✨`,
    imageUrl: "/tmp4.jpeg",
    lineFlexMsgCard: "Vtuberの",
    format: "[Vtuberのフォーマット]",
    info: {
      location: "定期的に都内遠征できれば国内どこでも可",
      hours: "週4ライブ配信 + 月1都内撮影",
      skin: "絡みなし",
      paymentTiming: "月払い",
      facialExposure: "首上の露出なし",
      scenes: [
        "オナニーシーン撮影",
        "ASMR動画",
        "歌や絵など特技がある方、ゲームやお喋りなど得意なことを企画します。",
      ],
      note: [""],
      garantee: "月給328,000円〜(SNSフォロワーにより変動)",
    },

    recruit: {
      age: "問わず",
      spe: "問わず",
      required: [
        "長い期間活動し続けられる方",
        "シフト制勤務ができる方",
        "時間・",
      ],
      optional: [
        "複数人プレイができる方",
        "レズプレイができる方",
        "演技が得意な方",
      ],
      note: ["ご応募・お問い合わせお待ちしております。"],
    },
  },
};

export const job = onRequest(
  {region: "asia-northeast1", maxInstances: 10},
  async (request: Request, response: Response) => {
    // const job = request.body as Job;
    await add();
    response.json("testtest");
  }
);

// TODO: 構造体で型チェックしたいけどこれ以前変えるのめんどいからとりあえずこのまま。
export const add = async () => {
  try {
    // 応募データ保存(ユーザー認証情報はクライアントで保持しない)
    // TODO: 余裕があれば
    await getFirestore().collection("jobs").add(_TEST_DATA_);
  } catch (e) {
    error("job data add error.");
    throw new Error("jobdata add エラー");
  }
};
