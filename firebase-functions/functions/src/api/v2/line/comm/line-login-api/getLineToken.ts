// LINEログイン用のIDトークンを取得
import axios from "axios";
import {error, info} from "firebase-functions/logger";
import {LineIdTokenRequestBody} from "../../../../v1/attribute/types";
import {ResponseLineToken} from "../../types";
// 参考: https://developers.line.biz/ja/docs/line-login/integrate-pkce/#issue-access-token
export const getLineToken = async ({
  grantType,
  code,
  redirectUri,
  clientId,
  clientSecret,
}: LineIdTokenRequestBody): Promise<ResponseLineToken> => {
  info(`[開始] LINE TOKEN取得処理 code: ${code} grant_type: ${grantType} 
    client_id: ${clientId} client_secret: 
    ${clientSecret} redirect_uri: ${redirectUri}`);

  const url = "https://api.line.me/oauth2/v2.1/token";

  const params = new URLSearchParams();
  params.append("code", code);
  params.append("grant_type", grantType);
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("redirect_uri", redirectUri);

  try {
    const response = await axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*",
      },
    });
    info(JSON.stringify(response.data+ "@@@@@@@@@@ppppp`````@@@@@@"));
    return response.data as ResponseLineToken;
  } catch (e) {
    error("LINE TOKEN取得に失敗しました。", e);
    throw new Error("LINE TOKEN取得に失敗しました。");
  } finally {
    info("[終了] LINE TOKEN取得処理");
  }
};
