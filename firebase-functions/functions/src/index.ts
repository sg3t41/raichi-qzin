import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
dotenv.config();
admin.initializeApp();

import * as api from "./api";
export {api};
