import { error } from "firebase-functions/lib/logger";
import { firestore } from "../index";
import { streamClient } from "../utils/streamClient";

/*
 * Create/delete a stream group chat when a new group is created/deleted
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}').onWrite(createGroup)
 *
 * @param change
 * @param context
 * @returns
 */

export const createGroup = async (change, context) => {
  const { groupName } = context.params;

  if (!change.before.exists) {
    // New group Created
    const founderUsername = (
      await firestore.collection(`groups/${groupName}/investors`).get()
    ).docs[0].id;

    const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"), {
      name: `${groupName} Group Chat`,
      created_by: { id: founderUsername },
    });

    try {
      await channel.create();
      await channel.addMembers([founderUsername]);
    } catch (err) {
      error(err);
    }
  } else if (!change.after.exists) {
    // Deleting document: delete the group chat
    const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"));
    try {
      await channel.delete();
    } catch (err) {
      error(err);
    }
  }
  return;
};
