import { db } from "@/libs/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
//リクエスト毎にCSRFトークンを発行する
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // SCRF対策
  const doc = await db.collection("states2").add({
    createdAt: FieldValue.serverTimestamp(),
  });

  console.log(doc.id);
  return NextResponse.json({
    state: {
      value: doc.id,
    },
  });
}
