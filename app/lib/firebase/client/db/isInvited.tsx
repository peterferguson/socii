import { firestore } from "@lib/firebase/client/db";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

export const isInvited = async (email: string) => {
  const inviteeQuery = query(
    collection(firestore, `invitees`),
    where("email", "==", email),
    limit(1)
  );
  const invited = !(await getDocs(inviteeQuery)).empty;
  return invited;
};
