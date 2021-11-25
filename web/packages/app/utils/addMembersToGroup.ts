import { getUserWithUsername, inviteInvestorToGroup } from "app/lib/firebase/db"
import { UserResponse } from "stream-chat"

export const addMembersToGroup = async (groupName: string, users: UserResponse[]) => {
  console.log("Adding members to group", groupName, users)

  // ! The id will come from stream and should be the username
  users.map(async ({ id: username }: { id: string }) => {
    const userDetails = await getUserWithUsername(username)
    const { uid, groups, alpacaAccountId } = userDetails.data()
    if (groups.includes(groupName)) {
      console.log("User already in group", username)
      return
    }

    // - Add user to group awaiting approval of invite
    inviteInvestorToGroup(groupName, username, uid, alpacaAccountId)

    // TODO: We did this only because the user was not accepting the invite
    // ! We should remove this once we have a better way for users to accept invites
    // ! In which place they can edit their groups ... no need for a function
    //   // - Update list for user
    //   updateUserData({
    //     uid: uid,
    //     updateData: { groups: [...groups, groupName] },
    //   })
  })
}
