import {
  initializeApp,
  cert,
  getApps,
  type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!) as ServiceAccount
    ),
  });
}

export const db = getFirestore();
