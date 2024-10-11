import {Response} from "express";
import {error} from "firebase-functions/logger";
import {onRequest, Request} from "firebase-functions/v2/https";
import {RequestUser} from "./RequestUser";

export const webhook = onRequest(
  {region: "asia-northeast1", maxInstances: 10, memory: "1GiB"},
  async (request: Request, response: Response) => {
    try {
      const user = new RequestUser(request.query as { [key: string]: string; });
      await user.init();
      await user.start();
      await user.register();
      user.end();
      // response.redirect(`${process.env.BASE_URL}?line_notice_result=true`);
      response.redirect(`${process.env.BASE_URL}?line_notice_result=true`);
    } catch (e: unknown) {
      response.redirect(`${process.env.BASE_URL}?line_notice_result=false`);
      error("ライチ求人APIエラー", e);
    }
  }
);
