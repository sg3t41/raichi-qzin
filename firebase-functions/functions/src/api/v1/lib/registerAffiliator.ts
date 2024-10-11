import { error, info } from "firebase-functions/logger";
import { onRequest, Request } from "firebase-functions/v2/https";
import {
  AFFILIATOR_LINE_CLIENT_ID,
  AFFILIATOR_LINE_CALLBACK_URI,
  RESULT_REDIRECT_URL,
  AFFILIATOR_LINE_CLIENT_SECRET,
} from "../attribute/consts";
import { LineIdToken, LineId } from "../attribute/types";
import { addAffiliator } from "./addAffiliator";
import { getLineId } from "./lineId";
import { getLineLoginIdToken } from "./lineLoginIdToken";
import { encryptSha256 } from "./sha256";
import { validateAffiliatorQuery } from "./validateRequestQuery copy";
import { verifyCSRFToken } from "./verifyCSRFToken";
import { Response } from "express";

export const registerAffiliator = onRequest(
  { region: "asia-northeast1", maxInstances: 10 },
  async (request: Request, response: Response) => {
    try {
      // バリデーション
      const validateResult = validateAffiliatorQuery(request.query);
      if (!validateResult) {
        error(`ユーザーからの入力値が不正です。\n入力値:\n${request.query}`);
        console.log(JSON.stringify(request.query, null, 2));
        return;
      }
      const validatedQuery = validateResult as { state: string; code: string };

      // CSRFトークンの検証
      const isCSRFverify = await verifyCSRFToken(validatedQuery.state);

      // ///////ローカル検証時コメントアウト
      if (!isCSRFverify) {
        error(`CSRF検証エラーです。state:\n${validatedQuery.state}`);
        return;
      }

      const lineIdTokenResult: LineIdToken | undefined =
        await getLineLoginIdToken({
          grantType: "authorization_code",
          code: validatedQuery.code,
          clientId: AFFILIATOR_LINE_CLIENT_ID,
          clientSecret: AFFILIATOR_LINE_CLIENT_SECRET,
          redirectUri: AFFILIATOR_LINE_CALLBACK_URI,
        });
      if (!lineIdTokenResult) {
        error(
          `LINE IDトークンの取得に失敗しました。
          state:${validatedQuery.state}code:${validatedQuery.code}`
        );
        return;
      }
      const lineIdToken = lineIdTokenResult as LineIdToken;

      // LINE LINE ID取得
      const lineIdResult: LineId | undefined = await getLineId(
        lineIdToken,
        AFFILIATOR_LINE_CLIENT_ID
      );
      if (!lineIdResult) {
        error(`LINE IDの取得に失敗しました。:${lineIdResult}`);
        return;
      }
      const lineId = lineIdResult as LineId;

      // TODO: 余裕があれば
      // アフィリエイターデータ保存(ユーザー認証情報はクライアントで保持しない)
      // アフィリエイトコードはlineidのsha256ハッシュ。漏洩モーマンタイ。
      await addAffiliator(lineId, encryptSha256(lineId));

      info(`アフィリエイター登録の受付を完了しました。${lineId}`);

      response.redirect(`${RESULT_REDIRECT_URL}?ar=true`); // job result
    } catch (e) {
      error("全体エラー", e);
      response.json({ result: "エラー" });
    }
  }
);
