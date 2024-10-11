/* バリデート */

import { info } from "firebase-functions/logger";

/* eslint @typescript-eslint/no-explicit-any: 0 */
export const validateAffiliatorQuery = (
  query: any
): { code: string; state: string; jobid?: string } | undefined => {
  const { code, state, jobid } = query;

  if (!code || !state) {
    return undefined;
  }
  info(query);

  return {
    code,
    state,
    jobid: jobid ?? "",
  };
};
