import axios from "axios";
import { error } from "firebase-functions/logger";
import { LineIdToken, LineId } from "../attribute/types";

export const getLineId = async (
  idToken: LineIdToken,
  clientId: string
): Promise<LineId | undefined> => {
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

    return response.data.sub;
  } catch (e) {
    error("axiosエラー", e);
    throw new Error("error");
  }
};
