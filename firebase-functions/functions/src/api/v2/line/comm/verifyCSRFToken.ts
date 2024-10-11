import {getFirestore} from "firebase-admin/firestore";
import {error, info} from "firebase-functions/logger";
import {suffixWith} from "./tmpl";

/* [CSRF対策] トークンの検証 */
export const verifyCSRFToken = async (state: string): Promise<boolean>=> {
  const msg = suffixWith(`[state]: ${state}`);
  info(msg("[stateチェック開始]"));
  try {
    const doc = await getFirestore().collection("states").doc(state).get();
    if (!doc.exists) {
      throw new Error(msg("stateドキュメントが存在しません"));
    }
    return true;
  } catch (e) {
    error(msg(`firestoreエラー: + ${e}`));
    throw new Error(msg(`firestoreエラー: + ${e}`));
  }
};
