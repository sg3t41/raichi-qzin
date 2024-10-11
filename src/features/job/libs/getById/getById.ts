import { db } from "@/libs/firebase/admin";
import { type JobType } from "../../types/job";

export async function getById({ id }: { id: string }) {
  const docRef = db.collection("jobs").doc(id);
  const snap = await docRef.get();
  const doc = snap.data();

  return { id: docRef.id, ...doc } as JobType;
}
