import {Client} from "@line/bot-sdk";

type PushMsgInfo = {
  to: string
  message: any
  channelSecret: string
  channelAccessToken: string
}

export const linePushMsg = async ({
  to,
  message,
  channelSecret,
  channelAccessToken,
}: PushMsgInfo) => {
  const client = new Client({channelSecret, channelAccessToken});
  await client.pushMessage(to, message);
};
