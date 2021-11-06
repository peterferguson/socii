import { getGroupMembers } from "./getGroupMembers"
import { getUserWithUsername } from "./getUserWithUsername"

export const getGroupMemberPhotos = async (groupName: string): Promise<string[]> => {
  const memberUsernames = await getGroupMembers(groupName)
  return await Promise.all(
    memberUsernames?.map(
      async member => (await getUserWithUsername(member))?.data()?.photoUrl as string
    )
  )
}
