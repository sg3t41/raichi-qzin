import axios from "axios";

export const generateLoginUrl = (
  client_id: string,
  state: string,
  redirect_uri: string
) => {
  console.log(state);
  return axios.getUri({
    url: "https://access.line.me/oauth2/v2.1/authorize",
    params: {
      client_id,
      redirect_uri,
      state,
      response_type: "code",
      scope: "profile openid",
      bot_prompt: "aggressive",
    },
  });
};
