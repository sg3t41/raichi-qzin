export type RequestQuery = {
  jobId?: string;
  supporterId?: string;
  code: string;
  state: string;
};

export type HistoryData = {
  lineId: string;
  jobId: string;
  affiliatorId: string;
};

export type LineIdToken = string;
export type LineId = string;

export type LineIdTokenRequestBody = {
  grantType: "authorization_code";
  code: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
  // TODO: PKCE実装
  codeVerifier?: string;
};

export type AffiliatorData = {
  affiliatorId: string;
  lineId: string;
  jobId?: string;
};
