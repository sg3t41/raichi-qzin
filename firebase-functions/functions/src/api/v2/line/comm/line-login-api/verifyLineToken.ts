import axios from "axios";
import {error} from "firebase-functions/logger";

export type LineProfile = {
  // IDトークンの生成URL
  iss: string;
  // IDトークンの対象ユーザーID
  sub: string;
  // チャネルID
  aud: string;
  // IDトークンの有効期限。UNIXタイムです。
  exp: number;
  // IDトークンの生成時間。UNIXタイムです。
  iat: number;
  // ユーザー認証時間。UNIXタイムです。認可リクエストにmax_ageの値を指定しなかった場合は含まれません。
  nonce: string;
  /**
   * ユーザーが使用した認証方法のリスト。特定の条件下ではペイロードに含まれません。
   * 以下のいずれかの値が含まれます。
   * pwd：メールアドレスとパスワードによるログイン
   * lineautologin：LINEによる自動ログイン（LINE SDKを使用した場合も含む）
   * lineqr：QRコードによるログイン
   * linesso：シングルサインオンによるログイン
   */
  amr: string[];
  // ユーザーの表示名。認可リクエストにprofileスコープを指定しなかった場合は含まれません。
  name: string;
  // ユーザープロフィールの画像URL。認可リクエストにprofileスコープを指定しなかった場合は含まれません。
  picture: string;
  // ユーザーのメールアドレス。認可リクエストにemailスコープを指定しなかった場合は含まれません。
  email?: string;

  // エラー用
  error?: string;
  error_description?: string;
};

export const verifyLineToken = async ({
  idToken,
  clientId,
}: {
  idToken: string;
  clientId: string;
}): Promise<LineProfile> => {
  /* LINE IDの取得 */
  const url = "https://api.line.me/oauth2/v2.1/verify";
  const params = new URLSearchParams();
  params.append("id_token", idToken);
  params.append("client_id", clientId);

  try {
    const response = await axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*",
      },
    });

    const data = response.data as LineProfile;
    if (!data) {
      throw new Error("Line IDの取得に失敗しました。");
    }
    return data;
  } catch (e) {
    error("LINE ID TOKEN VERIFY ERROR", e);
    throw new Error("error");
  }
};
