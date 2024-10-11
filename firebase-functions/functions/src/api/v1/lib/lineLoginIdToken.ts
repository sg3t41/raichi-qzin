// LINEログイン用のIDトークンを取得

import axios from "axios";
import { error } from "firebase-functions/logger";
import { LineIdTokenRequestBody, LineIdToken } from "../attribute/types";

// 参考: https://developers.line.biz/ja/docs/line-login/integrate-pkce/#issue-access-token
export const getLineLoginIdToken = async ({
  grantType,
  code,
  redirectUri,
  clientId,
  clientSecret,
}: LineIdTokenRequestBody): Promise<LineIdToken | undefined> => {
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
    return response.data.id_token as LineIdToken;
  } catch (e) {
    error("axiosエラー", e);
    throw new Error("error");
  }
};
