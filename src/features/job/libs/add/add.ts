import { db } from "@/libs/firebase/admin";
import { type JobType } from "../../types/job";

//とりあえずのデータ追加用
const data = {
  title: "【絡み有】個撮AV案件@都内",
  subtitle:
    "【S着・マスク可】 拘束4~ギャラ30万円以上お渡しの実績もございます✨ ",
  imageUrl: "/tmp1.png",
  lineFlexMsgCard: "-",
  format: "-",
  details: {
    location: "東京都",
    hours: "4~6時間",
    payment: "即日現金手渡し",
    guarantee: "最低8万円~30万円以上も可",
    require: "18歳以上(高校生不可)",
    idCard: "必須",
    touch: "有",
    karami: "有(2回)",
  },
  jobStep: [
    {
      step: 1,
      text: "集合",
      hour: 0.5,
      description: "撮影監督と都内の指定場所で待ち合わせ・合流をします。",
    },
    {
      step: 2,
      text: "デートシーン撮影",
      hour: 1,
      description:
        "最寄りのゲームセンター・カフェなどでデートシーンの撮影をします。",
    },
    {
      step: 3,
      text: "デートシーン撮影",
      hour: 1,
      description: "撮影前の事前確認",
    },
  ],
  tags: ["東京都", "マスク可", "ウィッグ可", "ゴム着可", "即日払い"],
  faq: [
    {
      question: "test",
      answer: ["", "", ""],
    },
    {
      question: "test",
      answer: ["", "", ""],
    },
    {
      question: "test",
      answer: ["", "", ""],
    },
  ],
  kuchikomi: [],
};

export async function add(data: JobType) {
  const docRef = await db.collection("jobs").add({});
}
