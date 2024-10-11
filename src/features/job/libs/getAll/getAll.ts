import { db } from "@/libs/firebase/admin";
import { JobType } from "../../types/job";

export async function getAll(searchOption: {
  // area: string;
  keyword?: string;
}): Promise<JobType[]> {
  const ref = db.collection("jobs");
  const snapshot = await ref
    // .where("tags", "array-contains-any", ["東京"])
    // .where("tags", "array-contains", "東京")
    // .where("title", "!=", "【絡み有】個撮AV案件@都内")
    .get();

  // let snapshot;
  // if (searchOption?.keyword) {
  //   const query = ref.where("tags", "array-contains-any", ["マスク可"]);
  //   snapshot = await query.get();
  // } else {
  //   snapshot = await ref.get();
  // }
  /* 東京案件しかないからとりあえず検索なし */
  // if (searchOption.area) {
  //   query = ref.where("area", "==", searchOption.area);
  // }

  const docs: JobType[] = await Promise.all(
    snapshot.docs.map(async (doc: any) => {
      const data = doc.data();

      console.log(data);

      //ドキュメントIDを追加して返却
      return {
        id: doc.id,
        ...data,
      } as JobType;
    })
  );

  return docs;
}
