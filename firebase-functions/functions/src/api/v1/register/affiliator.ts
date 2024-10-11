import {Response} from "express";
import {error, info} from "firebase-functions/logger";
import {onRequest, Request} from "firebase-functions/v2/https";
import {addAffiliator} from "../lib/addAffiliator";
import {getLineId} from "../lib/lineId";
import {getLineLoginIdToken} from "../lib/lineLoginIdToken";
import {encryptSha256} from "../lib/sha256";
import {validateAffiliatorQuery} from "../lib/validateRequestQuery copy";
import {verifyCSRFToken} from "../lib/verifyCSRFToken";
import {LineIdToken, LineId} from "../attribute/types";
import * as consts from "../attribute/consts";

export const affiliator = onRequest(
  {region: "asia-northeast1", maxInstances: 10},
  async (request: Request, response: Response) => {
    try {
      // バリデーション
      const validateResult = validateAffiliatorQuery(request.query);
      if (!validateResult) {
        error(`ユーザーからの入力値が不正です。\n入力値:\n${request.query}`);
        return;
      }
      const validatedQuery = validateResult as {
        state: string;
        code: string;
        jobid?: string;
      };

      // CSRFトークンの検証
      const isCSRFverify = await verifyCSRFToken(validatedQuery.state);

      // ///////ローカル検証時コメントアウト
      if (!isCSRFverify) {
        error(`CSRF検証エラーです。state:\n${validatedQuery.state}`);
        return;
      }

      const redirectUri = `${consts.AFFILIATOR_LINE_CALLBACK_URI}${
        validatedQuery.jobid ? `?jobid=${validatedQuery.jobid}` : ""
      }`;
      info("@@" + redirectUri);
      const lineIdTokenResult: LineIdToken | undefined =
        await getLineLoginIdToken({
          grantType: "authorization_code",
          code: validatedQuery.code,
          clientId: consts.AFFILIATOR_LINE_CLIENT_ID,
          clientSecret: consts.AFFILIATOR_LINE_CLIENT_SECRET,
          redirectUri,
        });
      if (!lineIdTokenResult) {
        error(
          `LINE IDトークンの取得に失敗しました。
          state:${validatedQuery.state}code:${validatedQuery.code}`
        );
        return;
      }
      const lineIdToken = lineIdTokenResult as LineIdToken;

      // LINE ID取得
      const lineIdResult: LineId | undefined = await getLineId(
        lineIdToken,
        consts.AFFILIATOR_LINE_CLIENT_ID
      );
      if (!lineIdResult) {
        error(`LINE IDの取得に失敗しました。:${lineIdResult}`);
        return;
      }
      const lineId = lineIdResult as LineId;

      // TODO: 余裕があれば
      // アフィリエイターデータ保存(ユーザー認証情報はクライアントで保持しない)
      // アフィリエイトコードはlineidのsha256ハッシュ。漏洩モーマンタイ。
      const jobId = validatedQuery.jobid ?? "";
      const affiliatorId = encryptSha256(lineId);
      await addAffiliator(lineId, affiliatorId, jobId);

      info(`アフィリエイター登録の受付を完了しました。${lineId}`);

      const affurl = jobId ?
        `${consts.BASE_URL}/job/${jobId}?a=${affiliatorId}` :
        `${consts.BASE_URL}?a=${affiliatorId}`;

      response.redirect(`${affurl}&ar=true`); // job result
    } catch (e) {
      error("全体エラー", e);
      response.json({result: "エラー"});
    }
  }
);
