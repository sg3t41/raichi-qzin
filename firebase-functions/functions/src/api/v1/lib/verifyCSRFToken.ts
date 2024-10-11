import { getFirestore } from "firebase-admin/firestore";
import { error } from "firebase-functions/logger";

/* [CSRF対策] トークンの検証 */
export const verifyCSRFToken = async (state: string): Promise<boolean> => {
  try {
    // クライアントで生成したはずのstateがDBに存在しない場合はセキュリティエラー
    const doc = await getFirestore().collection("states").doc(state).get();
    console.log(doc.exists + "@@@@@@@@")
    return doc.exists;
  } catch (e) {
    error("CSRFトークンの検証エラー", e);
    return false;
  }
};
