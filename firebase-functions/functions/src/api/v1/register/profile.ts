import {Response} from "express";
import {onRequest, Request} from "firebase-functions/v2/https";

export const profile = onRequest(
  {region: "asia-northeast1", maxInstances: 10},
  async (request: Request, response: Response) => {
    response.json("plofile追加OK");
  }
);
