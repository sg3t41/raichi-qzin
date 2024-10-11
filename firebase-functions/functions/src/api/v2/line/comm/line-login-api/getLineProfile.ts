import {error, info} from "firebase-functions/logger";
import {getLineToken} from "./getLineToken";
import {LineProfile, verifyLineToken} from "./verifyLineToken";
import {ResponseLineToken} from "../../types";

export const getLineProfile = async ({
  clientId,
  clientSecret,
  code,
  redirectUri,
}: {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}): Promise<LineProfile> => {
  info(`[開始] LINEプロフィール取得処理 code: ${code} 
  redirectUri ${redirectUri} clientId ${clientId}
   clientSecret ${clientSecret}`);
  const resp: ResponseLineToken = await getLineToken({
    grantType: "authorization_code",
    code,
    redirectUri,
    clientId,
    clientSecret,
  });

  info(`LINE ID TOKEN取得 id_token: ${resp.id_token}`);
  if (!resp.id_token) {
    error(`[エラー] getLineProfile code: ${code} 
    redirectUri ${redirectUri} clientId 
    ${clientId} clientSecret ${clientSecret}`);

    throw new Error("idTokenが取得できません");
  }

  const res: LineProfile = await verifyLineToken({
    idToken: resp.id_token,
    clientId,
  });

  info(res);
  return res;
};
